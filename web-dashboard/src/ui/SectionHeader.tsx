import { sectionHeaderClasses } from './panelVariants'

type SectionHeaderProps = {
  index: string
  label: string
}

const SectionHeader = ({ index, label }: SectionHeaderProps) => {
  return (
    <div className={sectionHeaderClasses}>
      <span className="text-cyan-400">{index}</span>
      <span className="text-slate-500">//</span>
      <span>{label}</span>
    </div>
  )
}

export default SectionHeader
