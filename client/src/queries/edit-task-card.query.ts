import { type DefaultError, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import tasksService from "../services/tasks.service";
import { type ICardForm } from "../components/editCard/EditCard";
// import { type ICardForm } from "../components/addCard/AddCard";
export interface IParams {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    taskListId: number;
}
export const editTask = (
    params: ICardForm | null,
    id: number
): UseQueryResult<AxiosResponse<IParams>> => {
    return useQuery<AxiosResponse<IParams>, DefaultError, AxiosResponse<IParams>, [string]>({
        queryKey: ["add-task"],
        enabled: Boolean(params),
        queryFn: async () => {
            return await tasksService.edit<ICardForm | null, IParams>(params, id);
        },
    });
};
