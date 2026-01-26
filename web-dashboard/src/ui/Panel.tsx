import type { ReactNode } from 'react'

import CyberCorners from './CyberCorners'
import SectionHeader from './SectionHeader'
import { panelBase, panelVariants } from './panelVariants'

type PanelVariant = keyof typeof panelVariants

type PanelProps = {
  title?: string
  index?: string
  variant?: PanelVariant
  primary?: boolean
  dataRole?: string
  children: ReactNode
}

const Panel = ({
  title,
  index,
  variant = 'neutral',
  primary = false,
  dataRole,
  children,
}: PanelProps) => {
  return (
    <section
      data-role={dataRole}
      className={`${panelBase} ${panelVariants[variant]} ${primary ? 'relative border-slate-700/50 bg-slate-800/30' : ''}`}
    >
      {primary ? <CyberCorners /> : null}
      {title && index ? (
        <div className="mb-3">
          <SectionHeader index={index} label={title} />
        </div>
      ) : null}
      {children}
    </section>
  )
}

export default Panel
