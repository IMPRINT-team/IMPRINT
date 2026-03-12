import React from "react";
import CardShell from "./CardShell.jsx";
import HeroEventsCalendar from "./HeroEventsCalendar.jsx";

const HeroPanel = () => (
  <CardShell className="h-full" data-debug-label="HeroPanel">
    <HeroEventsCalendar />
  </CardShell>
);

export default HeroPanel;
