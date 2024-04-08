import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { type IBoard } from "../types/queries.types";
import boardService from "../services/board.service";

export const getBoards = (): UseQueryResult<AxiosResponse<IBoard[]>> => {
    return useQuery<AxiosResponse<IBoard[]>, DefaultError, AxiosResponse<IBoard[]>, [string]>({
        queryKey: ["get-boards"],
        queryFn: async () => {
            return await boardService.getAll<IBoard[]>();
        },
    });
};
