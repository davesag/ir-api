const toTime = string => {
  const err = string => {
    throw new Error(`${string} is not an ISO Date string`)
  }
  if (typeof string !== 'string') err(string)
  const time = Date.parse(string)
  if (isNaN(time)) err(string)
  return time
}

/* ignores the value if it's empty.  use isRequired to enforce requirement */
const isTime =
  ({ before, after } = {}) =>
  value => {
    if (!value) return null
    try {
      const time = toTime(value)
      const isBefore = before ? toTime(before) : null
      const isAfter = after ? toTime(after) : null
      if (isBefore && isAfter) {
        return time < isBefore && time > isAfter
          ? null
          : `Expected time to be between ${after} and ${before}`
      }
      if (isBefore) {
        return time < isBefore ? null : `Expected time to be before ${before}`
      }
      if (isAfter) {
        return time > isAfter ? null : `Expected time to be after ${after}`
      }
      return null
    } catch (err) {
      // console.error(err)
      return err.message
    }
  }

module.exports = isTime
