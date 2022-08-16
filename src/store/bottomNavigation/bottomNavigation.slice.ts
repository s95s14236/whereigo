import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface bottomNavigationState {
    index: number
}

const initialState: bottomNavigationState = {
    index: 0
}

/**
 * bottom navigation state focus index
 */
export const bottomNavigationSlice = createSlice({
    name: "bottomNavigation",
    initialState,
    reducers: {
        setIndex: (state, action: PayloadAction<number>) => {
            state.index = action.payload;
        }
    }
})

export const {setIndex} = bottomNavigationSlice.actions;

export default bottomNavigationSlice.reducer;