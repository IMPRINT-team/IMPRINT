type BadgeProps = {
  children: string
  tone?: 'cyan' | 'slate'
}

const toneClasses: Record<NonNullable<BadgeProps['tone']>, string> = {
  cyan: 'border-cyan-500/30 text-cyan-200',
  slate: 'border-slate-600/40 text-slate-400',
}

const Badge = ({ children, tone = 'cyan' }: BadgeProps) => {
  return (
    <span
      className={`rounded border px-2 py-1 text-[9px] uppercase tracking-[0.2em] ${toneClasses[tone]}`}
      role="note"
      aria-label={`Tag: ${children}`}
    >
      {children}
    </span>
  )
}

export default Badge
