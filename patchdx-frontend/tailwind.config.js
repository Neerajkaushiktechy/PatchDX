const flowbite = require("flowbite-react/tailwind");
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    colors: {
      'primary': '#4A55B3',
      'secondary': '#8B43A3',
      'outline': '#969BA6',
      'secondary-text': '#001647',
      'table-stripe': '#F9FAFB',
      'input-bg': '#F4F4F4',
      'table-outline': '#EAECF0',
      'label': '#052F5D',
      'radio': '#ededed',
      'color-blue': '#CCDAF4',
      'value': '#51677F',
      'spinner-overlay': '#595959b3',
      'card': '#F9F9F9',
      'list-stroke': '#ABABAB',
      'sub-text': '#616161',
      'icon': '#2E5DBA',
      'error': '#CF0505',
      'light-green': '#DBE9AC',
      'light-purple-td': '#E9DAF9',
      'mention': 'rgb(246 246 246)',
      ...colors
    },
    extend: {
      boxShadow: {
        'full': 'rgba(0, 0, 0, 0.2) 0px 0px 6px',
        'card': '0px 3px 8px rgba(0, 0, 0, 0.1)',
        'shadow-light': '0px 4px 18px #E2E6FE',
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}