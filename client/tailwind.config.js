/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors:{
        blue: "#5d6481",
        gray44: "#44444444",
        low: "#a4aac6",
        medium: "#7f849a",
        high: "#4f525f"
      },
      borderWidth:{
        1: "1px"
      },
      borderRadius:{
        4: "4px",
        8: "8px",
        per50: "50%"
      },
      borderColor:{
        gray: "#c5c5c5"
      },
      transitionTimingFunction:{
        DEFAULT: "ease-in-out",
      },
      transitionDuration:{
        DEFAULT: "400ms"
      },
      spacing:{
        p10: "10px", 
        p30: "30px"
      }
      
    },
  },
  plugins: [],
}

