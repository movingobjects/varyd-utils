
// Get

export function num(min = 1, max = NaN) {
  if (isNaN(max)) {
    max  = min;
    min  = 0;
  }
  return (Math.random() * (max - min)) + min;
}
export function int(min, max = NaN) {
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

export function color() {
  return int(0xffffff);
}

export function norm(times = 2) {
  let sum  = 0;
  for (let i = 0; i < times; i++) {
    sum += Math.random();
  }
  return sum/times;
}

export function wiggle(n, freedom) {
  return n + num(-freedom, freedom);
}


// Geom

export function ptInCircle(radius) {

  const t = num(2 * Math.PI),
        u = num() + num(),
        r = (u > 1) ? (2 - u) : u;

  return {
    x: radius * r * Math.cos(t),
    y: radius * r * Math.sin(t)
  };

}


// Arrays

export function shuffle(arr) {

  let a    = arr.slice(),
      m    = a.length,
      i    = 0,
      swap = 0;

  while (m) {
    i    = Math.floor(Math.random() * m--);
    swap = a[m];
    a[m] = a[i];
    a[i] = swap;
  }

  return a;

}

export function index(a) {
  return (a.length) ? int(a.length - 1) : -1;
}

export function item(a) {
  return a[index(a)];
}
export function items(a, count) {
  return shuffle(a).slice(0, count);
}
