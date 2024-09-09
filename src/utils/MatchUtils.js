import {
	GROUPS_STAGE_END_DATE,
	QUALIFICATIONS_ROUNDS_KEYS,
} from "../constants/GlobalConstants";
import { comparedDates, isBefore } from "./DateUtils";
import { setArrValueIfAbsent } from "./MapUtils";

export function distributeMatches(matches, teams) {
	const groupMatches = new Map();
	const qualifiedMatches = new Map([
		[QUALIFICATIONS_ROUNDS_KEYS.roundOfSixteen, []],
		[QUALIFICATIONS_ROUNDS_KEYS.quarterFinals, []],
		[QUALIFICATIONS_ROUNDS_KEYS.semiFinals, []],
		[QUALIFICATIONS_ROUNDS_KEYS.final, []],
	]);
	const qualifiedArr = [];

	Object.keys(matches).forEach((key) => {
		const match = matches[key];
		if (isBefore(match.date, GROUPS_STAGE_END_DATE)) {
			const group = teams[match.aTeamId].group;
			setArrValueIfAbsent(group, key, groupMatches);
		} else {
			qualifiedArr.push({ id: key, ...match });
		}
	});

	const roundOfSixteenCopy = [];
	const quarterFinalsCopy = [];
	const semiFinalsCopy = [];

	qualifiedArr
		.sort((a, b) => comparedDates(a.date, b.date))
		.forEach(({ id }, index) => {
			if (index < 8) {
				const roundOfSixteenMatch = { id, children: null };
				setArrValueIfAbsent(
					QUALIFICATIONS_ROUNDS_KEYS.roundOfSixteen,
					roundOfSixteenMatch,
					qualifiedMatches,
				);
				roundOfSixteenCopy.push(roundOfSixteenMatch);
			} else if (index < 12) {
				const quarterFinalsMatch = buildNodes(id, roundOfSixteenCopy, matches);
				setArrValueIfAbsent(
					QUALIFICATIONS_ROUNDS_KEYS.quarterFinals,
					quarterFinalsMatch,
					qualifiedMatches,
				);
				quarterFinalsCopy.push(quarterFinalsMatch);
			} else if (index < 14) {
				const semiFinalsMatch = buildNodes(id, quarterFinalsCopy, matches);
				setArrValueIfAbsent(
					QUALIFICATIONS_ROUNDS_KEYS.semiFinals,
					semiFinalsMatch,
					qualifiedMatches,
				);
				semiFinalsCopy.push(semiFinalsMatch);
			} else {
				setArrValueIfAbsent(
					QUALIFICATIONS_ROUNDS_KEYS.final,
					buildNodes(id, semiFinalsCopy, matches),
					qualifiedMatches,
				);
			}
		});

	return { groups: groupMatches, qualified: qualifiedMatches };
}

function buildNodes(parentId, childsIdsNodes, matches) {
	const parent = matches[parentId];
	const parentAteamID = parent.aTeamId;
	const parentBteamID = parent.bTeamId;
	const children = [];

	let childIdIndexToRemove;

	childsIdsNodes.forEach(({ id }, index) => {
		const child = matches[id];
		const childAteamID = child.aTeamId;
		const childBteamID = child.bTeamId;
		if (
			parentAteamID === childAteamID ||
			parentAteamID === childBteamID ||
			parentBteamID === childAteamID ||
			parentBteamID === childBteamID
		) {
			children.push(id);
			childIdIndexToRemove = index;
		}
	});

	if (childIdIndexToRemove) {
		childsIdsNodes.splice(childIdIndexToRemove, 1);
	}

	return { id: parentId, children };
}
