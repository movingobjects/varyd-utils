
import * as maths from "./maths";
import * as random from "./random";

export default class Range {

  // Constructor
  /////////////////////////////////////////////

  constructor(min = NaN, max = NaN) {

    if (isNaN(max) && isNaN(max)) {
      this.min  = 0;
      this.max  = 1;
    } else if (isNaN(max)) {
      this.min  = 0;
      this.max  = min;
    } else {
      this.min  = min;
      this.max  = max;
    }

  }

  // Getters & setters
  /////////////////////////////////////////////

  get min() {
    return this.min;
  }
  get max() {
    return this.max;
  }

  set min(num) {
    this.min = num;
  }
  set max(num) {
    this.max = num;
  }

  get middle() {
    return this.lerp(0.5);
  }
  get center() {
    return this.lerp(0.5);
  }

  get length() {
    return this.max - this.min;
  }
  get range() {
    return this.max - this.min;
  }

  get random() {
    return random.num(this.min, this.max);
  }
  get randomInt() {
    return random.integer(this.min, this.max);
  }

  get isIntRange() {
    return maths.isInt(this.min) && maths.isInt(this.max);
  }


  // Methods
  /////////////////////////////////////////////

  lerp(val, clamp = false) {
    return maths.lerp(this.min, this.max, val, clamp);
  }
  norm(val, clamp = false) {
    return maths.norm(val, this.min, this.max, clamp);
  }

  mapFrom(val, fromMin, fromMax) {
    return maths.map(val, fromMin, fromMax, this.min, this.max);
  }
  mapTo(val, toMin, toMax) {
    return maths.map(val, this.min, this.max, toMin, toMax);
  }

  mapFromRange(val, fromRange, clamp = false) {
    return maths.map(val, fromRange.min, fromRange.max, this.min, this.max, clamp);
  }
  mapToRange(val, toRange, clamp = false) {
    return maths.map(val, this.min, this.max, toRange.min, toRange.max, clamp);
  }

  clamp(val) {
    return maths.clamp(val, this.min, this.max);
  }
  wrap(val) {
    if (maths.isInt(val) && isIntRange) {
      return maths.wrap(val, this.min, this.max);
    } else {
      return maths.wrapNum(val, this.min, this.max);
    }
  }

  contains(val) {
    return (val >= this.min) && (val <= this.max);
  }

  invert() {
    let temp = this.min;
    this.min = this.max;
    this.max = temp;
  }

  trim(trimMin, trimMax) {
    this.min = maths.clamp(this.min, trimMin, trimMax);
    this.max = maths.clamp(this.max, trimMin, trimMax);
  }

  toString() {
    return "[" + min + ".." + max + "]";
  }
  clone() {
    return new Range(this.min, this.max);
  }

}
