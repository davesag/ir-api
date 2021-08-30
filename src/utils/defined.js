const identity = value => value

const defined = (value, fn = identity) =>
  // eslint-disable-next-line fp/no-nil
  typeof value === 'number' && isNaN(value) ? NaN : value === undefined ? undefined : fn(value)

module.exports = defined
