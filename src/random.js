
// Get
/////////////////////////////////////////////

export function num(min = 1, max = NaN) {
  if (isNaN(max)) {
    max  = min;
    min  = 0;
  }
  return (Math.random() * (max - min)) + min;
}
export function integer(min, max = NaN) {
  if (isNaN(max)) {
    max  = min;
    min  = 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function boolean(chance = 0.5) {
  return (Math.random() < chance);
}
export function sign(chance = 0.5) {
  return (Math.random() < chance) ? 1 : -1;
}
export function bit(chance = 0.5) {
  return (Math.random() < chance) ? 1 : 0;
}

export function norm(times = 2) {
  let sum  = 0;
  for (let i = 0; i < times; i++) {
    sum += Math.random();
  }
  return sum/times;
}

export function sort(a, b) {
  return sign();
}

export function wiggle(n, freedom) {
  return n + num(-freedom, freedom);
}


// Arrays
/////////////////////////////////////////////

export function shuffle(a, times = 5) {
  if (a.length <= 1) return a;
  let r  = a.slice();
  for (let i = 0; i < times; i++) {
    r.sort(sort);
  }
  return r;
}

export function index(a) {
  return (a.length) ? integer(a.length - 1) : -1;
}

export function item(a) {
  return a[index(a)];
}
export function items(a, count) {
  return shuffle(a).slice(0, count);
}

