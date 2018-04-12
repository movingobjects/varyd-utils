
import * as maths from "./maths";

export function toHex(color) {

  let hex = color.toString(16);
      hex = '000000'.substr(0, 6 - hex.length) + hex;

  return `#${hex}`;

}
export function toRgb(color) {
  return {
    r: ((color >> 16) & 0xFF) / 255,
    g: ((color >>  8) & 0xFF) / 255,
    b: ((color      ) & 0xFF) / 255
  }
}
export function toHsv(color) {

  let { r, g, b } = toRgb(color);

  let max = Math.max(r, g, b),
      min = Math.min(r, g, b);

  let h, s, v = max;

  let d = max - min;
      s = (max == 0) ? 0 : (d / max);

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, v };

}

export function fromHex(hex) {

  let hasHash = hex.charAt(0) == "#",
      hexVal  = hex.substr(hasHash ? 1 : 0, 6);

  return parseInt(hexVal, 16);

}
export function fromRgb(r, g, b) {
  return (((r * 255) << 16) + ((g * 255) << 8) + (b * 255 | 0));
}
export function fromHsv(h, s, v) {

  let r, g, b;

  let i = Math.floor(h * 6),
      f = h * 6 - i,
      p = v * (1 - s),
      q = v * (1 - f * s),
      t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return fromRgb(r, g, b);

}

export function hexToRgb(hex) {
  return toRgb(fromHex(hex));
}
export function hexToHsv(hex) {
  return toHsv(fromHex(hex));
}
export function rgbToHex(r, g, b) {
  return toHex(fromRgb(r, g, b));
}
export function rgbToHsv(r, g, b) {
  return toHsv(fromRgb(r, g, b));
}
export function hsvToHex(h, s, v) {
  return toHex(fromHsv(h, s, v));
}
export function hsvToRgb(h, s, v) {
  return toRgb(fromHsv(h, s, v));
}

export function getMix(colorA, colorB, amt) {

  let rgbA = toRgb(colorA),
      rgbB = toRgb(colorB);

  let r = maths.lerp(rgbA.r, rgbB.r, amt),
      g = maths.lerp(rgbA.g, rgbB.g, amt),
      b = maths.lerp(rgbA.b, rgbB.b, amt);

  return fromRgb(r, g, b);

}
