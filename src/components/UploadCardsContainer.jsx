import styles from "../styles/UploadCardsContainer.module.css";

import RecordsIcon from "../assets/RecordsIcon.jsx";
import PlayersIcon from "../assets/PlayersIcon.jsx";
import ScoreboardIcon from "../assets/ScoreboardIcon.jsx";
import TeamIcon from "../assets/TeamIcon.jsx";

import UploadCard from "./UploadCard";
import {
	validateMatchesFileLine,
	validatePlayersFileLine,
	validateRecordsFileLine,
	validateTeamsFileLine,
} from "../validation/InputValidator.js";

const inputs = [
	{
		id: 1,
		text: "matches results",
		icon: <ScoreboardIcon />,
		headerRule: "ID,ATeamID,BTeamID,Date,Score",
		lineRule: validateMatchesFileLine,
	},
	{
		id: 2,
		text: "players",
		icon: <PlayersIcon />,
		headerRule: "ID,TeamNumber,Position,FullName,TeamID",
		lineRule: validatePlayersFileLine,
	},
	{
		id: 3,
		text: "records",
		icon: <RecordsIcon />,
		headerRule: "ID,PlayerID,MatchID,fromMinutes,toMinutes",
		lineRule: validateRecordsFileLine,
	},
	{
		id: 4,
		text: "teams",
		icon: <TeamIcon />,
		headerRule: "ID,Name,ManagerFullName,Group",
		lineRule: validateTeamsFileLine,
	},
];

export default function UploadCardsContainer() {
	return (
		<section className={styles.cards_container}>
			{inputs.map((input) => (
				<UploadCard key={input.id} data={input} />
			))}
		</section>
	);
}
