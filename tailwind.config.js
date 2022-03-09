module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        umbriagrey: {
          background: "#262626",
          border: "#ffffff1a",
        },
        umbria: {
          50: "#c5a2ff",
          100: "#bb98ff",
          200: "#b18ef9",
          300: "#a784ef",
          400: "#9d7ae5",
          500: "#9370db",
          600: "#8966d1",
          700: "#7f5cc7",
          800: "#7552bd",
          900: "#6b48b3",
        },
      },
    },
  },
  plugins: [],
};
