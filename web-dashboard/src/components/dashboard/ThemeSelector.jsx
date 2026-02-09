import React from "react"
import { PaletteIcon } from "lucide-react"
import { THEMES } from "../constants/themes.js"
import { useThemeStore } from "../stores/useThemeStore.js"

function ThemeSelector () {
    const {theme, setTheme} = useThemeStore();
    return (
        <div className="dropdown dropdown-end z-50">
            <button className="btn btn-circle btn-ghost border border-primary">
                <PaletteIcon className="size-5" />
            </button>
            <div className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg">
                {THEMES.map(themeOption => (
                    <button key={themeOption.name} className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors ${theme === themeOption.name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5"}`} onClick={() => setTheme(themeOption.name)}>
                        <PaletteIcon className="size-4" />
                        <span className="text-sm font-medium">{themeOption.label}</span>
                        <div className="ml-auto flex gap-1">
                            {themeOption.colors.map((color, i) => (
                                <span key={i} className="size-2 rounded-full" style={{backgroundColor: color}} />
                            ))}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ThemeSelector