import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

import HomePage from "../../pages/HomePage";
import FixturesResultsPage from "../../pages/FixturesResultsPage";
import BracketsPage from "../../pages/BracketsPage";
import MatchDetailsPage from "../../pages/MatchDetailsPage";

import {
	FIXTURES_AND_RESULTS_URL,
	FIXTURES_AND_RESULTS_BRACKETS_URL,
	HOME_URL,
	MATCH_DETAILS_URL_PATH,
} from "../../constants/UrlConstants";

export const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path={HOME_URL} element={<HomePage />} />
			<Route path={FIXTURES_AND_RESULTS_URL} element={<FixturesResultsPage />} />
			<Route path={FIXTURES_AND_RESULTS_BRACKETS_URL} element={<BracketsPage />} />
			<Route path={MATCH_DETAILS_URL_PATH} element={<MatchDetailsPage />} />
		</>,
	),
);
