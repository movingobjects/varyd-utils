# Varyd utils
An ES6 JavaScript utility library.

## Usage

Load entire library.

```js
import * as varyd from 'varyd';

varyd.Maths.lerp(5, 10, 0.25);
varyd.Random.boolean(0.25);
```

Load individual pieces.

```js
import { Range } from 'varyd';

const r = new Range(0, 10);
```

```js
import { getLatin } from 'varyd/Text';

console.log(getLatin(25, true));

```
