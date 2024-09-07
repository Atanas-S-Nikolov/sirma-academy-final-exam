import styles from "../styles/UploadCardsContainer.module.css";

import RecordsIcon from "../assets/RecordsIcon.jsx";
import PlayersIcon from "../assets/PlayersIcon.jsx";
import ScoreboardIcon from "../assets/ScoreboardIcon.jsx";
import TeamIcon from "../assets/TeamIcon.jsx";

import UploadCard from "./UploadCard";

const inputs = [
	{ id: 1, text: "matches results", icon: <ScoreboardIcon /> },
	{ id: 2, text: "players", icon: <PlayersIcon /> },
	{ id: 3, text: "records", icon: <RecordsIcon /> },
	{ id: 4, text: "teams", icon: <TeamIcon /> },
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
