
import * as maths from "./maths";
import * as random from "./random";
import * as Span from "./Span";


export function shuffled(a) {
	return random.shuffle(a);
}
export function randomItem(a) {
	return random.item(a);
}

export function removeDuplicates(a) {
	return Array.from(new Set(a));
}

export function addOnce(a, item) {
	if (a.indexOf(item) == -1) {
		a.push(item);
	}
}

export function next(i, a, clamp = false) {
	return maths.nextWithin(i, 0, a.length - 1, clamp);
}
export function prev(i, a, clamp = false) {
	return maths.prevWithin(i, 0, a.length - 1, clamp);
}

export function nextItem(item, a, clamp = false) {

	let i		= a.indexOf(item),
		iNext	= next(i, a, clamp);

	return a[iNext];

}
export function prevItem(item, a, clamp = false) {

	let i		= a.indexOf(item),
		iPrev	= prev(i, a, clamp);

	return a[iPrev];

}

export function removeFirst(a, item) {
	for (let i = 0; i < a.length; i++) {
		if (a[i] == item) {
			a.splice(i, 1);
			return;
		}
	}
}
export function removeAll(a, item) {
	for (let i = 0; i < a.length; i++) {
		if (a[i] == item) {
			a.splice(i, 1);
			i--;
		}
	}
}

export function contains(a, item) {
	return (a.indexOf(item) != -1);
}

export function wrapIndex(i, a) {
	return maths.wrap(i, 0, a.length - 1);
}

export function firstItem(a) {
	return a[0];
}
export function lastItem(a) {
	return a[lastIndex(a)];
}

export function lastIndex(a) {
	return a.length - 1;
}

export function getIndexSpan(a) {
	return new Span(0, a.length - 1);
}