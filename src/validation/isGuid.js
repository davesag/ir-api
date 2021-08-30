/* eslint-disable fp/no-nil */
/* ignores the value if it's empty.  use isRequired to enforce requirement */
const isGuid = value =>
  !value ||
  (typeof value === 'string' &&
    value.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i) !==
      null)
    ? null
    : 'Invalid GUID'

module.exports = isGuid
