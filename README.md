# babel-plugin-transform-extract-badgee-logs

I'll think about it later

## Example

**In**

```js
// input code
```

**Out**

```js
"use strict";

// output code
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
