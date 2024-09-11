import styles from "../../styles/header/Navbar.module.css";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { clearMatches } from "../../lib/store/slices/matchesSlice";
import { clearPlayers } from "../../lib/store/slices/playersSlice";
import { clearRecords } from "../../lib/store/slices/recordsSlice";
import { clearTeams } from "../../lib/store/slices/teamsSlice";

import {
	FIXTURES_AND_RESULTS,
	FIXTURES_AND_RESULTS_BRACKETS,
	HOME_URL,
} from "../../constants/UrlConstants";
import NavList from "./NavList";

const links = [
	{ id: 1, text: "Groups", href: FIXTURES_AND_RESULTS },
	{ id: 2, text: "Brackets view", href: FIXTURES_AND_RESULTS_BRACKETS },
];

export default function Navbar() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const hasMatches = useSelector((state) => state.matches.hasData);
	const hasPlayers = useSelector((state) => state.players.hasData);
	const hasRecords = useSelector((state) => state.records.hasData);
	const hasTeams = useSelector((state) => state.teams.hasData);
	const hasData = hasMatches && hasPlayers && hasRecords && hasTeams;

	function resetState() {
		dispatch(clearMatches());
		dispatch(clearPlayers());
		dispatch(clearRecords());
		dispatch(clearTeams());
		navigate(HOME_URL);
	}

	return (
		<header className={styles.header}>
			<Link to={HOME_URL}>
				<img className={styles.logo} src="/cup.svg" alt="logo" title="Home" />
			</Link>
			{hasData ? (
				<>
					<nav>
						<NavList>
							{links.map(({ id, text, href }) => (
								<Link key={id} to={href}>
									{text}
								</Link>
							))}
						</NavList>
					</nav>
					<button onClick={resetState}>reset</button>
				</>
			) : null}
		</header>
	);
}
