export function setArrValueIfAbsent(key, value, map) {
	const oldValue = map.get(key);
	if (oldValue) {
		map.set(key, [...oldValue, value]);
	} else {
		map.set(key, [value]);
	}
}
