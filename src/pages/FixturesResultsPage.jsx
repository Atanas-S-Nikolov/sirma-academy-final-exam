import GroupStage from "../components/groups/GroupStage";
import withLayout from "../layouts/Layout";
import { collectGroupMatches } from "../utils/MatchUtils";

export default function FixturesResults() {
	const groups = collectGroupMatches();
	return (
		<>
			<GroupStage groups={groups} />
		</>
	);
}

export const FixturesResultsPage = withLayout(FixturesResults);
