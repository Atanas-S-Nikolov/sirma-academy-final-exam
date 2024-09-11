import { useParams } from "react-router-dom";
import MatchDetailsView from "../components/match/MatchDetailsView";
import withLayout from "../layouts/Layout";
import { useSelector } from "react-redux";

function MatchDetails() {
	const { id } = useParams();
	const match = useSelector((state) => state.matches.data[id]);

	return (
		<>
			<MatchDetailsView match={match} />
		</>
	);
}

const MatchDetailsPage = withLayout(MatchDetails);
export default MatchDetailsPage;
