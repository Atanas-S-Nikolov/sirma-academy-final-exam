import UploadCardsContainer from "./components/UploadCardsContainer";
import MatchCard from "./components/MatchCard";
import FileUploadMessage from "./components/utils/FileUploadMessage";

import { useDispatch, useSelector } from "react-redux";

import { clearMatches } from "./lib/store/slices/matchesSlice";
import { clearPlayers } from "./lib/store/slices/playersSlice";
import { clearRecords } from "./lib/store/slices/recordsSlice";
import { clearTeams } from "./lib/store/slices/teamsSlice";
import { isObjectEmpty } from "./utils/ObjectUtils";

export default function App() {
	const dispatch = useDispatch();
	const matches = useSelector((state) => state.matches.data);
	const players = useSelector((state) => state.players.data);
	const records = useSelector((state) => state.records.data);
	const teams = useSelector((state) => state.teams.data);
	const hasMatches = !isObjectEmpty(matches);
	const hasPlayers = !isObjectEmpty(players);
	const hasRecords = !isObjectEmpty(records);
	const hasTeams = !isObjectEmpty(teams);
	const hasData = hasMatches && hasPlayers && hasRecords && hasTeams;
	const matchesArr = Object.values(matches);

	function resetState() {
		dispatch(clearMatches());
		dispatch(clearPlayers());
		dispatch(clearRecords());
		dispatch(clearTeams());
	}

	if (hasData) {
		return (
			<>
				<button onClick={resetState}>Reset</button>
				{matchesArr.map((match, index) => (
					<MatchCard key={index} match={match} />
				))}
			</>
		);
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
