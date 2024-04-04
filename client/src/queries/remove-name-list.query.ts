import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import listService from "../services/list.service";

export interface IParams {
    name: string | null;
}
interface IResponse {
    id: number;
    name: string;
}
export const removeNameList = (
    params: IParams | null,
    id: number
): UseQueryResult<AxiosResponse<IResponse>> => {
    return useQuery<AxiosResponse<IResponse>, DefaultError, AxiosResponse<IResponse>, [string]>({
        queryKey: ["add-task"],
        enabled: Boolean(params),
        queryFn: async () => {
            console.log(params, id);
            return await listService.removeName<IParams | null, IResponse>(params, id);
        },
    });
};
