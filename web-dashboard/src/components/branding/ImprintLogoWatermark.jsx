import React from "react"
import ImprintLogo from "./ImprintLogo.jsx"

const ImprintLogoWatermark = () => (
  <div
    className="pointer-events-none absolute inset-0 flex items-center justify-center"
    data-debug-label="ImprintLogoWatermark"
  >
    <ImprintLogo
      width={220}
      height={220}
      className="text-cyan-500/20"
    />
  </div>
)

export default ImprintLogoWatermark
