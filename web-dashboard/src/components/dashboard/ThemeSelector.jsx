import React, { useState } from "react";
import PropTypes from "prop-types";
import { PaletteIcon } from "lucide-react";
import { THEMES } from "../constants/themes.js";
import { useThemeStore } from "../stores/useThemeStore.js";
import BaseModal from "../modals/BaseModal.jsx";

const labelTransitionClasses =
  "overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)]";

const getRevealClasses = (isExpanded, expandedWidth = "max-w-[200px]") =>
  isExpanded
    ? `${expandedWidth} opacity-100 translate-x-0`
    : "max-w-0 opacity-0 -translate-x-1";

function ThemeSelector({ isExpanded = false }) {
  const { theme, setTheme } = useThemeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleThemeSelect = (themeName) => {
    setTheme(themeName);
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
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

      {isModalOpen && (
        <BaseModal id="themeSelectorModal" title="Choose Theme" onClose={handleCloseModal}>
          <div className="grid gap-2">
            {THEMES.map((themeOption) => (
              <button
                key={themeOption.name}
                type="button"
                className={[
                  "flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-3 text-left transition-colors",
                  theme === themeOption.name
                    ? "border-primary/30 bg-primary/10 text-primary"
                    : "hover:border-primary/20 hover:bg-base-content/5",
                ].join(" ")}
                onClick={() => handleThemeSelect(themeOption.name)}
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
        </BaseModal>
      )}
    </>
  );
}

ThemeSelector.propTypes = {
  isExpanded: PropTypes.bool,
};


export default ThemeSelector;
