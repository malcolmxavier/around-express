module.exports = {
  env: {
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaFeatures: {
    },
    ecmaVersion: 12,
  },
  plugins: [
  ],
  rules: {
    'no-underscore-dangle': 'allow',
  },
};
