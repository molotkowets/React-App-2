import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as boardReducer } from "./slice/boards.slice";

const reducers = combineReducers({
    boards: boardReducer,
});

export const store = configureStore({
    reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>;
