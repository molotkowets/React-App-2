import { type UseMutationResult, useQueryClient, useMutation } from "@tanstack/react-query";
import tasksService from "../services/tasks.service";
import { type AxiosResponse } from "axios";

export interface IPayload {
    name: string;
    priority: string;
    taskListId: number;
    dueDate: string;
    description: string;
    boardId: number;
}

interface IRequest {
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    taskListId: number;
    boardId: number;
    id: number;
}

export const useMutateAddCard = (): UseMutationResult<
    AxiosResponse<IRequest, any>,
    Error,
    IPayload,
    unknown
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: IPayload) =>
            await tasksService.add<IPayload, IRequest>(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-lists"],
            });
        },
    });
};
