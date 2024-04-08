import { useQueryClient, useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import tasksService from "../services/tasks.service";
import { type ICardForm } from "../components/editCard/EditCard";
import { type ITask } from "../types/queries.types";

interface IData {
    id: number;
    name: string;
    boardId: number;
}

export interface IPayload {
    id: number;
    body: {
        name: string;
        description: string;
        dueDate: string;
        priority: string;
        taskListId: number;
    };
    // | { taskListId: number };
}
export const useMutateEditTask = (): UseMutationResult<
    AxiosResponse<IData, any>,
    Error,
    IPayload,
    unknown
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: IPayload) =>
            await tasksService.edit<ICardForm, ITask>(payload.body, payload.id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-lists"],
            });
        },
    });
};
