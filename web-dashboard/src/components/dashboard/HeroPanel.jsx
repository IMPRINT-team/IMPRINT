import React from "react"
import CardShell from "./CardShell.jsx"
import ChartBox from "./ChartBox.jsx"

const HeroPanel = () => (
  <CardShell className="h-full" data-debug-label="HeroPanel">
    <ChartBox />
  </CardShell>
)

export default HeroPanel
