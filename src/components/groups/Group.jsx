import styles from "../../styles/groups/Group.module.css";
import MatchCard from "../MatchCard";

export default function Group({ group }) {
	const { groupName, matchesIds } = group;

	return (
		<section>
			<h4>Group {groupName}</h4>
			<section className={styles.group_section}>
				{matchesIds.map((id) => (
					<MatchCard key={id} matchId={id} />
				))}
			</section>
		</section>
	);
}
