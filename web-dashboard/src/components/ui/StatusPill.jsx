import { statusPillVariants } from './panelVariants'

const statusVariantMap = {
  ONLINE: 'info',
  OFFLINE: 'error',
}

const resultVariantMap = {
  ACCEPTED: 'info',
  DENIED: 'error',
  FLAGGED: 'warning',
}

export const StatusPill = ({ status }) => {
  const variant = statusVariantMap[status] ?? 'warning'
  return (
    <span
      className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold tracking-[0.2em] ${statusPillVariants[variant]}`}
      role="status"
      aria-label={`Status: ${status}`}
      data-debug-label="StatusPill"
    >
      {status}
    </span>
  )
}

export const ResultPill = ({ result }) => {
  const variant = resultVariantMap[result]
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold tracking-[0.2em] ${statusPillVariants[variant]}`}
      role="status"
      aria-label={`Result: ${result}`}
      data-debug-label="ResultPill"
    >
      {result}
    </span>
  )
}
