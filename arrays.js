
import * as maths from './maths';
import * as random from './random';
import * as Range from './Range';

export function shuffled(arr) {
  return random.shuffle(arr);
}
export function randomItem(arr) {
  return random.item(arr);
}

export function unique(arr) {
  return Array.from(new Set(arr));
}
export function addOnce(arr, item) {
  if (arr.indexOf(item) == -1) {
    arr.push(item);
  }
}

export function includesAny(arr, vals) {
  return vals.some((val) => arr.includes(val));
}

export function bifurcate(arr, fn) {
  return arr.reduce((acc, val, i) => {
    acc[fn(val, i) ? 0 : 1].push(val);
    return acc;
  }, [[], []]);
}
export function chunk(arr, size) {
  return Array.from({
    length: Math.ceil(arr.length / size)
  }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
}

export function next(i, arr, clamp = false) {
  return maths.nextWithin(i, 0, arr.length - 1, clamp);
}
export function prev(i, arr, clamp = false) {
  return maths.prevWithin(i, 0, arr.length - 1, clamp);
}
export function nextItem(item, arr, clamp = false) {
  return arr[next(arr.indexOf(item), arr, clamp)];
}
export function prevItem(item, arr, clamp = false) {
  return arr[prev(arr.indexOf(item), arr, clamp)];
}

export function firstItem(arr) {
  return arr[0];
}
export function lastItem(arr) {
  return arr[lastIndex(arr)];
}
export function lastIndex(arr) {
  return arr.length - 1;
}

export function wrapIndex(i, arr) {
  return maths.wrap(i, 0, arr.length - 1);
}
export function indexOfEach(arr, val) {
  const indices = [];
  arr.forEach((item, i) => (item === val) && indices.push(i));
  return indices;
}
export function getIndexRange(arr) {
  return new Range(0, arr.length - 1);
}
