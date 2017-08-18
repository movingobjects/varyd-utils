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

let progress = vayrd.maths.norm(25, 0, 100),
    isGoat   = varyd.random.boolean(2/3);
```

Load individual pieces.

```js
import { Span, text } from 'varyd-utils';

let charCount = new Span(10, 20),
    latinText = text.getLatin(charCount.randomInt, true);

console.log(latinText);
```
