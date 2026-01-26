import { sectionHeaderClasses } from './panelVariants'

type SectionHeaderProps = {
  index: string
  label: string
  id?: string
}

const SectionHeader = ({ index, label, id }: SectionHeaderProps) => {
  return (
    <header className={sectionHeaderClasses} aria-label={`${index} ${label}`}>
      <span className="text-cyan-400" aria-hidden="true">
        {index}
      </span>
      <span className="text-slate-500" aria-hidden="true">
        //
      </span>
      <h2
        id={id}
        className="m-0 text-[11px] font-inherit uppercase tracking-[0.2em] text-slate-100"
      >
        {label}
      </h2>
    </header>
  )
}

export default SectionHeader
