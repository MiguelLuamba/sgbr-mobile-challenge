import { COLORS} from "./src/utils/colors"
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: COLORS,

      fontFamily: {
        poppins: ['PoppinsRegular', 'sans-serif'],
        poppinsBold: ['PoppinsBold', 'sans-serif'],
        bebas: ['BebasNeue', 'sans-serif'],
        barlow: ['BarlowCondensed', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
      },


    },
  },
  plugins: [],
}