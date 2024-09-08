import styles from "../styles/MatchCard.module.css";
import { useSelector } from "react-redux";

export default function MatchCard({ match }) {
	const { aTeamId, bTeamId, date, score } = match;
	const teams = useSelector((state) => state.teams.data);
	const aTeam = teams[aTeamId].name;
	const bTeam = teams[bTeamId].name;

	return (
		<div className={styles.match_card}>
			<span className={styles.date}>{date}</span>
			<h4>
				{aTeam} {score} {bTeam}
			</h4>
		</div>
	);
}
