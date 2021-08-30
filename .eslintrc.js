/* eslint-disable fp/no-mutation */
module.exports = {
  extends: ['standard', 'plugin:prettier/recommended', 'plugin:fp/recommended'],
  plugins: ['fp', 'mocha'],
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    'fp/no-mutation': ['error', { commonjs: true }],
    'fp/no-rest-parameters': 'off',
    'prettier/prettier': ['error', { singleQuote: true, semi: false }]
  }
}
