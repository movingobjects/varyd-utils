# Varyd utils
An ES6 JavaScript utility library.

## Installation

```shell
$ npm install varyd-utils --save
```

## Usage

Load entire library.

```js
import * as varyd from 'varyd-utils';

varyd.maths.lerp(5, 10, 0.25);
varyd.random.boolean(0.25);
```

Load individual pieces.

```js
import { Range } from 'varyd-utils';

const r = new Range(0, 10);
```
