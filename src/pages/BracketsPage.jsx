import BracketsView from "../components/brackets/BracketsView";
import withLayout from "../layouts/Layout";
import { collectQualificationMatches } from "../utils/MatchUtils";

function Brackets() {
	const qualificationMatches = collectQualificationMatches();

	return (
		<>
			<BracketsView matches={qualificationMatches}/>
		</>
	);
}

const BracketsPage = withLayout(Brackets);
export default BracketsPage;
