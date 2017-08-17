
import Maths from "varyd/Maths";
import Random from "varyd/Random";

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
    return Random.num(this.min, this.max);
  }
  get randomInt() {
    return Random.integer(this.min, this.max);
  }

  get isIntRange() {
    return Maths.isInt(this.min) && Maths.isInt(this.max);
  }


  // Methods
  /////////////////////////////////////////////

  lerp(val, clamp = false) {
    return Maths.lerp(this.min, this.max, val, clamp);
  }
  norm(val, clamp = false) {
    return Maths.norm(val, this.min, this.max, clamp);
  }

  mapFrom(val, fromMin, fromMax) {
    return Maths.map(val, fromMin, fromMax, this.min, this.max);
  }
  mapTo(val, toMin, toMax) {
    return Maths.map(val, this.min, this.max, toMin, toMax);
  }

  mapFromRange(val, fromRange, clamp = false) {
    return Maths.map(val, fromRange.min, fromRange.max, this.min, this.max, clamp);
  }
  mapToRange(val, toRange, clamp = false) {
    return Maths.map(val, this.min, this.max, toRange.min, toRange.max, clamp);
  }

  clamp(val) {
    return Maths.clamp(val, this.min, this.max);
  }
  wrap(val) {
    if (Maths.isInt(val) && isIntRange) {
      return Maths.wrap(val, this.min, this.max);
    } else {
      return Maths.wrapNum(val, this.min, this.max);
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
    this.min = Maths.clamp(this.min, trimMin, trimMax);
    this.max = Maths.clamp(this.max, trimMin, trimMax);
  }

  toString() {
    return "[" + min + ".." + max + "]";
  }
  clone() {
    return new Range(this.min, this.max);
  }

}
