import styles from "../../styles/groups/GroupStage.module.css";

import { GROUPS } from "../../constants/GlobalConstants";
import Group from "./Group";

export default function GroupStage({ groups }) {
	return (
		<section className={styles.group_stage}>
			<h2>Groups</h2>
			<div className={styles.groups_wrapper}>
				{GROUPS.map((groupName) => (
					<Group
						key={groupName}
						group={{ groupName, matchesIds: groups.get(groupName) }}
					/>
				))}
			</div>
		</section>
	);
}
