import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IAttraction from "../../models/IAttraction.interface";

interface attractionState {
  attractions: IAttraction[];
}

const initialState: attractionState = {
  attractions: [],
};

/**
 * attractions state focus index
 */
export const attractionSlice = createSlice({
  name: "attractionSlice",
  initialState,
  reducers: {
    setAttractions: (state, action: PayloadAction<IAttraction[]>) => {
      state.attractions = action.payload;
    },
  },
});

export const { setAttractions } = attractionSlice.actions;

export default attractionSlice.reducer;
