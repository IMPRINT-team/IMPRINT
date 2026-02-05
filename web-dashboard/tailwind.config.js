import daisyui from "daisyui"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'shadow-glowSuccess',
    'shadow-glowError',
    'shadow-glowWarning'
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Merriweather", "serif"],
      },
      boxShadow: {
        glowSuccess: "0 0 12px 3px oklch(var(--su)/0.65)",
        glowWarning: "0 0 12px 3px oklch(var(--wa)/0.65)",
        glowError: "0 0 12px 3px oklch(var(--er)/1)",
        glowHover: "0 0 12px 3px oklch(var(--p)/1)"
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "coffee",
      "forest",
      "synthwave",
      "luxury",
      "business",
      "night",
      "dracula",
      "dark"
    ]
  }
}