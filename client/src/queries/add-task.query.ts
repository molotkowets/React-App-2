import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import tasksService from "../services/tasks.service";
import { type ICardForm } from "../components/addCard/AddCard";
interface IRequest {
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    taskListId: number;
    id: number;
}
export const addTask = (params: ICardForm | null): UseQueryResult<AxiosResponse<IRequest>> => {
    return useQuery<AxiosResponse<IRequest>, DefaultError, AxiosResponse<IRequest>, [string]>({
        queryKey: ["add-task"],
        enabled: Boolean(params),
        queryFn: async () => {
            return await tasksService.add<ICardForm | null, IRequest>(params);
        },
    });
};
