
import * as geom from './geom';
import * as random from './random';

export default class Vec {

  constructor(x, y) {

    const xIsVec  = (x !== null) && (typeof x === 'object') && (x.x !== undefined) && (x.y !== undefined);

    if (xIsVec) {
      this.x  = x.x;
      this.y  = x.y;

    } else {
      this.x  = x;
      this.y  = y;
    }

  }

  // Get/set

  get magnitude() {
    return Math.sqrt(this.magSq)
  }
  get length() {
    return this.magnitude;
  }

  get magSq() {
    return (this.x * this.x) + (this.y * this.y);
  }
  get lenSq() {
    return this.magSq;
  }


  // Methods

  static random(minX, maxX, minY, maxY) {
    return new Vec(random.num(minX, maxX), random.num(minY, maxY));
  }

  static fromPts(x1, y1, x2, y2) {
    return new Vec(x2 - x1, y2 - y1);
  }

  static fromAngle(angle, inDegrees = false) {
    if (inDegrees) {
      angle = angle * (maths.TAO / 360);
    }
    return new Vec(Math.cos(angle), Math.sin(angle));
  }

  distTo(pt) {
    return geom.dist(this.x, this.y, pt.x, pt.y);
  }
  distToXY(x, y) {
    return geom.dist(this.x, this.y, x, y);
  }
  distSqTo(pt) {
    return geom.distSq(this.x, this.y, pt.x, pt.y);
  }
  distSqToXY(x, y) {
    return geom.distSq(this.x, this.y, x, y);
  }

  add(v) {
    this.x  += v.x;
    this.y  += v.y;
  }
  subtract(v) {
    this.x  -= v.x;
    this.y  -= v.y;
  }
  multiply(val) {
    this.x  *= val;
    this.y  *= val;
  }
  divide(val) {
    this.x  /= val;
    this.y  /= val;
  }

  normalize(scale) {
    var mag  = this.magnitude;
    if (mag != 0) {
      this.divide(mag);
      if (scale !== undefined) {
        this.multiply(scale);
      }
    }
  }
  limit(val) {
    var mag  = this.magnitude;
    if (mag > val && mag != 0) {
      this.divide(mag);
      this.multiply(val);
    }
  }

  dot(v) {
    return (this.x * v.x) + (this.y * v.y);
  }
  angleBetween(v) {
    return Math.acos(this.dot(v) / (this.magnitude * v.magnitude));
  }

  wrapIn(x, y, w, h) {
    while (this.x < x) this.x += w;
    while (this.y < y) this.y += h;
    while (this.x > w + x) this.x -= w;
    while (this.y > h + y) this.y -= h;
  }
  wrapInRect(rect) {
    this.wrapIn(rect.x, rect.y, rect.w, rect.h);
  }

  clone() {
    return new Vec(this.x, this.y);
  }
  toString() {
    return `(x: ${x}, y: ${y})`;
  }

}
