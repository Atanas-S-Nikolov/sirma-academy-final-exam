import UploadCardsContainer from "../components/UploadCardsContainer";
import FileUploadMessage from "../components/utils/FileUploadMessage";

import { useSelector } from "react-redux";

import withLayout from "../layouts/Layout";
import { Navigate } from "react-router-dom";
import { FIXTURES_AND_RESULTS } from "../constants/UrlConstants";

function Home() {
	const hasMatches = useSelector((state) => state.matches.hasData);
	const hasPlayers = useSelector((state) => state.players.hasData);
	const hasRecords = useSelector((state) => state.records.hasData);
	const hasTeams = useSelector((state) => state.teams.hasData);
	const hasData = hasMatches && hasPlayers && hasRecords && hasTeams;

	if (hasData) {
		return <Navigate to={FIXTURES_AND_RESULTS} replace />
	}

	return (
		<>
			<UploadCardsContainer />
			{hasMatches ? <FileUploadMessage fileTypeName="matches" /> : null}
			{hasPlayers ? <FileUploadMessage fileTypeName="players" /> : null}
			{hasRecords ? <FileUploadMessage fileTypeName="records" /> : null}
			{hasTeams ? <FileUploadMessage fileTypeName="teams" /> : null}
		</>
	);
}

const HomePage = withLayout(Home);
export default HomePage;
