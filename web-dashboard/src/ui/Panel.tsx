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
  const headingId =
    title && index
      ? `panel-${index}-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      : undefined

  return (
    <section
      data-role={dataRole}
      className={`${panelBase} ${panelVariants[variant]} ${primary ? 'relative border-slate-700/50 bg-slate-800/30' : ''}`}
      aria-labelledby={headingId}
      aria-label={!headingId && title ? title : undefined}
    >
      {primary ? <CyberCorners /> : null}
      {title && index ? (
        <div className="mb-3">
          <SectionHeader index={index} label={title} id={headingId} />
        </div>
      ) : null}
      {children}
    </section>
  )
}

export default Panel
