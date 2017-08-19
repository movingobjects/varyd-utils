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

let isGoat   = varyd.random.boolean(2/3);
```

Load individual pieces.

```js
import { Span } from 'varyd-utils';

let countSpan = new Span(1, 10);
```

```js
import { getLatin } from 'varyd-utils/text';

console.log(getLatin(15, true));
```
