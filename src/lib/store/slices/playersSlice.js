import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/ObjectUtils";

const initialState = {
	hasData: false,
	data: {},
};

export const playersSlice = createSlice({
	name: "players",
	initialState,
	reducers: {
		addPlayers: (state, action) => {
			const players = arrayToObject(action.payload);
			state.hasData = true;
			state.data = players;
		},
		clearPlayers: () => initialState,
	},
});

export const { addPlayers, clearPlayers } = playersSlice.actions;
export default playersSlice.reducer;
