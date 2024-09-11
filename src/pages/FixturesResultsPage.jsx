import GroupStage from "../components/groups/GroupStage";
import withLayout from "../layouts/Layout";
import { collectGroupMatches } from "../utils/MatchUtils";

function FixturesResults() {
	const groups = collectGroupMatches();
	return (
		<>
			<GroupStage groups={groups} />
		</>
	);
}

const FixturesResultsPage = withLayout(FixturesResults);
export default FixturesResultsPage;
