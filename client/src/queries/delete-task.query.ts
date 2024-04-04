import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import tasksService, { type IDeleteResponse } from "../services/tasks.service";

export const deleteTask = (id: number | null): UseQueryResult<AxiosResponse<IDeleteResponse>> => {
    return useQuery<
        AxiosResponse<IDeleteResponse>,
        DefaultError,
        AxiosResponse<IDeleteResponse>,
        [string]
    >({
        queryKey: ["add-task"],
        enabled: id !== null,
        queryFn: async () => {
            return await tasksService.delete(id);
        },
    });
};
