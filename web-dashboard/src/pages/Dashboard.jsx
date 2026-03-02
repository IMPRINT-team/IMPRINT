import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Menu } from "lucide-react";
import ScannerGrid from "../components/dashboard/ScannerGrid.jsx";
import ScannerModal from "../components/dashboard/ScannerModal.jsx";
import LatestEvents from "../components/dashboard/LatestEvents.jsx";
import HeroPanel from "../components/dashboard/HeroPanel.jsx";
import NavBar from "../components/dashboard/NavBar.jsx";
import StatsPannel from "../components/dashboard/StatsPannel.jsx";
import { scannerApi } from "../lib/scannerApi.js";

const getScanners = async () => {
  const response = await fetch(scannerApi.listUrl());

  if (!response.ok) {
    throw new Error("Unable to load scanners");
  }

  return response.json();
};

const Dashboard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [scanners, setScanners] = useState([]);
  const [selectedScanner, setSelectedScanner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const triggerRef = useRef(null);

  const sidebarState = useMemo(() => {
    if (isSidebarPinned) {
      return "expanded";
    }

    return isSidebarHovered ? "expanded" : "collapsed";
  }, [isSidebarHovered, isSidebarPinned]);

  useEffect(() => {
    const loadScanners = async () => {
      try {
        const data = await getScanners();
        setScanners(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadScanners();
  }, []);

  const handleSelectScanner = useCallback((scanner) => {
    triggerRef.current = document.activeElement;
    setSaveError(null);
    setSelectedScanner(scanner);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (isSaving) {
      return;
    }

    setIsModalOpen(false);
    setSaveError(null);
  }, [isSaving]);

  const handleSaveScanner = useCallback(
    async (updatedFields) => {
      if (!selectedScanner) {
        return;
      }

      setIsSaving(true);
      setSaveError(null);

      try {
        const response = await fetch(scannerApi.updateUrl(selectedScanner.deviceId), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFields),
        });

        if (!response.ok) {
          let errorMessage = "Unable to save scanner updates.";

          try {
            const errorPayload = await response.json();

            if (typeof errorPayload?.message === "string" && errorPayload.message.trim()) {
              errorMessage = errorPayload.message;
            } else if (typeof errorPayload?.error === "string" && errorPayload.error.trim()) {
              errorMessage = errorPayload.error;
            } else if (
              errorPayload?.error &&
              typeof errorPayload.error === "object" &&
              typeof errorPayload.error.message === "string" &&
              errorPayload.error.message.trim()
            ) {
              errorMessage = errorPayload.error.message;
            }
          } catch {
            // Ignore JSON parse issues and use fallback message.
          }

          throw new Error(errorMessage);
        }

        const updatedScanner = await response.json();

        setScanners((current) =>
          current.map((scanner) =>
            scanner.deviceId === updatedScanner.deviceId ? updatedScanner : scanner,
          ),
        );

        setSelectedScanner(updatedScanner);
      } catch (error) {
        setSaveError(error.message);
      } finally {
        setIsSaving(false);
      }
    },
    [selectedScanner],
  );

  return (
    <>
      <div className="h-screen overflow-hidden bg-base-100 text-base-content">
        <div className="mx-auto flex h-full max-w-screen-2xl flex-col p-3 lg:p-4">
          <header className="shrink-0">
            <div className="mt-3 flex items-center gap-3 lg:hidden">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="btn btn-sm btn-outline border-primary"
                aria-label="Open navigation menu"
                aria-controls="dashboard-drawer"
                aria-expanded={isDrawerOpen}
              >
                <Menu className="size-4" aria-hidden="true" />
                Menu
              </button>
              <div className="divider divider-primary my-0 flex-1" />
            </div>
          </header>
          <main className="mt-3 min-h-0 flex-1 overflow-hidden">
            <div
              data-sidebar={sidebarState}
              className="
                grid h-full w-full gap-3
                grid-cols-1 grid-rows-4
                lg:grid-cols-[var(--sidebar-width)_minmax(0,11fr)_minmax(0,4fr)]
                lg:grid-rows-[minmax(0,3fr)_minmax(0,1fr)]
                lg:[--sidebar-width:5.5rem]
                lg:data-[sidebar=expanded]:[--sidebar-width:12rem]
                lg:transition-[grid-template-columns] lg:duration-500 lg:ease-[cubic-bezier(.2,.8,.2,1)]
              "
            >
              <section className="hidden h-full min-h-0 min-w-0 lg:block lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">
                <NavBar
                  isExpanded={sidebarState === "expanded"}
                  isPinned={isSidebarPinned}
                  onHoverChange={setIsSidebarHovered}
                  onTogglePinned={() => setIsSidebarPinned((current) => !current)}
                />
              </section>

              <section className="min-h-0 min-w-0 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-2">
                <HeroPanel />
              </section>

              <section className="min-h-0 min-w-0 lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2">
                <ScannerGrid scanners={scanners} setScanners={setScanners}onSelect={handleSelectScanner} />
              </section>

              <section className="min-h-0 min-w-0 lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3">
                <StatsPannel />
              </section>

              <section className="min-h-0 min-w-0 lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-3">
                <LatestEvents />
              </section>
            </div>
          </main>
        </div>
      </div>

      <ScannerModal
        isOpen={isModalOpen}
        scanner={selectedScanner}
        isSaving={isSaving}
        saveError={saveError}
        onClose={handleCloseModal}
        onSave={handleSaveScanner}
        restoreFocusRef={triggerRef}
      />
    </>
  );
};

export default Dashboard;
