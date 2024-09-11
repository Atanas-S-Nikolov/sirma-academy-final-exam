import styles from "../../styles/match/MatchRow.module.css";
import { useSelector } from "react-redux";

export default function MatchRow({ matchId }) {
	const { aTeamId, bTeamId, date, score } = useSelector(
		(state) => state.matches.data[matchId],
	);
	const aTeamName = useSelector((state) => state.teams.data[aTeamId].name);
	const bTeamName = useSelector((state) => state.teams.data[bTeamId].name);
	const [aTeamScore, bTeamScore] = score.split("-");

	return (
		<section className={styles.match_row}>
			{date}
			<div>
				<p>
					{aTeamName} - {aTeamScore}
				</p>
				<p>
					{bTeamName} - {bTeamScore}
				</p>
			</div>
		</section>
	);
}
