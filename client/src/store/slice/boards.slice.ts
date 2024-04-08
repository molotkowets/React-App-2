import { createSlice } from "@reduxjs/toolkit";
import { type IBoard } from "../../types/queries.types";

const initialState: IBoard[] = [];

export const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        addBoards: (state, { payload }: { payload: IBoard[]; type: string }) => {
            // const boards: IBoard[] = payload;
            const isExists = state.some((b) => payload.some((item) => item.id === b.id));
            // console.log(isExists);
            if (isExists) return;
            state.push(...payload);
        },
        deleteBoards: (state, { payload: id }) => {
            const isExists = state.some((b) => b.id === id);
            console.log("slice:", isExists);
            if (isExists) {
                const index = state.findIndex((item) => item.id === id);
                if (index !== -1) {
                    state.splice(index, 1);
                }
            }
        },
        editBoard: (state, { payload }: { payload: IBoard; type: string }) => {
            const board: IBoard = payload;
            const isExists = state.some((b) => b.id === board.id);
            console.log(isExists);
            if (isExists) {
                const index = state.findIndex((item) => item.id === board.id);
                if (index !== -1) {
                    state.splice(index, 1, board);
                }
            }
        },
    },
});

export const { actions, reducer } = boardsSlice;
