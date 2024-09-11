import styles from "../../styles/brackets/BracketsView.module.css";
import BracketNode from "./BracketNode";

export default function BracketsView({ matches }) {
	return (
		<div className={styles.brackets_view}>
			<BracketNode node={matches} />
		</div>
	);
}
