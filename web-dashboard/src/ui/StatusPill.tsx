import { statusPillVariants } from './panelVariants'

type StatusPillProps = {
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED'
}

const statusVariantMap: Record<StatusPillProps['status'], keyof typeof statusPillVariants> = {
  ONLINE: 'info',
  DEGRADED: 'warning',
  OFFLINE: 'error',
}

const StatusPill = ({ status }: StatusPillProps) => {
  const variant = statusVariantMap[status]
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] ${statusPillVariants[variant]}`}
    >
      {status}
    </span>
  )
}

export default StatusPill
