export function arrayToObject(arr) {
	const obj = {};
	arr.forEach((element) => {
		const { id, ...rest } = element;
		obj[id] = rest;
	});
	return obj;
}

export function isObjectEmpty(object) {
	return JSON.stringify(object) === "{}";
}
