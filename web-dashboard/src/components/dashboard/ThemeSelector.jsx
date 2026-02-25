import React from "react";
import PropTypes from "prop-types";
import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants/themes.js";
import { useThemeStore } from "../stores/useThemeStore.js";

const labelTransitionClasses =
  "overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)]";

const getRevealClasses = (isExpanded, expandedWidth = "max-w-[200px]") =>
  isExpanded
    ? `${expandedWidth} opacity-100 translate-x-0`
    : "max-w-0 opacity-0 -translate-x-1";

function ThemeSelector({ isExpanded }) {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-top dropdown-end z-50" data-debug-label="ThemeSelector">
      <button
        type="button"
        className="flex w-full rounded-xl border border-transparent px-3 py-3 text-left transition-colors duration-200 hover:bg-primary/95 hover:text-neutral hover:shadow-glowHover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        title={!isExpanded ? "Theme" : undefined}
      >
        <span className="flex items-center gap-3">
          <span className="grid w-9 place-items-center">
            <PaletteIcon className="size-4 shrink-0" />
          </span>
          <span className={[labelTransitionClasses, getRevealClasses(isExpanded)].join(" ")}>Theme</span>
        </span>
      </button>
      <div className="dropdown-content mb-2 w-56 rounded-xl bg-base-200 p-1 shadow-2xl backdrop-blur-lg">
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            className={[
              "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors",
              theme === themeOption.name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5",
            ].join(" ")}
            onClick={() => setTheme(themeOption.name)}
          >
            <PaletteIcon className="size-4" />
            <span className="text-sm font-medium">{themeOption.label}</span>
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span key={i} className="size-2 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

ThemeSelector.propTypes = {
  isExpanded: PropTypes.bool,
};

ThemeSelector.defaultProps = {
  isExpanded: false,
};

export default ThemeSelector;
