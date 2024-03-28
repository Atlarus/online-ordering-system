/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': {'max': '639px'},      // Small screens, such as mobile phones
        'md': {'min': '640px', 'max': '767px'},      // Medium screens, such as tablets
        'lg': {'min': '768px'},     // Large screens, such as laptops
      },
    },
  },
  plugins: [],
}

