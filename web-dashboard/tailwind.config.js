export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0F172A",
        bureau: "#1E293B",
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
          900: "#164E63",
        },
        amber: "#F59E0B",
        magenta: "#EC4899",
      },
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
  plugins: [],
}
