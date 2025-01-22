module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    requireConfigFile: false, // Убирает необходимость в babel.config.js
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    
  },
};
