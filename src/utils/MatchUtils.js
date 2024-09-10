import {
	GROUPS_STAGE_END_DATE,
	QUALIFICATIONS_ROUNDS_KEYS,
} from "../constants/GlobalConstants";
import { comparedDates, isBefore } from "./DateUtils";
import { setArrValueIfAbsent } from "./MapUtils";
import store from "../lib/store/globalStore";

function isGroupStage(date) {
	return isBefore(date, GROUPS_STAGE_END_DATE);
}

export function collectGroupMatches() {
	const matches = store.getState().matches.data;
	const teams = store.getState().teams.data;
	const groupMatches = new Map();

	Object.keys(matches).forEach((key) => {
		const match = matches[key];
		if (isGroupStage(match.date)) {
			const group = teams[match.aTeamId].group;
			setArrValueIfAbsent(group, key, groupMatches);
		}
	});

	return groupMatches;
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

function combineQualificationMatches(matches) {
	const quarterFinals = matches.get(QUALIFICATIONS_ROUNDS_KEYS.quarterFinals);
	const semiFinals = matches.get(QUALIFICATIONS_ROUNDS_KEYS.semiFinals);
	const final = matches.get(QUALIFICATIONS_ROUNDS_KEYS.final);
	const rounds = [...quarterFinals, ...semiFinals, ...final];

	let root = {};
	for (let firstIndex = 0; firstIndex < rounds.length - 1; firstIndex++) {
		const currentMatch = rounds[firstIndex];
		const newChildren = [];

		for (
			let secondIndex = firstIndex + 1;
			secondIndex < rounds.length;
			secondIndex++
		) {
			const nextMatch = rounds[secondIndex];

			for (let index = 0; index < nextMatch.children.length; index++) {
				const id = nextMatch.children[index];
				if (id === currentMatch.id) {
					nextMatch.children[index] = currentMatch;
					newChildren.push(nextMatch);
				}
			}

			if (newChildren.length > 0) {
				root = nextMatch;
			}
		}
	}

	return root;
}

export function collectQualificationMatches() {
	const matches = store.getState().matches.data;

	const qualificationMatches = new Map([
		[QUALIFICATIONS_ROUNDS_KEYS.quarterFinals, []],
		[QUALIFICATIONS_ROUNDS_KEYS.semiFinals, []],
		[QUALIFICATIONS_ROUNDS_KEYS.final, []],
	]);
	const qualificationArr = [];

	Object.keys(matches).forEach((key) => {
		const match = matches[key];
		if (!isGroupStage(match.date)) {
			qualificationArr.push({ id: key, ...match });
		}
	});

	const roundOfSixteenCopy = [];
	const quarterFinalsCopy = [];
	const semiFinalsCopy = [];

	qualificationArr
		.sort((a, b) => comparedDates(a.date, b.date))
		.forEach(({ id }, index) => {
			if (index < 8) {
				const roundOfSixteenMatch = { id, children: null };
				roundOfSixteenCopy.push(roundOfSixteenMatch);
			} else if (index < 12) {
				const quarterFinalsMatch = buildNodes(id, roundOfSixteenCopy, matches);
				setArrValueIfAbsent(
					QUALIFICATIONS_ROUNDS_KEYS.quarterFinals,
					quarterFinalsMatch,
					qualificationMatches,
				);
				quarterFinalsCopy.push(quarterFinalsMatch);
			} else if (index < 14) {
				const semiFinalsMatch = buildNodes(id, quarterFinalsCopy, matches);
				setArrValueIfAbsent(
					QUALIFICATIONS_ROUNDS_KEYS.semiFinals,
					semiFinalsMatch,
					qualificationMatches,
				);
				semiFinalsCopy.push(semiFinalsMatch);
			} else {
				setArrValueIfAbsent(
					QUALIFICATIONS_ROUNDS_KEYS.final,
					buildNodes(id, semiFinalsCopy, matches),
					qualificationMatches,
				);
			}
		});

	return combineQualificationMatches(qualificationMatches);
}
