# Components Directory Guide

This document lists each component module in this directory tree and its
intended use case.

## Branding
- `branding/ImprintLogo.jsx`: Primary IMPRINT logo mark used in headers and
  prominent navigation areas.
- `branding/ImprintLogoWatermark.jsx`: Subtle watermark version of the logo for
  backgrounds or decorative branding.

## Constants
- `constants/themes.js`: Theme configuration data consumed by UI theme
  selectors and DaisyUI theme switching.

## Dashboard
- `dashboard/BoxA.jsx`: Secondary dashboard panel slot for future content.
- `dashboard/BoxB.jsx`: Secondary dashboard panel slot for future content.
- `dashboard/BoxC.jsx`: Secondary dashboard panel slot for future content.
- `dashboard/CardShell.jsx`: Shared card container styling for dashboard panels.
- `dashboard/HeroPanel.jsx`: Primary hero panel container in the dashboard grid.
- `dashboard/NavBar.jsx`: Primary dashboard navigation links.
- `dashboard/ThemeSelector.jsx`: Theme picker control for switching DaisyUI
  themes.

## Stores
- `stores/useThemeStore.js`: Zustand store for persisting and updating the
  selected UI theme.
