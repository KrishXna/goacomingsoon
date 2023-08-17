module.exports = {
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "spin-slowest": "spin 200s linear infinite",
      },
      colors: {
        white: { A700_7f: "#ffffff7f", A700: "#ffffff" },
        black: {
          900: "#000000",
          "900_b2": "#000000b2",
          "900_3f": "#0000003f",
          "900_01": "#0c0c0d",
          "900_93": "#00000093",
          "900_51": "#00000051",
        },
        gray: {
          400: "#b3b3b3",
          600: "#828080",
          700: "#606060",
          800: "#3c3c3c",
          900: "#1a1d23",
          "500_b2": "#b3a6a6b2",
          "900_00": "#1c1c2200",
        },
        amber: { A100: "#ffe27e" },
        blue_gray: {
          100: "#d9d9d9",
          900: "#333333",
          "400_c1": "#888686c1",
          "900_01": "#2b2b2b",
        },
        yellow: { 800: "#f9a11e", "800_01": "#f8a11e" },
        lime: { 900: "#a56d1a" },
        orange: { 400: "#ffa81c", 500: "#ff9900" },
      },
      fontFamily: { montserrat: ["Montserrat"], inter: "Inter" },
      fontSize: {
        xs: "0.75rem", //12px
        sm: "0.875rem", //14px
        md: "1.25rem", //20px
        lg: "1.563rem", //25px
        xlg: "1.875rem", //30px
        xl: "3.75rem", //60px
        xxl: "4.875rem", //77px
      },
      textShadow: {
        ts: "0px 4px  4px #00000094",
        ts2: "10px 4px  4px #0000003f",
        ts1: "2px 4px  4px #00000093",
      },
      boxShadow: {
        bs: "0px 4px  4px 0px #00000040",
        bs1: "0px 3.52px  3px 0px #00000094",
      },
      backgroundImage: {
        gradient: "linear-gradient(120.24deg ,#000,rgba(25, 25, 34, 0))",
        gradient1: "linear-gradient(148deg ,#0c0c0d,#1c1c2200)",
        gradient2: "linear-gradient(180deg ,#ffe27e,#ffa81c)",
      },
    },
  },
  // plugins: [require("@tailwindcss/forms"), require("tailwindcss-textshadow")],
};
