import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IAttraction from "../../models/IAttraction.interface";

interface attractionState {
    attractions: IAttraction[],
    pageNum: number
}

const initialState: attractionState = {
    attractions: [],
    pageNum: 0
}

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
        incrementPageNum: (state) => ({
            ...state,
            pageNum: state.pageNum + 1
        })
    }
})

export const { setAttractions, incrementPageNum } = attractionSlice.actions;

export default attractionSlice.reducer;