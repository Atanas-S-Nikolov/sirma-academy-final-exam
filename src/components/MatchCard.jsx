import styles from "../styles/MatchCard.module.css";
import { useSelector } from "react-redux";

export default function MatchCard({ matchId }) {
	const { aTeamId, bTeamId, date, score } = useSelector(
		(state) => state.matches.data[matchId],
	);
	const aTeamName = useSelector((state) => state.teams.data[aTeamId].name);
	const bTeamName = useSelector((state) => state.teams.data[bTeamId].name);

	return (
		<div className={styles.match_card}>
			<span className={styles.date}>{date}</span>
			<h4>
				{aTeamName} {score} {bTeamName}
			</h4>
		</div>
	);
}
