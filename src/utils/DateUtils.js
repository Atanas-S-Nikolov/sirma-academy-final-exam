export function isBefore(targetDateStr, dateToCompareWith) {
	const parsedDate = new Date(targetDateStr);
	return parsedDate <= new Date(dateToCompareWith);
}

export function comparedDates(targetDateStr, dateToCompareWith) {
	const parsedDate = new Date(targetDateStr);
	return parsedDate - new Date(dateToCompareWith);
}
