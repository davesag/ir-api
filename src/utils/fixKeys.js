const downcase = string => string.slice(0, 1).toLowerCase() + string.slice(1)

const fixKeys = input =>
  Array.isArray(input)
    ? input.map(fixKeys)
    : typeof input === 'object'
    ? Object.keys(input).reduce((acc, elem) => {
        acc[downcase(elem)] = fixKeys(input[elem])
        return acc
      }, {})
    : input

module.exports = fixKeys
