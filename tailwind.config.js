module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      // keep small (mobile) as default
      sm: '640px',
      // move md up so typical tablets remain in the mobile (base/sm) styles
      md: '1024px',
      // larger breakpoints
      lg: '1280px',
      xl: '1440px',
    },
    extend: {},
  },
  plugins: [],
};
