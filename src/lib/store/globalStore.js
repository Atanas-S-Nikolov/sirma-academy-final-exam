import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import matchesReducer from "./slices/matchesSlice";
import playersReducer from "./slices/playersSlice";
import recordsReducer from "./slices/recordsSlice";
import teamsReducer from "./slices/teamsSlice";

const persistConfig = {
	key: "global-store",
	storage: storage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
	matches: matchesReducer,
	players: playersReducer,
	records: recordsReducer,
	teams: teamsReducer,
});

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
