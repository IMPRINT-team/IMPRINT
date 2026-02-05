import { statusPillVariants } from './panelVariants'

type StatusPillProps = {
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED'
}

type ResultPillProps = {
  result: 'ACCEPTED' | 'DENIED' | 'FLAGGED'
}

const statusVariantMap: Record<StatusPillProps['status'], keyof typeof statusPillVariants> = {
  ONLINE: 'info',
  DEGRADED: 'warning',
  OFFLINE: 'error',
}

const ResultVariantMap: Record<ResultPillProps['result'], keyof typeof statusPillVariants> = {
  ACCEPTED: 'info',
  DENIED: 'error',
  FLAGGED: 'warning',
}

export const StatusPill = ({ status }: StatusPillProps) => {
  const variant = statusVariantMap[status]
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold tracking-[0.2em] ${statusPillVariants[variant]}`}
      role="status"
      aria-label={`Status: ${status}`}
    >
      {status}
    </span>
  )
}

export const ResultPill = ({result}: ResultPillProps) => {
  const variant = ResultVariantMap[result]
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] ${statusPillVariants[variant]}`}
      role="status"
      aria-label={`Result: ${result}`}
    >
      {result}
    </span>
  )
}