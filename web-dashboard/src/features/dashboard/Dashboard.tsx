import devices from './fixtures/devices.json'
import events from './fixtures/events.json'
import constraints from './fixtures/constraints.json'
import auth from './fixtures/auth.json'
import Badge from '../../ui/Badge'
import Panel from '../../ui/Panel'
import SectionHeader from '../../ui/SectionHeader'
import StatusPill from '../../ui/StatusPill'

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

const Dashboard = () => {
  const deviceMap = new Map(devices.map((device) => [device.id, device]))
  const onlineCount = devices.filter((device) => device.status === 'ONLINE').length
  const degradedCount = devices.filter((device) => device.status === 'DEGRADED').length
  const deniedCount = events.filter((event) => event.result === 'DENIED').length
  const denialRate = Math.round((deniedCount / events.length) * 100)
  const lastEvent = events[0]

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8" data-role="dashboard">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="flex flex-col gap-4 md:col-span-8">
          <Panel title="Live Event Stream" index="01" primary dataRole="event-stream">
            <div className="flex flex-col gap-2">
              {events.slice(0, 12).map((event) => {
                const device = deviceMap.get(event.deviceId)
                return (
                  <div
                    key={event.id}
                    className="flex flex-col gap-2 border-l border-slate-700 bg-slate-800/20 px-3 py-2 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-2 w-2 rounded-full ${resultStyles[event.result]}`} />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                        {event.timestamp}
                      </span>
                      <span className="text-slate-100">{device?.name ?? 'Unknown Device'}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      <span className="text-slate-300">UID {event.tagUid}</span>
                      <span className={resultTextStyles[event.result]}>{event.result}</span>
                      <span>{event.latencyMs}ms</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Panel>

          <Panel title="Device Activity" index="02" dataRole="device-table">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] uppercase tracking-[0.2em] text-slate-400">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-2 text-slate-500">Device</th>
                    <th className="py-2 text-slate-500">Location</th>
                    <th className="py-2 text-slate-500">Status</th>
                    <th className="py-2 text-slate-500">Last Seen</th>
                    <th className="py-2 text-slate-500">Scan Rate</th>
                  </tr>
                </thead>
                <tbody className="text-slate-200">
                  {devices.map((device) => (
                    <tr key={device.id} className="border-b border-slate-800/70">
                      <td className="py-2 text-slate-100">{device.name}</td>
                      <td className="py-2">{device.location}</td>
                      <td className="py-2">
                        <StatusPill status={device.status} />
                      </td>
                      <td className="py-2">{device.lastSeen}</td>
                      <td className="py-2">{device.scanRatePerMin}/min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Activity Summary" index="03">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded border border-slate-700/60 bg-slate-900/40 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Events Today
                </p>
                <p className="text-lg font-semibold text-slate-100">{events.length}</p>
              </div>
              <div className="rounded border border-slate-700/60 bg-slate-900/40 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Active Devices
                </p>
                <p className="text-lg font-semibold text-cyan-400">{onlineCount}</p>
              </div>
              <div className="rounded border border-slate-700/60 bg-slate-900/40 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Denial Rate
                </p>
                <p className="text-lg font-semibold text-magenta">{denialRate}%</p>
              </div>
            </div>
          </Panel>
        </div>

        <div className="flex flex-col gap-4 md:col-span-4">
          <Panel title="Status Summary" index="04" variant="info" dataRole="status-summary">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Active Devices</span>
                <span className="text-cyan-400">{onlineCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Degraded Nodes</span>
                <span className="text-amber">{degradedCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">API Reachable</span>
                <span className="text-cyan-400">YES</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Last Event</span>
                <span className="text-slate-200">{lastEvent.timestamp}</span>
              </div>
            </div>
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
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Scrum Master</p>
                <p className="text-slate-100">{auth.scrumMaster}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Team</p>
                <div className="mt-2 grid gap-2">
                  {auth.team.map((member) => (
                    <span key={member} className="border-l border-cyan-500/40 pl-3 text-slate-200">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="Architecture Tags" index="07">
            <div className="flex flex-wrap gap-2">
              {['React Frontend', 'Centralized API', 'Networked RFID', 'Audit Ledger'].map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-slate-500">
        <SectionHeader index="08" label="Telemetry Ingest" />
        <span className="text-slate-400">Schema v3 · 1.8ms jitter envelope</span>
      </div>
    </div>
  )
}

export default Dashboard
