// eslint-disable-next-line fp/no-nil
const safeFn = (fn, ...params) => (typeof fn === 'function' ? fn(...params) : undefined)

module.exports = safeFn
