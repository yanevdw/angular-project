/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        seasalt: "rgb(251, 248, 246)",
        linen: "rgb(241, 234, 225)",
        "light-coral": "rgb(225, 115, 113)",
        "burnt-sienna": "rgb(218, 136, 110)",
        cardinal: "rgb(203, 0, 61)",
        "old-gold": "rgb(206, 187, 96)",
        "green-gray": "rgb(124, 145, 135)",
        amaranth: "rgb(225, 80, 103)",
        "indigo-dye": "rgb(49, 79, 106)",
        "dull-violet": "rgb(140, 128, 181)",
        "mantis-green": "rgb(121, 181, 123)",
        "pale-brown": "rgb(118, 92, 84)",
        "slate-gray": "rgb(116, 115, 143)",
        "china-rose": "rgb(190, 83, 99)",
        "dark-amaranth": "rgb(180, 80, 95)",
        "dark-mantis-green": "rgb(94, 125, 97)",
        "dark-dull-violet": "rgb(130, 112, 156)",
      },
      fontFamily: {
        "rouge-script": ['"Rouge Script"', ...defaultTheme.fontFamily.sans],
        pacifico: ['"Pacifico"', ...defaultTheme.fontFamily.sans],
        "tilt-neon": ['"Tilt Neon"', ...defaultTheme.fontFamily.sans],
      },
      height: {
        "7/20": "35%",
        "13/20": "65%",
        "9/10": "90%",
      },
      width: {
        "1/25": "4%",
        "9/10": "90%",
        "19/20": "95%",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
