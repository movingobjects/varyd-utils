
export const TAO          = Math.PI * 2;
export const PHI          = (1 + Math.sqrt(5)) / 2;
export const GOLDEN_RATIO = PHI;
export const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));


// Interpolation

export function lerp(min, max, val = 0.5, doClamp = false) {
  let output = (min * (1 - val)) + (max * val);
  return doClamp ? clamp(output, min, max) : output;
}

export function coserp(min, max, val = 0.5, doClamp = false) {
  let output = lerp(min, max, (1 - Math.cos(val * Math.PI)) / 2);
  return doClamp ? clamp(output, min, max) : output;
}
export function smoothStep(min, max, val = 0.5, doClamp = false) {
  let output = lerp(min, max, val * val * (3 - (2 * val)))
  return doClamp ? clamp(output, min, max) : output;
}
export function smootherStep(min, max, val = 0.5, doClamp = false) {
  let output = lerp(min, max, val * val * val * (val * (6 * val - 15) + 10))
  return doClamp ? clamp(output, min, max) : output;
}

export function norm(val, min, max, doClamp = false) {
  let output = (val - min) / (max - min);
  return doClamp ? clamp(output, 0, 1) : output;
}

export function map(val, min, max, tmin, tmax, doClamp = false) {
  return lerp(tmin, tmax, norm(val, min, max, doClamp));
}

export function uniToBi(val) {
  return map(val, 0, 1, -1, 1);
}

export function biToUni(val) {
  return norm(val, -1, 1);
}


// Loops & ranges

export function nextWithin(num, min, max, doClamp = false) {
  if (doClamp) {
    return clamp(num + 1, min, max);
  } else {
    return addWithin(num, 1, min, max);
  }
}
export function prevWithin(num, min, max, doClamp = false) {
  if (doClamp) {
    return clamp(num - 1, min, max);
  } else {
    return subtractWithin(num, 1, min, max);
  }
}

export function addWithin(num, inc, min, max) {
  return wrap(num + inc, min, max);
}
export function subtractWithin(num, sub, min, max) {
  return wrap(num - sub, min, max);
}

export function wrap(num, min, max) {
  let r = max - min + 1,
      n = ((num - min) % r);
  if (n < 0) {
    return max + n + 1;
  } else {
    return min + n;
  }
}

export function wrapNum(num, min = 0, max = 1) {
  if (num < min) {
    return max - (min - num) % (max - min);
  } else {
    return min + (num - min) % (max - min);
  }
}

export function clamp(num, min = 0, max = 1) {
  if (min <= max) {
    return Math.max(min, Math.min(max, num));
  } else {
    return Math.min(max, Math.min(min, num));
  }
}


// Misc

export function sign(n) {
  return (n > 0) ? 1 : ((n < 0) ? -1 : 0);
}

export function roundTo(n, decimals) {
  let m = Math.pow(10, decimals);
  return Math.round(n * m) / m;
}

export function diff(a, b) {
  return Math.abs(a - b);
}

export function avg(...nums) {
  return nums.reduce((acc, cur, i) => (acc + cur)) / nums.length;
}

export function ease(val, trgt, factor = 0.5, threshold = 1) {
  return (isNaN(val) || diff(val, trgt) < threshold) ? trgt : lerp(val, trgt, factor);
}

export function isInt(val) {
  return val == Math.floor(val);
}

export function divisibleBy(val, divisor) {
  return (val % divisor) === 0;
}
