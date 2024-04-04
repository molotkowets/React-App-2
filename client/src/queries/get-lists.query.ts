import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import listService from "../services/list.service";
import { type AxiosResponse } from "axios";
import { type ITaskLists } from "../components/task-list/TaskList";
// interface IRequest {
//     id: number;
//     name: string;
// }
export const getCategoriesByParams = (): UseQueryResult<AxiosResponse<ITaskLists[]>> => {
    return useQuery<
        AxiosResponse<ITaskLists[]>,
        DefaultError,
        AxiosResponse<ITaskLists[]>,
        [string]
    >({
        queryKey: ["lists"],
        queryFn: async () => {
            return await listService.getAll<ITaskLists[]>();
        },
    });
};
