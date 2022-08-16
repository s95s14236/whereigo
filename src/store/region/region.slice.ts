import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        }
    }
})

export const {setRegion, setTown} = regionSlice.actions;

export default regionSlice.reducer;