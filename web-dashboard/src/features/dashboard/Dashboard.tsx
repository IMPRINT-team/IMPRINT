import constraints from './fixtures/constraints.json'
import auth from './fixtures/auth.json'
import Badge from '../../ui/Badge'
import Panel from '../../ui/Panel'
import SectionHeader from '../../ui/SectionHeader'
import { StatusPill, ResultPill } from '../../ui/StatusPill'
import { useState, useEffect } from 'react'
import { useAuth } from '@workos-inc/authkit-react';
const BASE_URL="http://localhost:8080"

const resultStyles: Record<string, string> = {
  ACCEPTED: 'bg-cyan-500',
  DENIED: 'bg-magenta',
  FLAGGED: 'bg-amber',
}

const resultTextStyles: Record<string, string> = {
  ACCEPTED: 'text-cyan-400',
  DENIED: 'text-magenta',
  FLAGGED: 'text-amber',
}

const getDevices = async () => {
  const devices = await fetch(`${BASE_URL}`);
  return devices;
}

const getEvents = async () => {
  const events = await fetch(`${BASE_URL}/event`);
  return events;
}

const Dashboard = () => {

  const { user } = useAuth();

  const [devices, setDevices] = useState<Device[]>([]);
  useEffect(() => {
    const loadData = async () => {
      try {
          const devicesData = await getDevices();
          const data = await devicesData.json()
          setDevices(data);
      } catch (err) {
          console.log(err)
      }
    };
  
    loadData();
  }, []);

  const [events, setEvents] = useState<Event[]>([]);
    useEffect(() => {
      
      const loadEvents = async () => {
        
        try {
          const eventData = await fetch(`${BASE_URL}/event`);
          const allEvents = await eventData.json();
          setEvents(allEvents);
        } catch (err) {
          console.log(err);
        }
      };
      loadEvents();
    }, []);

  const deviceMap = new Map(devices.map((device) => [device.id, device]))
  const onlineCount = devices.filter((device) => device.status === 'ONLINE').length
  const degradedCount = devices.filter((device) => device.status === 'DEGRADED').length
  const deniedCount = events.filter((event) => event.result === 'DENIED').length
  const denialRate = events.length > 0 ? Math.round((deniedCount / events.length) * 100) : 0
  const lastEvent = events.length > 0 ? events[events.length - 1] : null;

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8" data-role="dashboard">
      <header className="flex flex-col gap-4 border-b border-cyan-500/30 pb-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-5">
            <h1 className="font-serif text-2xl font-black uppercase tracking-tight text-slate-100">
              IMPRINT
            </h1>
            <span className="border-l-2 border-cyan-500 pl-3 text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500">
              CONSOLE // AUDIT FIRST
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Trusted physical access telemetry &amp; audit ledger
          </p>
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
          IMPRINT SYSTEM // 2026
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-12" aria-label="Dashboard content">
        <section className="flex flex-col gap-4 md:col-span-8" aria-label="Operations">
          <Panel title="Live Event Stream" index="01" primary dataRole="event-stream">
            <ul className="flex flex-col gap-2" role="list">
              {events.slice(0, 12).map((event) => {
                const device = deviceMap.get(event.deviceId)
                return (
                  <li key={event.id}>
                    <article className="flex-row gap-2 border border-slate-700 bg-slate-800/20 px-3 py-2 items-center justify-between">
                      <header className="sm:flex gap-3 text-[10px] uppercase tracking-[0.2em] items-center justify-between">
                        <div className="flex items-center justify-left">
                          <span className={`h-2 w-2 rounded-full ${resultStyles[event.result]}`} />
                          <span className="text-[10px] ml-2 uppercase tracking-[0.2em] text-slate-400">
                            {event.occurredAt}
                          </span>
                        </div>
                        <span className="text-slate-100">{device?.location ?? "Unknown device"}</span>
                        <span>
                          <ResultPill result={event.result} />
                        </span>
                        <span className="text-slate-300">UID {event.uid}</span>
                      </header>
                      <footer className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        {/* <span className={resultTextStyles[event.result]}>{event.result}</span> */}
                        {/* <span>{event.latencyMs}ms</span> */}
                      </footer>
                    </article>
                  </li>
                )
              })}
            </ul>
          </Panel>

          <Panel title="Devices" index="02" dataRole="device-table">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] uppercase tracking-[0.2em] text-slate-400">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-2 text-slate-500">Device</th>
                    <th className="py-2 text-slate-500">Location</th>
                    <th className="py-2 text-slate-500">Status</th>
                    <th className="py-2 text-slate-500">Last Seen</th>
                    <th className="py-2 text-slate-500">Authorization</th>
                  </tr>
                </thead>
                <tbody className="text-slate-200">
                  {devices.map((device) => (
                    <tr key={device.deviceId} className="border-b border-slate-800/70">
                      <td className="py-2 text-slate-100">{device.location}</td>
                      <td className="py-2">{device.specificLocation}</td>
                      <td className="py-2">
                        <StatusPill status={device.status} />
                      </td>
                      <td className="py-2">{device.createdAt}</td>
                      <td className='py-2'>{device.authorization}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Activity Summary" index="03">
            <dl className="grid gap-4 md:grid-cols-3">
              <div className="rounded border border-slate-700/60 bg-slate-900/40 px-3 py-2">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Events Today
                </dt>
                <dd className="text-lg font-semibold text-slate-100">{events.length}</dd>
              </div>
              <div className="rounded border border-slate-700/60 bg-slate-900/40 px-3 py-2">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Active Devices
                </dt>
                <dd className="text-lg font-semibold text-cyan-400">{onlineCount}</dd>
              </div>
              <div className="rounded border border-slate-700/60 bg-slate-900/40 px-3 py-2">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Denial Rate
                </dt>
                <dd className="text-lg font-semibold text-magenta">{denialRate}%</dd>
              </div>
            </dl>
          </Panel>
        </section>

        <aside className="flex flex-col gap-4 md:col-span-4" aria-label="System status">
          <Panel title="Status Summary" index="04" variant="info" dataRole="status-summary">
            <dl className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Active Devices</dt>
                <dd className="text-cyan-400">{onlineCount}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Degraded Nodes</dt>
                <dd className="text-amber">{degradedCount}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-400">API Reachable</dt>
                <dd className="text-cyan-400">YES</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Last Event</dt>
                <dd className="text-slate-200">{lastEvent?.occurredAt ?? "--"}</dd>
              </div>
            </dl>
          </Panel>

          <Panel title="Constraints" index="05" variant="warning" dataRole="constraints">
            <ul className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.2em] text-amber">
              {constraints.map((constraint) => (
                <li key={constraint} className="border-l border-amber/40 pl-3">
                  {constraint}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Authorization Manifest" index="06" dataRole="authorization">
            <section className="flex flex-col gap-4" aria-label="Authorization">
              <dl>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Current Session</dt>
                <dd className="text-slate-100">
                  {/* Show email or fallback to 'Unknown' */}
                  {user?.email ?? 'Unknown User'}
                </dd>
              </dl>

              {/* Optional: You can keep the team list or make it dynamic later */}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Team</p>
                <ul className="mt-2 grid gap-2" role="list">
                  {auth.team.map((member) => (
                    <li key={member} className="border-l border-cyan-500/40 pl-3 text-slate-200">
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </Panel>

          <Panel title="Architecture Tags" index="07">
            <ul className="flex flex-wrap gap-2" role="list">
              {['React Frontend', 'Centralized API', 'Networked RFID', 'Audit Ledger'].map((tag) => (
                <li key={tag}>
                  <Badge>{tag}</Badge>
                </li>
              ))}
            </ul>
          </Panel>
        </aside>
      </section>

      <footer className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-slate-500">
        <SectionHeader index="08" label="Telemetry Ingest" />
        <span className="text-slate-400">Schema v3 · 1.8ms jitter envelope</span>
      </footer>
    </main>
  )
}

export default Dashboard
