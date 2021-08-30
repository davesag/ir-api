module.exports = {
  plugins: ['mocha'],
  env: {
    mocha: true
  },
  rules: {
    'padded-blocks': 0,
    'no-unused-expressions': 0,
    'no-unused-vars': 1,
    'fp/no-nil': 0,
    'fp/no-unused-expression': 0,
    'fp/no-mutation': 0,
    'fp/no-let': 0
  }
}
