import { createSlice } from "@reduxjs/toolkit";
import { arrayToObject } from "../../../utils/ObjectUtils";

const initialState = {
	hasData: false,
	data: {},
};

export const recordsSlice = createSlice({
	name: "records",
	initialState,
	reducers: {
		addRecords: (state, action) => {
			const records = arrayToObject(action.payload);
			state.hasData = true;
			state.data = records;
		},
		clearRecords: () => initialState,
	},
});

export const { addRecords, clearRecords } = recordsSlice.actions;
export default recordsSlice.reducer;
