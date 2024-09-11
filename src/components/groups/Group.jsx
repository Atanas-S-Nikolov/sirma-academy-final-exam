import styles from "../../styles/groups/Group.module.css";
import MatchRow from "../match/MatchRow";

export default function Group({ group }) {
	const { groupName, matchesIds } = group;

	return (
		<section className={styles.group_section}>
			<h6>Group {groupName}</h6>
			<section className={styles.matches_section}>
				{matchesIds.map((id) => (
					<MatchRow key={id} matchId={id} />
				))}
			</section>
		</section>
	);
}
