import React, { useEffect, useMemo, useState } from "react";
import CardShell from "./CardShell.jsx";
import { scannerApi } from "../../lib/scannerApi.js";
import { eventApi } from "../../lib/eventApi.js";

const OFFLINE_STATUSES = new Set(["OFFLINE", "NO POWER", "DEGRADED"]);
const STATS_POLL_INTERVAL_MS = 15_000;
const LAST_24_HOURS_MS = 24 * 60 * 60 * 1000;

const normalizeScannerId = (scanner) => {
  if (!scanner || typeof scanner !== "object") {
    return "";
  }

  const rawId = scanner.deviceId ?? scanner.id ?? scanner.scannerId ?? scanner._id;
  if (rawId == null) {
    return "";
  }

  return String(rawId);
};

const StatsPannel = () => {
  const [view, setView] = useState("overview");
  const [downScanners, setDownScanners] = useState([]);
  const [denialHistory, setDenialHistory] = useState([]);
  const [denialRate24h, setDenialRate24h] = useState("0.0%");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const [scannerResponse, onlineResponse, events] = await Promise.all([
          fetch(scannerApi.listUrl()),
          fetch(scannerApi.listOnlineUrl()),
          eventApi.getEvents(),
        ]);

        if (!scannerResponse.ok) {
          throw new Error("Unable to load scanners.");
        }

        if (!onlineResponse.ok) {
          throw new Error("Unable to load online scanner status.");
        }

        const scanners = await scannerResponse.json();
        const onlineScanners = await onlineResponse.json();

        if (!isMounted) {
          return;
        }

        const onlineIdSet = new Set(
          (Array.isArray(onlineScanners) ? onlineScanners : [])
            .map((onlineScanner) => normalizeScannerId(onlineScanner))
            .filter(Boolean),
        );

        const normalizedDownScanners = scanners
          .filter((scanner) => {
            const scannerId = normalizeScannerId(scanner);
            const isOnlineFromPresence = scannerId ? onlineIdSet.has(scannerId) : false;
            const isOfflineFromStatus = OFFLINE_STATUSES.has((scanner.status ?? "").toUpperCase());
            return !isOnlineFromPresence || isOfflineFromStatus;
          })
          .map((scanner) => ({
            id: normalizeScannerId(scanner),
            name:
              scanner.name ??
              scanner.location ??
              scanner.specificLocation ??
              normalizeScannerId(scanner),
            location: scanner.specificLocation ?? scanner.location ?? "Unknown",
            status: scanner.status,
          }));

        const scannersById = new Map(
          (Array.isArray(scanners) ? scanners : []).map((scanner) => [
            normalizeScannerId(scanner),
            scanner,
          ]),
        );

        const cutoffTimestamp = Date.now() - LAST_24_HOURS_MS;
        const last24HoursEvents = (Array.isArray(events) ? events : []).filter((event) => {
          const occurredAt = new Date(event.occurredAt).getTime();
          return Number.isFinite(occurredAt) && occurredAt >= cutoffTimestamp;
        });

        const groupedByScanner = last24HoursEvents.reduce((accumulator, event) => {
          const scannerId = normalizeScannerId(event) || "Unknown";
          const scannerRecord = scannersById.get(scannerId);
          const scannerLabel =
            scannerRecord?.name ??
            scannerRecord?.location ??
            scannerRecord?.specificLocation ??
            scannerId;
          const current = accumulator.get(scannerId) ?? {
            scannerId,
            scanner: scannerLabel,
            total: 0,
            denied: 0,
          };
          const isDenied = (event.result ?? "").toUpperCase() === "DENIED";

          current.total += 1;
          current.denied += isDenied ? 1 : 0;
          accumulator.set(scannerId, current);
          return accumulator;
        }, new Map());

        const normalizedDenialHistory = [...groupedByScanner.values()]
          .sort((a, b) => b.denied - a.denied)
          .slice(0, 4)
          .map(({ scannerId, scanner, total, denied }) => {
            const denialRate = total === 0 ? 0 : (denied / total) * 100;
            return {
              scannerId,
              scanner,
              rate: `${denialRate.toFixed(1)}%`,
            };
          });

        const denied24hCount = last24HoursEvents.filter(
          (event) => (event.result ?? "").toUpperCase() === "DENIED",
        ).length;
        const currentRate = last24HoursEvents.length
          ? ((denied24hCount / last24HoursEvents.length) * 100).toFixed(1)
          : "0.0";

        setDownScanners(normalizedDownScanners);
        setDenialHistory(normalizedDenialHistory);
        setDenialRate24h(`${currentRate}%`);
      } catch {
        if (isMounted) {
          setLoadError("Unable to load dashboard stats.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadStats();
    const intervalId = window.setInterval(loadStats, STATS_POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const currentDenialRate = useMemo(() => {
    return denialRate24h;
  }, [denialRate24h]);

  const renderOverview = () => (
    <div className="h-full">
      <ul className="grid gap-4 sm:grid-cols-2 h-full">
        <li className="h-full">
          <button
            onClick={() => setView("scanners")}
            className="w-full h-full text-left rounded-lg border border-error/40 bg-error/5 p-3 hover:bg-error/10 transition-all focus:ring-2 focus:ring-error outline-none flex flex-col justify-center"
          >
            <p className="text-xs uppercase tracking-wide text-error font-bold">Downed Scanners</p>
            <p className="mt-1 text-2xl font-bold text-error">{downScanners.length}</p>
            <p className="text-[10px] opacity-70 underline mt-1">Click to investigate</p>
          </button>
        </li>

        <li className="h-full">
          <button
            onClick={() => setView("denials")}
            className="w-full h-full text-left rounded-lg border border-primary/30 bg-base-200 p-3 hover:bg-base-300 transition-all focus:ring-2 focus:ring-primary outline-none flex flex-col justify-center"
          >
            <p className="text-xs uppercase tracking-wide opacity-70">Denial Rate</p>
            <p className="mt-1 text-2xl font-bold text-primary">{currentDenialRate}</p>
            <p className="text-[10px] opacity-70 underline mt-1">View details</p>
          </button>
        </li>
      </ul>
    </div>
  );

  const renderScannerDetail = () => (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-error">Offline Units</h3>
        <button
          onClick={() => setView("overview")}
          className="btn btn-xs btn-circle btn-ghost"
          aria-label="Back to overview"
        >
          ✕
        </button>
      </div>
      <div className="space-y-2 overflow-y-auto max-h-[140px]">
        {downScanners.length === 0 ? (
          <p className="text-xs opacity-70">No offline scanners found.</p>
        ) : (
          downScanners.map((scanner) => (
            <div
              key={scanner.id}
              className="flex justify-between items-center p-2 bg-error/10 border border-error/20 rounded text-xs"
            >
              <div>
                <p className="font-bold">{scanner.name}</p>
                <p className="opacity-70">{scanner.location}</p>
              </div>
              <span className="badge badge-error badge-sm animate-pulse">{scanner.status}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderDenialHistory = () => (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-bold uppercase tracking-wider">Denial by Scanner (24h)</h3>
        <button
          onClick={() => setView("overview")}
          className="btn btn-xs btn-circle btn-ghost"
          aria-label="Back to overview"
        >
          ✕
        </button>
      </div>
      <div className="space-y-3">
        {denialHistory.length === 0 ? (
          <p className="text-xs opacity-70">No denial events in the last 24 hours.</p>
        ) : (
          denialHistory.map((item) => (
            <div key={item.scannerId} className="flex items-center gap-3 text-[11px]">
              <span className="w-24 truncate opacity-60 italic">{item.scanner}</span>
              <div className="flex-1 bg-base-300 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-700"
                  style={{ width: `${Math.min(parseFloat(item.rate), 100)}%` }}
                />
              </div>
              <span className="w-8 text-right font-mono font-bold">{item.rate}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );

  return (
    <CardShell className="h-full" data-debug-label="StatsPannel">
      {isLoading ? <p className="text-sm opacity-70">Loading stats...</p> : null}
      {!isLoading && loadError ? <p className="text-sm text-error">{loadError}</p> : null}
      {!isLoading && !loadError ? (
        <>
          {view === "overview" && renderOverview()}
          {view === "scanners" && renderScannerDetail()}
          {view === "denials" && renderDenialHistory()}
        </>
      ) : null}
    </CardShell>
  );
};

export default StatsPannel;
