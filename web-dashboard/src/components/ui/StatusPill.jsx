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
  const normalizedStatus = (status ?? 'UNKNOWN').toString().trim().toUpperCase()
  const variant = statusVariantMap[normalizedStatus] ?? 'warning'
  return (
    <span
      className={`inline-flex min-w-[5.5rem] items-center justify-center rounded-full border px-2.5 py-1 text-center text-[9px] font-semibold leading-none tracking-[0.2em] ${statusPillVariants[variant]}`}
      role="status"
      aria-label={`Status: ${normalizedStatus}`}
      data-debug-label="StatusPill"
    >
      {normalizedStatus}
    </span>
  )
}

export const ResultPill = ({ result }) => {
  const variant = resultVariantMap[result]
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-center text-[9px] font-semibold leading-none tracking-[0.2em] ${statusPillVariants[variant]}`}
      role="status"
      aria-label={`Result: ${result}`}
      data-debug-label="ResultPill"
    >
      {result}
    </span>
  )
}
