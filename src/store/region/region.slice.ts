import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IRegion from "../../models/IRegion.interface";

interface regionState {
    region: string
    town: string
}

const initialState: regionState = {
    region: "",
    town: ""
}

/**
 * attractions state focus index
 */
export const regionSlice = createSlice({
    name: "regionSlice",
    initialState,
    reducers: {
        setRegion: (state, action: PayloadAction<string>) => {
            state.region = action.payload;
        },
        setTown: (state, action: PayloadAction<string>) => {
            state.town = action.payload;
        },
        setRegionAndTown: (state, action: PayloadAction<IRegion>) => {
            state.region = action.payload.region;
            state.town = action.payload.town;
        }
    }
})

export const {setRegion, setTown, setRegionAndTown} = regionSlice.actions;

export default regionSlice.reducer;