
import * as maths from "./maths";
import * as random from "./random";
import * as Span from "./Span";

export default class Rect {

  // Constructor

  constructor(x, y, w, h) {

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

  }

  // Get/set

  get width() {
    return this.w;
  }
  get height() {
    return this.h;
  }

  set width(val) {
    this.w = val;
  }
  set height(val) {
    this.h = val;
  }

  get left() {
    return this.x;
  }
  get top() {
    return this.y;
  }
  get right() {
    return this.x + this.w;
  }
  get bottom() {
    return this.y + this.h;
  }

  get xSpan() {
    return new Span(this.x, this.x + this.w);
  }
  get ySpan() {
    return new Span(this.y, this.y + this.h);
  }

  get centerX() {
    return this.lerpX(0.5);
  }
  get centerY() {
    return this.lerpY(0.5);
  }
  get center() {
    return {
      x: this.centerX,
      y: this.centerY
    };
  }

  get bottomRight() {
    return {
      x: this.right,
      y: this.bottom
    }
  }
  get topLeft() {
    return {
      x: this.left,
      y: this.top
    }
  }

  get randomX() {
    return random.num(this.left, this.right);
  }
  get randomY() {
    return random.num(this.top, this.bottom);
  }
  get randomPt() {
    return {
      x: this.randomX,
      y: this.randomY
    };
  }

  get whRatio() {
    return this.w / this.h;
  }
  get hwRatio() {
    return this.h / this.w;
  }


  // Public methods

  clone() {
    return new Rect(this.x, this.y, this.w, this.h);
  }

  toString() {
    return `(x: ${this.x}, y: ${this.y}, w: ${this.w}, h: ${this.h})`;
  }

  contains(x, y) {
    if (x < this.left) return false;
    if (x > this.right) return false;
    if (y < this.top) return false;
    if (y > this.bottom) return false;
    return true;
  }

  equals(rectB) {
    if (this.x !== rectB.x) return false;
    if (this.y !== rectB.y) return false;
    if (this.w !== rectB.w) return false;
    if (this.h !== rectB.h) return false;
    return true;
  }

  clampXY(x, y) {
    return {
      x: maths.clamp(x, this.left, this.right),
      y: maths.clamp(y, this.top, this.bottom)
    }
  }

  lerpX(val) {
    return maths.lerp(this.left, this.right, val);
  }
  lerpY(val) {
    return maths.lerp(this.top, this.bottom, val);
  }

  normX(val) {
    return maths.norm(val, this.left, this.right);
  }
  normY(val) {
    return maths.norm(val, this.top, this.bottom);
  }

  mapX(val, min, max) {
    return maths.lerp(min, max, this.normX(val));
  }
  mapY(val, min, max) {
    return maths.lerp(min, max, this.normY(val));
  }

  absolutize() {

    let tempX  = this.x,
        tempY  = this.y,
        tempW  = this.w,
        tempH  = this.h;

    if (tempW < 0) {
      this.x = tempX + tempW;
      this.w = -tempW;
    }

    if (tempH < 0) {
      this.y = tempY + tempH;
      this.h = -tempH;
    }

  }
  absolutized() {
    let r = this.clone();
        r.absolutize()
    return r;
  }

}
