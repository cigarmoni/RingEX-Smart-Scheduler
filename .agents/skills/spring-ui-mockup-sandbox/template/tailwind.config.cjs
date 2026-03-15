/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './index.html',
    'node_modules/@ringcentral/spring-ui/**/*.js',
  ],
  plugins: [
    require('@ringcentral/spring-theme/tailwind')(),
  ],
};
