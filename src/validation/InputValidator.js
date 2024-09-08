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
	const isValidNumber = /^\d+$/.test(num);

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
	const id = parts[0];
	const aTeamId = parts[1];
	const bTeamId = parts[2];
	const date = parts[3];
	const score = parts[4];

	for (let index = 0; index < 3; index++) {
		if (!validateNumber(parts[index])) {
			return false;
		}
	}

	if (!validateDate(date) || !SCORE_REGEX_PATTERN.test(score)) {
		return false;
	}

	return { id, aTeamId, bTeamId, date, score };
}

export function validatePlayersFileLine(line) {
	if (!validateString(line)) {
		return false;
	}

	const parts = line.split(COMMA);

	if (parts.length !== 5) {
		return false;
	}
	const id = parts[0];
	const teamNumber = parts[1];
	const position = parts[2];
	const fullName = parts[3];
	const teamId = parts[4];

	for (let index = 0; index < 2; index++) {
		if (!validateNumber(parts[index])) {
			return false;
		}
	}

	if (
		!PLAYERS_POSITIONS.includes(position) ||
		!validateString(fullName) ||
		!validateNumber(teamId)
	) {
		return false;
	}

	return { id, teamNumber, position, fullName, teamId };
}

export function validateRecordsFileLine(line) {
	if (!validateString(line)) {
		return false;
	}

	const parts = line.split(COMMA);

	if (parts.length !== 5) {
		return false;
	}
	const id = parts[0];
	const playerId = parts[1];
	const matchId = parts[2];
	const fromMinutes = parts[3];
	let toMinutes = parts[4];

	for (let index = 0; index < 3; index++) {
		if (!validateNumber(parts[index])) {
			return false;
		}
	}

	if (
		!validateNumber(fromMinutes, true) ||
		(!validateNumber(toMinutes) && toMinutes !== NULL_STRING)
	) {
		return false;
	}

	if (toMinutes === NULL_STRING) {
		toMinutes = "90";
	}

	return { id, playerId, matchId, fromMinutes, toMinutes };
}

export function validateTeamsFileLine(line) {
	if (!validateString(line)) {
		return false;
	}

	const parts = line.split(COMMA);

	if (parts.length !== 4) {
		return false;
	}
	const id = parts[0];
	const name = parts[1];
	const managerFullName = parts[2];
	const group = parts[3];

	for (let index = 1; index < 3; index++) {
		if (!validateString(parts[index])) {
			return false;
		}
	}

	if (!validateNumber(id) || !GROUPS.includes(group)) {
		return false;
	}

	return { id, name, managerFullName, group };
}
