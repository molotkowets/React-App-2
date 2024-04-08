import { type AxiosResponse } from "axios";
import tasksService from "../services/tasks.service";

import { type UseMutationResult, useQueryClient, useMutation } from "@tanstack/react-query";

interface IRequest {
    delete: boolean;
}

export const useMutateDeleteTask = (): UseMutationResult<
    AxiosResponse<IRequest, any>,
    Error,
    number,
    unknown
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => await tasksService.delete<IRequest>(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-lists"],
            });
        },
    });
};
