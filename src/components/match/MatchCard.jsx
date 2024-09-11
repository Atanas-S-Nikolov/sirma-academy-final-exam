import { Link } from "react-router-dom";
import styles from "../../styles/match/MatchCard.module.css";
import { useSelector } from "react-redux";
import { MATCH_DETAILS_URL } from "../../constants/UrlConstants";

export default function MatchCard({ matchId }) {
	const { aTeamId, bTeamId, date, score } = useSelector(
		(state) => state.matches.data[matchId],
	);
	const aTeamName = useSelector((state) => state.teams.data[aTeamId].name);
	const bTeamName = useSelector((state) => state.teams.data[bTeamId].name);

	return (
		<Link
			to={`${MATCH_DETAILS_URL}/${matchId}`}
			title={`${aTeamName} vs. ${bTeamName}`}
		>
			<div className={styles.match_card}>
				<span className={styles.date}>{date}</span>
				<h6>
					{aTeamName} {score} {bTeamName}
				</h6>
			</div>
		</Link>
	);
}
