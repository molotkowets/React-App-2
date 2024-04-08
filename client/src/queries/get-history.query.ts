import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import historyService from "../services/history.service";
import { type IHistory } from "../types/queries.types";

export const getHistory = (): UseQueryResult<AxiosResponse<IHistory[]>> => {
    return useQuery<AxiosResponse<IHistory[]>, DefaultError, AxiosResponse<IHistory[]>, [string]>({
        queryKey: ["get-boards"],
        queryFn: async () => {
            return await historyService.getAll<IHistory[]>();
        },
    });
};
