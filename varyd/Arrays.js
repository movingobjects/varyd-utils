
import Maths from "varyd/Maths";
import Random from "varyd/Random";


export function shuffled(a) {
	return Random.shuffle(a);
}
export function randomItem(a) {
	return Random.item(a);
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
	return Maths.nextWithin(i, 0, a.length - 1, clamp);
}
export function prev(i, a, clamp = false) {
	return Maths.prevWithin(i, 0, a.length - 1, clamp);
}

export function nextItem(item, a, clamp = false) {

	let i		= a.indexOf(item),
		iNext	= Arrays.next(i, a, clamp);

	return a[iNext];

}
export function prevItem(item, a, clamp = false) {

	let i		= a.indexOf(item),
		iPrev	= Arrays.prev(i, a, clamp);

	return a[iPrev];

}

export function removeFirst(item, a) {
	for (let i = 0; i < a.length; i++) {
		if (a[i] == item) {
			a.splice(i, 1);
			return;
		}
	}
}
export function removeAll(item, a) {
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
	return Maths.wrap(i, 0, a.length - 1);
}
export function wrapItem(i, a) {
	return a[wrapIndex(i, a)];
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

/*
export function getIndexRange(a) {
	return new Range(0, a.length - 1);
}
*/