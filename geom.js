
import * as maths from "./maths";

// Pts

export function transformPt(pt, scaleX, scaleY, rads) {
  return rotatePt(scalePt(pt, scaleX, scaleY), rads);
}
export function scalePt(pt, scaleX, scaleY) {

  return {
    x: pt.x * scaleX,
    y: pt.y * scaleY
  };

}
export function rotatePt(pt, rads, origin) {

  let ox = (origin === undefined) ? 0 : origin.x,
      oy = (origin === undefined) ? 0 : origin.y;

  let dx = pt.x - ox,
      dy = pt.y - oy;

  let aSin = Math.sin(rads),
      aCos = Math.cos(rads);

  let x  = (aCos * dx) - (aSin * dy) + ox,
      y  = (aSin * dx) + (aCos * dy) + oy

  return { x, y };

}

export function ptAroundCircle(rad, perc, origin = null) {

  let angle = (perc * maths.TAO) - (Math.PI / 2),
      x     = (origin ? origin.x : 0) + (rad * Math.cos(angle)),
      y     = (origin ? origin.y : 0) + (rad * Math.sin(angle));

  return { x, y };

}

export function dist(pt1, pt2) {
  return Math.sqrt(distSq(pt1, pt2));
}
export function distXY(x1, y1, x2, y2) {
  return Math.sqrt(distSqXY(x1, y1, x2, y2));
}

export function distSq(pt1, pt2) {
  return distSqXY(pt1.x, pt1.y, pt2.x, pt2.y);
}
export function distSqXY(x1, y1, x2, y2) {
  return ((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1));
}

export function lerpPt(p1, p2, val = 0.5) {
  return {
    x: maths.lerp(p1.x, p2.x, val),
    y: maths.lerp(p1.y, p2.y, val)
  };
}


// Trig

export function degToRad(degs) {
  return degs * (maths.TAO / 360);
}
export function radToDeg(rads) {
  return rads * (360 / maths.TAO);
}

export function getRadFromPts(fromPt, toPt) {

  if (toPt === undefined) {
    toPt    = { x: fromPt.x, y: fromPt.y };
    fromPt  = { x: 0, y: 0 };
  }

  return Math.atan2(toPt.y - fromPt.y, toPt.x - fromPt.x);

}
export function getRadFromXY(fromX, fromY, toX, toY) {

  if (toX === undefined || toY === undefined) {
    toX   = fromX;
    toY   = fromY;
    fromX = 0;
    fromY = 0;
  }

  return Math.atan2(toY - fromY, toX - fromX);

}


// Areas

export function lerpRect(rectA, rectB, val = 0.5) {

  return {
    x:      maths.lerp(rectA.x,      rectB.x,      val),
    y:      maths.lerp(rectA.y,      rectB.y,      val),
    width:  maths.lerp(rectA.width,  rectB.width,  val),
    height: maths.lerp(rectA.height, rectB.height, val)
  };

}

export function getFillRect(w, h, area) {

  const aw = area.width,
        ah = area.height,
        ax = area.x,
        ay = area.y,
        sw = ah * w / h,
        sh = aw * h / w,
        rw = (sw > aw) ? sw : aw,
        rh = (sw > aw) ? ah : sh,
        rx = Math.min(ax, Math.max(ax + aw - rw, ax + Math.round((aw - rw) / 2))),
        ry = Math.min(ay, Math.max(ay + ah - rh, ay + Math.round((ah - rh) / 2)));

  return {
    x: rx,
    y: ry,
    width: rw,
    height: rh
  };

}
export function getFitRect(w, h, area) {

  const aw = area.width,
        ah = area.height,
        ax = area.x,
        ay = area.y,
        sw = ah * w / h,
        sh = aw * h / w,
        rw = (sw <= aw) ? sw : aw,
        rh = (sw <= aw) ? ah : sh,
        rx = ax + Math.round((aw - rw) / 2),
        ry = ay + Math.round((ah - rh) / 2);

  return {
    x: rx,
    y: ry,
    width: rw,
    height: rh
  };

}
