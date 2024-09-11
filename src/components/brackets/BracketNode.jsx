import styles from "../../styles/brackets/BracketNode.module.css";
import MatchCard from "../match/MatchCard";

export default function BracketNode({ node }) {
	const isLastNode = !(node.id && node.children);

	return (
		<div className={styles.bracket_node}>
            <MatchCard matchId={isLastNode ? node : node.id} />
			{!isLastNode ? (
				<div className={styles.children}>
					{node.children.map((childNode) => (
						<BracketNode key={childNode.id || childNode} node={childNode} />
					))}
				</div>
			) : null}
		</div>
	);
}
