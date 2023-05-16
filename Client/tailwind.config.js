/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        dodgerblue: "#507fe9",
        gray: {
          "100": "#fefefe",
          "200": "rgba(0, 0, 0, 0.57)",
          "300": "rgba(0, 0, 0, 0.62)",
        },
        gainsboro: {
          "100": "rgba(230, 231, 232, 0)",
          "200": "rgba(217, 217, 217, 0)",
        },
        steelblue: "rgba(54, 107, 175, 0)",
      },
      fontFamily: {
        inter: "Inter",
      },
      borderRadius: {
        "12xs": "1px",
        mini: "15px",
      },
    },
    fontSize: {
      xl: "20px",
      "5xl": "24px",
      lg: "18px",
      "17xl": "36px",
      base: "16px",
      "45xl": "64px",
      "120xl": "139px",
      "148xl": "167px",
      lgi: "19px",
    },
  },
  plugins: [],
}