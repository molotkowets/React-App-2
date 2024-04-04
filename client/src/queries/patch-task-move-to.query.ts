import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import tasksService from "../services/tasks.service";
// import { type ICardForm } from "../components/addCard/AddCard";
interface IParams {
    taskListId: number | null;
}
interface IResponse {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    taskListId: number;
}
export const taskMoveTo = (
    params: IParams,
    id: number
): UseQueryResult<AxiosResponse<IResponse>> => {
    return useQuery<AxiosResponse<IResponse>, DefaultError, AxiosResponse<IResponse>, [string]>({
        queryKey: ["add-task"],
        enabled: Boolean(params.taskListId),
        queryFn: async () => {
            return await tasksService.moveTo<IParams, IResponse>(params, id);
        },
    });
};
