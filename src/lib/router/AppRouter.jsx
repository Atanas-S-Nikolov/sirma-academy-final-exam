import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";

import HomePage from "../../pages/HomePage";
import { FixturesResultsPage } from "../../pages/FixturesResultsPage";

import { FIXTURES_AND_RESULTS, FIXTURES_AND_RESULTS_BRACKETS, HOME_URL } from "../../constants/UrlConstants";
import BracketsPage from "../../pages/BracketsPage";

export const appRouter = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path={HOME_URL} element={<HomePage />} />
			<Route path={FIXTURES_AND_RESULTS} element={<FixturesResultsPage />} />
			<Route path={FIXTURES_AND_RESULTS_BRACKETS} element={<BracketsPage />} />
		</>,
	),
);
