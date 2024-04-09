import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import historyService, { type IParamsHistoryById } from "../services/history.service";
import { type IHistory } from "../types/queries.types";

export const getTaskHistory = (
    payload: IParamsHistoryById
): UseQueryResult<AxiosResponse<IHistory[]>> => {
    return useQuery<AxiosResponse<IHistory[]>, DefaultError, AxiosResponse<IHistory[]>, [string]>({
        queryKey: ["get-task-history"],
        queryFn: async () => {
            return await historyService.getById<IHistory[]>(payload);
        },
    });
};
