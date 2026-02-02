import daisyui from "daisyui"

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Merriweather", "serif"],
      },
      boxShadow: {
        glowCyan: "0 0 12px rgba(6,182,212,0.55)",
        glowAmber: "0 0 12px rgba(245, 158, 11, 0.55)",
        glowMagenta: "0 0 12px rgba(236, 72, 153, 0.55)"
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "pastel",
      "retro",
      "coffee",
      "forest",
      "cyberpunk",
      "synthwave",
      "luxury",
      "autumn",
      "valentine",
      "aqua",
      "business",
      "night",
      "dracula",
      "light",
      "dark"
    ]
  }
}