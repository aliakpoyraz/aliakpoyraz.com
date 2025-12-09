/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- BURASI DEĞİŞTİ (Eskiden sadece 'tailwindcss' idi)
    autoprefixer: {},
  },
};

export default config;