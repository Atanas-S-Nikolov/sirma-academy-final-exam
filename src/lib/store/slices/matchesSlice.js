import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/ObjectUtils";

const initialState = {
	data: {},
};

export const matchesSlice = createSlice({
	name: "matches",
	initialState,
	reducers: {
		addMatches: (state, action) => {
			const matches = arrayToObject(action.payload);
			state.data = matches;
		},
		clearMatches: () => initialState,
	},
});

export const { addMatches, clearMatches } = matchesSlice.actions;
export default matchesSlice.reducer;
