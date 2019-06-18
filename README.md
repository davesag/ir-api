# ir-api

A lean, functional Javascript client for the Independent Reserve API.

[![Greenkeeper badge](https://badges.greenkeeper.io/davesag/ir-api.svg)](https://greenkeeper.io/)

<!-- prettier-ignore -->
| branch | status | coverage | notes |
| ------ | ------ | -------- | ----- |
| `develop` | [![CircleCI](https://circleci.com/gh/davesag/ir-api/tree/develop.svg?style=svg)](https://circleci.com/gh/davesag/ir-api/tree/develop) | [![codecov](https://codecov.io/gh/davesag/ir-api/branch/develop/graph/badge.svg)](https://codecov.io/gh/davesag/ir-api) | Work in progress |
| `master` | [![CircleCI](https://circleci.com/gh/davesag/ir-api/tree/master.svg?style=svg)](https://circleci.com/gh/davesag/ir-api/tree/master) | [![codecov](https://codecov.io/gh/davesag/ir-api/branch/master/graph/badge.svg)](https://codecov.io/gh/davesag/ir-api) | Latest stable release |

[![NPM](https://nodei.co/npm/ir-api.png)](https://nodei.co/npm/ir-api/)

## Usage

`ir-api` has no dependencies of its own but requires `axios` as a peer dependency.

```sh
npm install axios ir-api
```

The API calls follow the documentation set out at https://www.independentreserve.com/api but start with a lower case letter instead of upper case.

Similarly all returned data will have keys that start with lower case instead of upper case.

### Public Methods

```js
const ir = require('ir-api')

const { getValidPrimaryCurrencyCodes } = ir()

getValidPrimaryCurrencyCodes().then(codes => {
  console.log('codes', codes)
})
```

### Private Methods

```js
const ir = require('ir-api')

const { getOpenOrders } = ir('my-api-key', 'my-api-secret')

getOpenOrders().then(data => {
  console.log('data', data)
})
```

### Passing parameters to methods

Parameters are passed as an object, so for example

```js
getOpenOrders({
  primaryCurrencyCode: 'Xbt',
  secondaryCurrencyCode: 'Usd'
}).then(data => {
  console.log('data', data)
})
```

### Default parameters

- `nonce`: computed for you
- `pageIndex`: `1`
- `pageSize`: `25`
- `signature`: computed for you

### using `async` / `await`

All methods return a resolved promise so you can safely use `async` / `await`

### example

See [this gist](https://gist.github.com/davesag/3567876481344419827e514bae78a02b) for an example of using the API to retrieve your IR balance, then get the market rates for each of your coins, convert to Australian Dollars and display a simple ASCII table with the results and a total.

### Errors

If an API call returns an error we return it as

```js
{
  code: 'some code', // an error code or numeric status
  message: 'some message' // some helpful message
}
```

## Development

### Prerequisites

- [NodeJS](htps://nodejs.org), version 8.10.0 or better (I use [`nvm`](https://github.com/creationix/nvm) to manage Node versions — `brew install nvm`.)

### Initialisation

```sh
npm install
```

### Test it

- `npm test` — runs the unit tests
- `npm run test:unit:cov` — runs the unit tests with code coverage
- `npm run test:mutants` — runs the mutation tests

### Lint it

```sh
npm run lint
```

## Contributing

Please see the [contributing notes](CONTRIBUTING.md).
