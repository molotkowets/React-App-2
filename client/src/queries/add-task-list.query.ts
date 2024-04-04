import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import listService from "../services/list.service";
interface IRequest {
    name: string;
    id: number;
}
export interface IParams {
    name: string;
}
export const addTaskList = (params: IParams | null): UseQueryResult<AxiosResponse<IRequest>> => {
    return useQuery<AxiosResponse<IRequest>, DefaultError, AxiosResponse<IRequest>, [string]>({
        queryKey: ["add-task"],
        enabled: Boolean(params),
        queryFn: async () => {
            return await listService.addList<IParams | null, IRequest>(params);
        },
    });
};
