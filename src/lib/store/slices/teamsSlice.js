import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/ObjectUtils";

const initialState = {
	data: {},
};

export const teamsSlice = createSlice({
	name: "teams",
	initialState,
	reducers: {
		addTeams: (state, action) => {
			const teams = arrayToObject(action.payload);
			state.data = teams;
		},
		clearTeams: () => initialState,
	},
});
export const { addTeams, clearTeams } = teamsSlice.actions;
export default teamsSlice.reducer;
