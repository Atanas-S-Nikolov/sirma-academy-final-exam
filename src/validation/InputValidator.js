import { COMMA } from "../constants/CsvConstants";
import {
	GROUPS,
	NULL_STRING,
	PLAYERS_POSITIONS,
} from "../constants/GlobalUtils";

const SLASH = "/";
const DOT = ".";
const DASH = "-";
const WHITESPACE = /\s+/;
const SCORE_REGEX_PATTERN = /^(\d+-\d+)|(\d+\(\d+\)-\d+\(\d+)\)$/;

function getDateSeparator(dateStr) {
	const hasWhitespace = dateStr.search(WHITESPACE);
	if (dateStr.includes(SLASH)) {
		return SLASH;
	} else if (dateStr.includes(DOT)) {
		return DOT;
	} else if (dateStr.includes(DASH)) {
		return DASH;
	} else if (hasWhitespace !== -1) {
		return WHITESPACE;
	}

	return undefined;
}

export function validateDate(dateStr) {
	const isValidDate = !isNaN(new Date(dateStr));

	if (!isValidDate) {
		const separator = getDateSeparator(dateStr);

		if (!separator) {
			return false;
		}

		if (dateStr.split(separator).length !== 3) {
			return false;
		}
	}

	return true;
}

export function validateString(str) {
	return str && str.trim().length > 0;
}

export function validateNumber(num, includeZero = false) {
	const isValidNumber = !Number.isNaN(num);

	if (isValidNumber) {
		if (!includeZero && num == 0) {
			return false;
		}
	}

	return isValidNumber;
}

export function validateMatchesFileLine(line) {
	if (!validateString(line)) {
		return false;
	}

	const parts = line.split(COMMA);

	if (parts.length !== 5) {
		return false;
	}

	for (let index = 0; index < 3; index++) {
		if (!validateNumber(parts[index])) {
			return false;
		}
	}

	if (!validateDate(parts[3]) || !SCORE_REGEX_PATTERN.test(parts[4])) {
		return false;
	}

	return parts;
}

export function validatePlayersFileLine(line) {
	if (!validateString(line)) {
		return false;
	}

	const parts = line.split(COMMA);

	if (parts.length !== 5) {
		return false;
	}

	for (let index = 0; index < 2; index++) {
		if (!validateNumber(parts[index])) {
			return false;
		}
	}

	if (
		!PLAYERS_POSITIONS.includes(parts[2]) ||
		!validateString(parts[3]) ||
		!validateNumber(parts[4])
	) {
		return false;
	}

	return parts;
}

export function validateRecordsFileLine(line) {
	if (!validateString(line)) {
		return false;
	}

	const parts = line.split(COMMA);

	if (parts.length !== 5) {
		return false;
	}

	for (let index = 0; index < 3; index++) {
		if (!validateNumber(parts[index])) {
			return false;
		}
	}

	const toMinutes = parts[4];
	if (
		!validateNumber(parts[3], true) ||
		(!validateNumber(toMinutes) && toMinutes !== NULL_STRING)
	) {
		return false;
	}

	return parts;
}

export function validateTeamsFileLine(line) {
	if (!validateString(line)) {
		return false;
	}

	const parts = line.split(COMMA);

	if (parts.length !== 4) {
		return false;
	}

	if (!validateNumber(parts[0])) {
		return false;
	}

	for (let index = 1; index < 3; index++) {
		if (!validateString(parts[index])) {
			return false;
		}
	}

	if (!GROUPS.includes(parts[3])) {
		return false;
	}

	return parts;
}
