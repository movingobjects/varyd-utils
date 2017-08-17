(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("varyd-utils", [], factory);
	else if(typeof exports === 'object')
		exports["varyd-utils"] = factory();
	else
		root["varyd-utils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lerp = lerp;
exports.coserp = coserp;
exports.norm = norm;
exports.map = map;
exports.uniToBi = uniToBi;
exports.biToUni = biToUni;
exports.nextWithin = nextWithin;
exports.prevWithin = prevWithin;
exports.addWithin = addWithin;
exports.subtractWithin = subtractWithin;
exports.wrap = wrap;
exports.wrapNum = wrapNum;
exports.clamp = clamp;
exports.sign = sign;
exports.roundTo = roundTo;
exports.diff = diff;
exports.avg = avg;
exports.ease = ease;
exports.isInt = isInt;
var TAO = exports.TAO = Math.PI * 2;

// 0.0 ... 1.0
/////////////////////////////////////////////

function lerp(min, max) {
  var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

  return min * (1 - val) + max * val;
}

function coserp(min, max) {
  var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

  return lerp(min, max, (1 - Math.cos(val * Math.PI)) / 2);
}

function norm(val, min, max) {
  return (val - min) / (max - min);
}

function map(val, min, max, tmin, tmax) {
  return lerp(tmin, tmax, norm(val, min, max));
}

function uniToBi(val) {
  return map(val, 0, 1, -1, 1);
}

function biToUni(val) {
  return norm(val, -1, 1);
}

// Loops & ranges
/////////////////////////////////////////////

function nextWithin(num, min, max) {
  var clamp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (clamp) {
    return clamp(num + 1, min, max);
  } else {
    return addWithin(num, 1, min, max);
  }
}
function prevWithin(num, min, max) {
  var clamp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  if (clamp) {
    return clamp(num - 1, min, max);
  } else {
    return subtractWithin(num, 1, min, max);
  }
}

function addWithin(num, inc, min, max) {
  return wrap(num + inc, min, max);
}
function subtractWithin(num, sub, min, max) {
  return wrap(num - sub, min, max);
}

function wrap(num, min, max) {
  var r = max - min + 1,
      n = (num - min) % r;
  if (n < 0) {
    return max + n + 1;
  } else {
    return min + n;
  }
}

function wrapNum(num) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (num < min) {
    return max - (min - num) % (max - min);
  } else {
    return min + (num - min) % (max - min);
  }
}

function clamp(num) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

  if (min <= max) {
    return Math.max(min, Math.min(max, num));
  } else {
    return Math.min(max, Math.min(min, num));
  }
}

// Misc
/////////////////////////////////////////////

function sign(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}

function roundTo(n, decimals) {
  var m = Math.pow(10, decimals);
  return Math.round(n * m) / m;
}

function diff(a, b) {
  return Math.abs(a - b);
}

function avg() {
  for (var _len = arguments.length, nums = Array(_len), _key = 0; _key < _len; _key++) {
    nums[_key] = arguments[_key];
  }

  return nums.reduce(function (acc, cur, i) {
    return acc + cur;
  }) / nums.length;
}

function ease(val, trgt) {
  var factor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;
  var threshold = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  return isNaN(val) || diff(val, trgt) < threshold ? trgt : lerp(val, trgt, factor);
}

function isInt(val) {
  return val == Math.floor(val);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.num = num;
exports.integer = integer;
exports.boolean = boolean;
exports.sign = sign;
exports.bit = bit;
exports.norm = norm;
exports.sort = sort;
exports.wiggle = wiggle;
exports.shuffle = shuffle;
exports.index = index;
exports.item = item;
exports.items = items;

// Get
/////////////////////////////////////////////

function num() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;

  if (isNaN(max)) {
    max = min;
    min = 0;
  }
  return Math.random() * (max - min) + min;
}
function integer(min) {
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;

  if (isNaN(max)) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function boolean() {
  var chance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;

  return Math.random() < chance;
}
function sign() {
  var chance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;

  return Math.random() < chance ? 1 : -1;
}
function bit() {
  var chance = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.5;

  return Math.random() < chance ? 1 : 0;
}

function norm() {
  var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

  var sum = 0;
  for (var i = 0; i < times; i++) {
    sum += Math.random();
  }
  return sum / times;
}

function sort(a, b) {
  return sign();
}

function wiggle(n, freedom) {
  return n + num(-freedom, freedom);
}

// Arrays
/////////////////////////////////////////////

function shuffle(a) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

  if (a.length <= 1) return a;
  var r = a.slice();
  for (var i = 0; i < times; i++) {
    r.sort(sort);
  }
  return r;
}

function index(a) {
  return a.length ? a.length * Math.random() : -1;
}

function item(a) {
  return a[index(a)];
}
function items(a, count) {
  return shuffle(a).slice(0, count);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maths = __webpack_require__(0);

var _maths2 = _interopRequireDefault(_maths);

var _random = __webpack_require__(1);

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Range = function () {

  // Constructor
  /////////////////////////////////////////////

  function Range() {
    var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : NaN;
    var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : NaN;

    _classCallCheck(this, Range);

    if (isNaN(max) && isNaN(max)) {
      this.min = 0;
      this.max = 1;
    } else if (isNaN(max)) {
      this.min = 0;
      this.max = min;
    } else {
      this.min = min;
      this.max = max;
    }
  }

  // Getters & setters
  /////////////////////////////////////////////

  _createClass(Range, [{
    key: "lerp",


    // Methods
    /////////////////////////////////////////////

    value: function lerp(val) {
      var clamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return _maths2.default.lerp(this.min, this.max, val, clamp);
    }
  }, {
    key: "norm",
    value: function norm(val) {
      var clamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      return _maths2.default.norm(val, this.min, this.max, clamp);
    }
  }, {
    key: "mapFrom",
    value: function mapFrom(val, fromMin, fromMax) {
      return _maths2.default.map(val, fromMin, fromMax, this.min, this.max);
    }
  }, {
    key: "mapTo",
    value: function mapTo(val, toMin, toMax) {
      return _maths2.default.map(val, this.min, this.max, toMin, toMax);
    }
  }, {
    key: "mapFromRange",
    value: function mapFromRange(val, fromRange) {
      var clamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return _maths2.default.map(val, fromRange.min, fromRange.max, this.min, this.max, clamp);
    }
  }, {
    key: "mapToRange",
    value: function mapToRange(val, toRange) {
      var clamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return _maths2.default.map(val, this.min, this.max, toRange.min, toRange.max, clamp);
    }
  }, {
    key: "clamp",
    value: function clamp(val) {
      return _maths2.default.clamp(val, this.min, this.max);
    }
  }, {
    key: "wrap",
    value: function wrap(val) {
      if (_maths2.default.isInt(val) && isIntRange) {
        return _maths2.default.wrap(val, this.min, this.max);
      } else {
        return _maths2.default.wrapNum(val, this.min, this.max);
      }
    }
  }, {
    key: "contains",
    value: function contains(val) {
      return val >= this.min && val <= this.max;
    }
  }, {
    key: "invert",
    value: function invert() {
      var temp = this.min;
      this.min = this.max;
      this.max = temp;
    }
  }, {
    key: "trim",
    value: function trim(trimMin, trimMax) {
      this.min = _maths2.default.clamp(this.min, trimMin, trimMax);
      this.max = _maths2.default.clamp(this.max, trimMin, trimMax);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "[" + min + ".." + max + "]";
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Range(this.min, this.max);
    }
  }, {
    key: "min",
    get: function get() {
      return this.min;
    },
    set: function set(num) {
      this.min = num;
    }
  }, {
    key: "max",
    get: function get() {
      return this.max;
    },
    set: function set(num) {
      this.max = num;
    }
  }, {
    key: "middle",
    get: function get() {
      return this.lerp(0.5);
    }
  }, {
    key: "center",
    get: function get() {
      return this.lerp(0.5);
    }
  }, {
    key: "length",
    get: function get() {
      return this.max - this.min;
    }
  }, {
    key: "range",
    get: function get() {
      return this.max - this.min;
    }
  }, {
    key: "random",
    get: function get() {
      return _random2.default.num(this.min, this.max);
    }
  }, {
    key: "randomInt",
    get: function get() {
      return _random2.default.integer(this.min, this.max);
    }
  }, {
    key: "isIntRange",
    get: function get() {
      return _maths2.default.isInt(this.min) && _maths2.default.isInt(this.max);
    }
  }]);

  return Range;
}();

exports.default = Range;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vec = exports.Range = exports.Rect = exports.text = exports.random = exports.maths = exports.geom = exports.arrays = undefined;

var _arrays = __webpack_require__(4);

var arrays = _interopRequireWildcard(_arrays);

var _geom = __webpack_require__(5);

var geom = _interopRequireWildcard(_geom);

var _maths = __webpack_require__(0);

var maths = _interopRequireWildcard(_maths);

var _random = __webpack_require__(1);

var random = _interopRequireWildcard(_random);

var _text = __webpack_require__(6);

var text = _interopRequireWildcard(_text);

var _Rect = __webpack_require__(7);

var Rect = _interopRequireWildcard(_Rect);

var _Range = __webpack_require__(2);

var Range = _interopRequireWildcard(_Range);

var _Vec = __webpack_require__(8);

var Vec = _interopRequireWildcard(_Vec);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.arrays = arrays;
exports.geom = geom;
exports.maths = maths;
exports.random = random;
exports.text = text;
exports.Rect = Rect;
exports.Range = Range;
exports.Vec = Vec;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.shuffled = shuffled;
exports.randomItem = randomItem;
exports.removeDuplicates = removeDuplicates;
exports.addOnce = addOnce;
exports.next = next;
exports.prev = prev;
exports.nextItem = nextItem;
exports.prevItem = prevItem;
exports.removeFirst = removeFirst;
exports.removeAll = removeAll;
exports.contains = contains;
exports.wrapIndex = wrapIndex;
exports.wrapItem = wrapItem;
exports.firstItem = firstItem;
exports.lastItem = lastItem;
exports.lastIndex = lastIndex;

var _maths = __webpack_require__(0);

var _maths2 = _interopRequireDefault(_maths);

var _random = __webpack_require__(1);

var _random2 = _interopRequireDefault(_random);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shuffled(a) {
	return _random2.default.shuffle(a);
}
function randomItem(a) {
	return _random2.default.item(a);
}

function removeDuplicates(a) {
	return Array.from(new Set(a));
}

function addOnce(a, item) {
	if (a.indexOf(item) == -1) {
		a.push(item);
	}
}

function next(i, a) {
	var clamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	return _maths2.default.nextWithin(i, 0, a.length - 1, clamp);
}
function prev(i, a) {
	var clamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	return _maths2.default.prevWithin(i, 0, a.length - 1, clamp);
}

function nextItem(item, a) {
	var clamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


	var i = a.indexOf(item),
	    iNext = arrays.next(i, a, clamp);

	return a[iNext];
}
function prevItem(item, a) {
	var clamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


	var i = a.indexOf(item),
	    iPrev = arrays.prev(i, a, clamp);

	return a[iPrev];
}

function removeFirst(item, a) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] == item) {
			a.splice(i, 1);
			return;
		}
	}
}
function removeAll(item, a) {
	for (var i = 0; i < a.length; i++) {
		if (a[i] == item) {
			a.splice(i, 1);
			i--;
		}
	}
}

function contains(a, item) {
	return a.indexOf(item) != -1;
}

function wrapIndex(i, a) {
	return _maths2.default.wrap(i, 0, a.length - 1);
}
function wrapItem(i, a) {
	return a[wrapIndex(i, a)];
}

function firstItem(a) {
	return a[0];
}
function lastItem(a) {
	return a[lastIndex(a)];
}

function lastIndex(a) {
	return a.length - 1;
}

/*
export function getIndexRange(a) {
	return new Range(0, a.length - 1);
}
*/

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformPt = transformPt;
exports.scalePt = scalePt;
exports.rotatePt = rotatePt;
exports.ptAroundCircle = ptAroundCircle;
exports.dist = dist;
exports.distXY = distXY;
exports.distSq = distSq;
exports.distSqXY = distSqXY;
exports.lerpPt = lerpPt;
exports.degToRad = degToRad;
exports.radToDeg = radToDeg;
exports.getRadFromPts = getRadFromPts;
exports.getRadFromXY = getRadFromXY;
exports.lerpRect = lerpRect;
exports.getFillRect = getFillRect;
exports.getFitRect = getFitRect;

var _maths = __webpack_require__(0);

var _maths2 = _interopRequireDefault(_maths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Pts
/////////////////////////////////////////////

function transformPt(pt, scaleX, scaleY, rads) {
  return rotatePt(scalePt(pt, scaleX, scaleY), rads);
}
function scalePt(pt, scaleX, scaleY) {

  return {
    x: pt.x * scaleX,
    y: pt.y * scaleY
  };
}
function rotatePt(pt, rads, origin) {

  var ox = origin === undefined ? 0 : origin.x,
      oy = origin === undefined ? 0 : origin.y;

  var dx = pt.x - ox,
      dy = pt.y - oy;

  var aSin = Math.sin(rads),
      aCos = Math.cos(rads);

  var x = aCos * dx - aSin * dy + ox,
      y = aSin * dx + aCos * dy + oy;

  return { x: x, y: y };
}

function ptAroundCircle(rad, perc) {
  var origin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;


  var angle = perc * _maths2.default.TAO - Math.PI / 2,
      x = (origin ? origin.x : 0) + rad * Math.cos(angle),
      y = (origin ? origin.y : 0) + rad * Math.sin(angle);

  return { x: x, y: y };
}

function dist(pt1, pt2) {
  return Math.sqrt(distSq(pt1, pt2));
}
function distXY(x1, y1, x2, y2) {
  return Math.sqrt(distSqXY(x1, y1, x2, y2));
}

function distSq(pt1, pt2) {
  return distSqXY(pt1.x, pt1.y, pt2.x, pt2.y);
}
function distSqXY(x1, y1, x2, y2) {
  return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
}

function lerpPt(p1, p2) {
  var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;

  return {
    x: _maths2.default.lerp(p1.x, p2.x, val),
    y: _maths2.default.lerp(p1.y, p2.y, val)
  };
}

// Trig 
/////////////////////////////////////////////

function degToRad(degs) {
  return degs * (_maths2.default.TAO / 360);
}
function radToDeg(rads) {
  return rads * (360 / _maths2.default.TAO);
}

function getRadFromPts(fromPt, toPt) {

  if (toPt === undefined) {
    toPt = { x: fromPt.x, y: fromPt.y };
    fromPt = { x: 0, y: 0 };
  }

  return Math.atan2(toPt.y - fromPt.y, toPt.x - fromPt.x);
}
function getRadFromXY(fromX, fromY, toX, toY) {

  if (toX === undefined || toY === undefined) {
    toX = fromX;
    toY = fromY;
    fromX = 0;
    fromY = 0;
  }

  return Math.atan2(toY - fromY, toX - fromX);
}

// Areas
/////////////////////////////////////////////

function lerpRect(rectA, rectB) {
  var val = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.5;


  return {
    x: _maths2.default.lerp(rectA.x, rectB.x, val),
    y: _maths2.default.lerp(rectA.y, rectB.y, val),
    width: _maths2.default.lerp(rectA.width, rectB.width, val),
    height: _maths2.default.lerp(rectA.height, rectB.height, val)
  };
}

function getFillRect(w, h, area) {

  var aw = area.width,
      ah = area.height,
      ax = area.x,
      ay = area.y,
      sw = ah * w / h,
      sh = aw * h / w,
      rw = sw > aw ? sw : aw,
      rh = sw > aw ? ah : sh,
      rx = Math.min(ax, Math.max(ax + aw - rw, ax + Math.round((aw - rw) / 2))),
      ry = Math.min(ay, Math.max(ay + ah - rh, ay + Math.round((ah - rh) / 2)));

  return {
    x: rx,
    y: ry,
    width: rw,
    height: rh
  };
}
function getFitRect(w, h, area) {

  var aw = area.width,
      ah = area.height,
      ax = area.x,
      ay = area.y,
      sw = ah * w / h,
      sh = aw * h / w,
      rw = sw <= aw ? sw : aw,
      rh = sw <= aw ? ah : sh,
      rx = ax + Math.round((aw - rw) / 2),
      ry = ay + Math.round((ah - rh) / 2);

  return {
    x: rx,
    y: ry,
    width: rw,
    height: rh
  };
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLatin = getLatin;
exports.trunc = trunc;
exports.beginsWith = beginsWith;
exports.endsWith = endsWith;
var QUOTE_L = exports.QUOTE_L = "\u201C";
var QUOTE_R = exports.QUOTE_R = "\u201D";

function getLatin() {
  var wordCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var punctuate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


  var CHANCE_PERIOD = 0.1,
      CHANGE_COMMA = 0.15;

  var sourceWords = ["a", "ac", "accumsan", "ad", "adipiscing", "aenean", "aliquam", "amet", "ante", "aptent", "arcu", "at", "auctor", "augue", "bibendum", "blandit", "class", "commodo", "congue", "consectetur", "consequat", "conubia", "convallis", "cras", "curabitur", "cursus", "dapibus", "diam", "dictum", "dignissim", "dolor", "donec", "dui", "duis", "egestas", "eget", "eleifend", "elementum", "elit", "enim", "erat", "eros", "est", "et", "etiam", "eu", "euismod", "fames", "faucibus", "felis", "fermentum", "feugiat", "fringilla", "fusce", "gravida", "habitant", "hendrerit", "himenaeos", "iaculis", "id", "imperdiet", "in", "inceptos", "integer", "interdum", "ipsum", "justo", "lacinia", "lacus", "laoreet", "lectus", "leo", "libero", "ligula", "litora", "lobortis", "lorem", "luctus", "maecenas", "magna", "malesuada", "massa", "mattis", "mauris", "metus", "mi", "mollis", "morbi", "nam", "nec", "neque", "netus", "nibh", "nisi", "nisl", "non", "nostra", "nulla", "nullam", "nunc", "odio", "orci", "ornare", "pellentesque", "per", "pharetra", "phasellus", "placerat", "porttitor", "posuere", "praesent", "pretium", "proin", "pulvinar", "purus", "quam", "quis", "quisque", "rhoncus", "risus", "rutrum", "sagittis", "sapien", "scelerisque", "sed", "sem", "semper", "senectus", "sit", "sociosqu", "suscipit", "suspendisse", "taciti", "tellus", "tempor", "tempus", "tincidunt", "torquent", "tortor", "tristique", "turpis", "ullamcorper", "ultrices", "ultricies", "urna", "ut", "varius", "vehicula", "vel", "velit", "venenatis", "vitae", "vivamus", "viverra", "volutpat", "vulputate"];

  while (sourceWords.length < wordCount) {
    sourceWords = sourceWords.concat(sourceWords);
  }

  var isNewSentence = true,
      words = random.items(sourceWords, wordCount),
      result = "";

  for (var i = 0; i < words.length; i++) {

    var isLastWord = i === arrays.lastIndex(words),
        nextWord = words[i];

    if (isNewSentence) {
      result += nextWord.charAt(0).toUpperCase() + nextWord.substr(1);
      isNewSentence = false;
    } else {
      result += words[i];
    }

    if (punctuate) {

      if (isLastWord) {
        result += ".";
      } else if (random.boolean(CHANCE_PERIOD)) {
        result += ". ";
        isNewSentence = true;
      } else if (random.boolean(CHANCE_COMMA)) {
        result += ", ";
      } else {
        result += " ";
      }
    } else if (!isLastWord) {
      result += " ";
    }
  }

  return result;
}

function trunc(s, charCount) {
  var addElipsis = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!s) return "";
  if (s.length <= charCount) {
    return s;
  } else {
    if (addElipsis) {
      return s.substr(0, charCount - 3) + "...";
    } else {
      return s.substr(0, charCount);
    }
  }
}

function beginsWith(s, test) {
  return s.substr(0, test.length) === test;
}

function endsWith(s, test) {
  return s.substr(-test.length) === test;
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _maths = __webpack_require__(0);

var _maths2 = _interopRequireDefault(_maths);

var _random = __webpack_require__(1);

var _random2 = _interopRequireDefault(_random);

var _Range = __webpack_require__(2);

var _Range2 = _interopRequireDefault(_Range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rect = function () {

  // Constructor
  /////////////////////////////////////////////

  function Rect(x, y, w, h) {
    _classCallCheck(this, Rect);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  // Getters & setters
  /////////////////////////////////////////////

  _createClass(Rect, [{
    key: "clone",


    // Public methods
    /////////////////////////////////////////////

    value: function clone() {
      return new Rect(this.x, this.y, this.w, this.h);
    }
  }, {
    key: "contains",
    value: function contains(x, y) {
      if (x < this.left) return false;
      if (x > this.right) return false;
      if (y < this.top) return false;
      if (y > this.bottom) return false;
      return true;
    }
  }, {
    key: "equals",
    value: function equals(rectB) {
      if (this.x !== rectB.x) return false;
      if (this.y !== rectB.y) return false;
      if (this.w !== rectB.w) return false;
      if (this.h !== rectB.h) return false;
      return true;
    }
  }, {
    key: "clampXY",
    value: function clampXY(x, y) {
      return {
        x: _maths2.default.clamp(x, this.left, this.right),
        y: _maths2.default.clamp(y, this.top, this.bottom)
      };
    }
  }, {
    key: "lerpX",
    value: function lerpX(val) {
      return _maths2.default.lerp(this.left, this.right, val);
    }
  }, {
    key: "lerpY",
    value: function lerpY(val) {
      return _maths2.default.lerp(this.top, this.bottom, val);
    }
  }, {
    key: "normX",
    value: function normX(val) {
      return _maths2.default.norm(val, this.left, this.right);
    }
  }, {
    key: "normY",
    value: function normY(val) {
      return _maths2.default.norm(val, this.top, this.bottom);
    }
  }, {
    key: "width",
    get: function get() {
      return this.w;
    },
    set: function set(val) {
      this.w = val;
    }
  }, {
    key: "height",
    get: function get() {
      return this.h;
    },
    set: function set(val) {
      this.h = val;
    }
  }, {
    key: "left",
    get: function get() {
      return this.x;
    }
  }, {
    key: "top",
    get: function get() {
      return this.y;
    }
  }, {
    key: "right",
    get: function get() {
      return this.x + this.w;
    }
  }, {
    key: "bottom",
    get: function get() {
      return this.y + this.h;
    }
  }, {
    key: "xRange",
    get: function get() {
      return new _Range2.default(this.x, this.x + this.w);
    }
  }, {
    key: "yRange",
    get: function get() {
      return new _Range2.default(this.y, this.y + this.h);
    }
  }, {
    key: "centerX",
    get: function get() {
      return this.lerpX(0.5);
    }
  }, {
    key: "centerY",
    get: function get() {
      return this.lerpY(0.5);
    }
  }, {
    key: "center",
    get: function get() {
      return {
        x: this.centerX,
        y: this.centerY
      };
    }
  }, {
    key: "bottomRight",
    get: function get() {
      return {
        x: this.right,
        y: this.bottom
      };
    }
  }, {
    key: "topLeft",
    get: function get() {
      return {
        x: this.left,
        y: this.top
      };
    }
  }, {
    key: "randomX",
    get: function get() {
      return _random2.default.num(this.left, this.right);
    }
  }, {
    key: "randomY",
    get: function get() {
      return _random2.default.num(this.top, this.bottom);
    }
  }, {
    key: "randomPt",
    get: function get() {
      return {
        x: this.randomX,
        y: this.randomY
      };
    }
  }, {
    key: "whRatio",
    get: function get() {
      return this.w / this.h;
    }
  }, {
    key: "hwRatio",
    get: function get() {
      return this.h / this.w;
    }
  }]);

  return Rect;
}();

exports.default = Rect;
module.exports = exports["default"];

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec = function () {
  function Vec(x, y) {
    _classCallCheck(this, Vec);

    var xIsVec = x !== null && (typeof x === "undefined" ? "undefined" : _typeof(x)) === "object" && x.x !== undefined && x.y !== undefined;

    if (xIsVec) {
      this.x = x.x;
      this.y = x.y;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  // Getters & setters
  /////////////////////////////////////////////

  _createClass(Vec, [{
    key: "distTo",
    value: function distTo(pt) {
      return geom.dist(this.x, this.y, pt.x, pt.y);
    }
  }, {
    key: "distToXY",
    value: function distToXY(x, y) {
      return geom.dist(this.x, this.y, x, y);
    }
  }, {
    key: "distSqTo",
    value: function distSqTo(pt) {
      return geom.distSq(this.x, this.y, pt.x, pt.y);
    }
  }, {
    key: "distSqToXY",
    value: function distSqToXY(x, y) {
      return geom.distSq(this.x, this.y, x, y);
    }
  }, {
    key: "add",
    value: function add(v) {
      this.x += v.x;
      this.y += v.y;
    }
  }, {
    key: "subtract",
    value: function subtract(v) {
      this.x -= v.x;
      this.y -= v.y;
    }
  }, {
    key: "multiply",
    value: function multiply(val) {
      this.x *= val;
      this.y *= val;
    }
  }, {
    key: "divide",
    value: function divide(val) {
      this.x /= val;
      this.y /= val;
    }
  }, {
    key: "normalize",
    value: function normalize(scale) {
      var mag = this.magnitude;
      if (mag != 0) {
        this.divide(mag);
        if (scale !== undefined) {
          this.multiply(scale);
        }
      }
    }
  }, {
    key: "limit",
    value: function limit(val) {
      var mag = this.magnitude;
      if (mag > val && mag != 0) {
        this.divide(mag);
        this.multiply(val);
      }
    }
  }, {
    key: "dot",
    value: function dot(v) {
      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: "angleBetween",
    value: function angleBetween(v) {
      return Math.acos(this.dot(v) / (this.magnitude * v.magnitude));
    }
  }, {
    key: "wrapIn",
    value: function wrapIn(x, y, w, h) {
      while (this.x < x) {
        this.x += w;
      }while (this.y < y) {
        this.y += h;
      }while (this.x > w + x) {
        this.x -= w;
      }while (this.y > h + y) {
        this.y -= h;
      }
    }
  }, {
    key: "wrapInRect",
    value: function wrapInRect(rect) {
      this.wrapIn(rect.x, rect.y, rect.w, rect.h);
    }
  }, {
    key: "clone",
    value: function clone() {
      return new Vec(this.x, this.y);
    }
  }, {
    key: "toString",
    value: function toString() {
      return "(x: " + this.x + ", y: " + this.y + ")";
    }
  }, {
    key: "magnitude",
    get: function get() {
      return Math.sqrt(this.magSq);
    }
  }, {
    key: "length",
    get: function get() {
      return this.magnitude;
    }
  }, {
    key: "magSq",
    get: function get() {
      return this.x * this.x + this.y * this.y;
    }
  }, {
    key: "lenSq",
    get: function get() {
      return this.magSq;
    }

    // Methods
    /////////////////////////////////////////////

  }], [{
    key: "random",
    value: function (_random) {
      function random(_x, _x2, _x3, _x4) {
        return _random.apply(this, arguments);
      }

      random.toString = function () {
        return _random.toString();
      };

      return random;
    }(function (minX, maxX, minY, maxY) {
      return new Vec(random.num(minX, maxX), random.num(minY, maxY));
    })
  }, {
    key: "fromPts",
    value: function fromPts(x1, y1, x2, y2) {
      return new Vec(x2 - x1, y2 - y1);
    }
  }]);

  return Vec;
}();

exports.default = Vec;
module.exports = exports["default"];

/***/ })
/******/ ]);
});
//# sourceMappingURL=varyd-utils.js.map