import { useQueryClient, useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import tasksService from "../services/tasks.service";
import { type ITask } from "../types/queries.types";

interface IData {
    id: number;
    name: string;
    boardId: number;
}

export interface IPayload {
    id: number;
    taskListId: number;
}
export const useMutateTaskMoveTo = (): UseMutationResult<
    AxiosResponse<IData, any>,
    Error,
    IPayload,
    unknown
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: IPayload) =>
            await tasksService.moveTo<ITask>(payload.taskListId, payload.id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-lists"],
            });
        },
    });
};
