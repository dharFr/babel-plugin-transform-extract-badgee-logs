# babel-plugin-transform-extract-badgee-logs

A [Babel](https://babeljs.io/) plugin to extract string from [badgee](https://github.com/dharFr/badgee) log calls and save them into an array.
_*This is still a work in progress, not suitable for production*_.

## Example

**In**

```js
// input code
import badgee from 'badgee';

badgee.log('Define logger');
const logger = badgee.get('logger');

function foo() {
  logger.log("logging to logger");
  blah();
}
```

**Out**

```js
// output code
import badgee from 'badgee';

badgee.log(___badgee[0]);
const logger = badgee.get('logger');

function foo() {
  logger.log(___badgee[1]);
  blah();
}
```

## Installation

```sh
$ npm install babel-plugin-transform-extract-badgee-logs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-extract-badgee-logs"]
}
```

### Via CLI

```sh
$ babel --plugins transform-extract-badgee-logs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-extract-badgee-logs"]
});
```
