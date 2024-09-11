import styles from "../../styles/match/MatchDetailsView.module.css";
import { useSelector } from "react-redux";
import TeamSquad from "../teams/TeamSquad";

export default function MatchDetailsView({ match }) {
	const { aTeamId, bTeamId, date, score } = match;
	const { name: aTeamName, managerFullName: aManagerFullName } = useSelector(
		(state) => state.teams.data[aTeamId],
	);
	const { name: bTeamName, managerFullName: bManagerFullName } = useSelector(
		(state) => state.teams.data[bTeamId],
	);
	const players = useSelector((state) => state.players.data);
	const aTeamPlayers = Object.values(players).filter(
		(p) => p.teamId === aTeamId,
	);
	const bTeamPlayers = Object.values(players).filter(
		(p) => p.teamId === bTeamId,
	);
	const [aTeamScore, bTeamScore] = score.split("-");
	const matchResultText =
		aTeamScore === bTeamScore
			? "Draw!"
			: aTeamScore > bTeamScore
				? `${aTeamName} wins!`
				: `${bTeamName} wins!`;

	return (
		<section className={styles.match_details}>
			<h6 className={styles.date}>{date}</h6>
			<section className={styles.results_wrapper}>
				<h3>{aTeamName}</h3>
				<h3>{score}</h3>
				<h3>{bTeamName}</h3>
			</section>
			<h5 className={styles.match_result_text}>{matchResultText}</h5>
			<section className={styles.teams_formations}>
				<TeamSquad
					team={aTeamName}
					manager={aManagerFullName}
					players={aTeamPlayers}
				/>
				<TeamSquad
					team={bTeamName}
					manager={bManagerFullName}
					players={bTeamPlayers}
				/>
			</section>
		</section>
	);
}
