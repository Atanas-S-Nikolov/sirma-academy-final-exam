import styles from "../../styles/teams/TeamSquad.module.css";

export default function TeamSquad({ team, manager, players }) {
	return (
		<section className={styles.team_squad}>
			<span className={styles.team_name}>{team}</span>
			<span>Manager: <b>{manager}</b></span>
			<table className={styles.squad_table}>
				<thead>
					<tr>
						<th>#</th>
						<th>Full name</th>
						<th>Pos.</th>
					</tr>
				</thead>
				<tbody>
					{players.map(({ teamNumber, fullName, position }) => (
						<tr className={styles.player_row} key={teamNumber}>
							<td>{teamNumber}</td>
							<td>{fullName}</td>
							<td>
								<span
									className={`${styles.position} ${styles[position.toLowerCase()]}`}
								>
									{position}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

