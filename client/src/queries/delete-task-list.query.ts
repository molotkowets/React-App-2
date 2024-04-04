import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { type IDeleteResponse } from "../services/tasks.service";
import listService from "../services/list.service";

export const deleteTaskList = (
    id: number | null
): UseQueryResult<AxiosResponse<IDeleteResponse>> => {
    return useQuery<
        AxiosResponse<IDeleteResponse>,
        DefaultError,
        AxiosResponse<IDeleteResponse>,
        [string]
    >({
        queryKey: ["add-task"],
        enabled: id !== null,
        queryFn: async () => {
            return await listService.deleteList<IDeleteResponse>(id);
        },
    });
};
