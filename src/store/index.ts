import { configureStore } from "@reduxjs/toolkit";
import bottomNavigationReducer from "../store/bottomNavigation/bottomNavigation.slice";
import attractionReducer from "../store/attraction/attraction.slice";
import regionReducer from "../store/region/region.slice";


export const store = configureStore({
    reducer: {
        bottomNavigation: bottomNavigationReducer,
        attraction: attractionReducer,
        region: regionReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;