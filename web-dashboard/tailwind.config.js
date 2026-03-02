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
      "dark",
      "cupcake",
      "black",
      "autumn",
      {
        abyss: {
          "base-100": "oklch(20% 0.08 209)",     // #0e131f
          "base-200": "oklch(15% 0.08 209)",     // #070b11  
          "base-300": "oklch(10% 0.08 209)",     // #020509
          "base-content": "oklch(90% 0.076 70.697)", // #e5e6ea
          primary: "oklch(92% 0.2653 125)",      // #cbe1ff
          "primary-content": "oklch(50% 0.2653 125)", // #5182c3
          secondary: "oklch(83.27% 0.0764 298.3)", // #d2d7e8
          "secondary-content": "oklch(43.27% 0.0764 298.3)", // #6d739b
          accent: "oklch(43% 0 0)",              // #646464
          "accent-content": "oklch(98% 0 0)",     // #fbfbfb
          neutral: "oklch(30% 0.08 209)",        // #182135
          "neutral-content": "oklch(90% 0.076 70.697)", // #e5e6ea
          info: "oklch(74% 0.16 232.661)",       // #81c0ff
          "info-content": "oklch(29% 0.066 243.157)", // #1b2334
          success: "oklch(79% 0.209 151.711)",   // #7be0a8
          "success-content": "oklch(26% 0.065 152.934)", // #14281d
          warning: "oklch(84.8% 0.1962 84.62)",  // #ffd88e
          "warning-content": "oklch(44.8% 0.1962 84.62)", // #825b25
          error: "oklch(65% 0.1985 24.22)",      // #ff8b72
          "error-content": "oklch(27% 0.1985 24.22)", // #2f130c
        }
      }
    ]
  }
}
