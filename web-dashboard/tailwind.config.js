import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["shadow-glowSuccess", "shadow-glowError", "shadow-glowWarning"],
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
        glowHover: "0 0 12px 3px oklch(var(--p)/1)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      // "coffee",
      "forest",
      // "synthwave",
      // "luxury",
      "business",
      // "night",
      "corporate",
      // "dracula",
      // "dark",
      // "cupcake",
      // "black",
      // {
      //   abyss: {
      //     "base-100": "oklch(20% 0.08 209)", // #0e131f
      //     "base-200": "oklch(15% 0.08 209)", // #070b11
      //     "base-300": "oklch(10% 0.08 209)", // #020509
      //     "base-content": "oklch(90% 0.076 70.697)", // #e5e6ea
      //     primary: "oklch(92% 0.2653 125)", // #cbe1ff
      //     secondary: "oklch(83.27% 0.0764 298.3)", // #d2d7e8
      //     neutral: "oklch(30% 0.08 209)", // #182135
      //     "neutral-content": "oklch(90% 0.076 70.697)", // #e5e6ea
      //     info: "oklch(74% 0.16 232.661)", // #81c0ff
      //     success: "oklch(79% 0.209 151.711)", // #7be0a8
      //     warning: "oklch(84.8% 0.1962 84.62)", // #ffd88e
      //     error: "oklch(65% 0.1985 24.22)", // #ff8b72
      //   },
      // },
      {
        autumn: {
          "base-100": "oklch(95.814% 0 0)", // #f5f5f5
          "base-200": "oklch(95.814% 0 0)", // #e0e0e0
          "base-300": "oklch(95.814% 0 0)", // #cccccc
          "base-content": "oklch(19.162% 0 0)", // #313131
          primary: "oklch(70% 0.25 20)", // #c9593a
          secondary: "oklch(61.676% 0.169 23.865)", // #d98c5b
          neutral: "oklch(54.367% 0.037 51.902)", // #8c8c8c
          "neutral-content": "oklch(90.873% 0.007 51.902)", // #e5e5e5
          info: "oklch(69.224% 0.097 207.284)", // #a0c0e8
          success: "oklch(60.995% 0.08 174.616)", // #7be0a8
          warning: "oklch(70.081% 0.164 56.844)", // #f5b66c
          error: "oklch(53.07% 0.241 24.16)", // #c73f1f
        },
      },
//       {
//         rust: {
//           primary: "#e1aaaa",
//           "primary-content": "#ffffff",
//           secondary: "#3b5c97",
//           "secondary-content": "#ffffff",
//           accent: "#ffc4c4",
//           "accent-content": "#000000",
//           neutral: "#333333",
//           "neutral-content": "#ffffff",
//           "base-100": "#ffffff",
//           "base-200": "#f3f3f3",
//           "base-300": "#fff5e2",
//           "base-content": "#161B33",
//           info: "#4b92db",
//           "info-content": "#ffffff",
//           success: "#3d8554",
//           "success-content": "#ffffff",
//           warning: "#fff5e2",
//           "warning-content": "#333333",
//           error: "#700000",
//           "error-content": "#ffffff",
//         },
//       },
//       {
//         light: {
//           "primary": "#584ecb",
//           "primary-content": "#d9dcf7",
//           "secondary": "#cb3a72",
//           "secondary-content": "#fad9e1",
//           "accent": "#52d179",
//           "accent-content": "#021005",
//           "neutral": "#262931",
//           "neutral-content": "#cfd0d2",
//           "base-100": "#ecefe4",
//           "base-200": "#cdd0c6",
//           "base-300": "#afb1a9",
//           "base-content": "#131412",
//           "info": "#2563EB",
//           "info-content": "#d2e2ff",
//           "success": "#16A34A",
//           "success-content": "#000a02",
//           "warning": "#D97706",
//           "warning-content": "#110500",
//           "error": "#DC2626",
//           "error-content": "#ffd9d4"
// }
//       },
    ],
  },
};
