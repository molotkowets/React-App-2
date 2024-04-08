import { type UseMutationResult, useQueryClient, useMutation } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import listService from "../services/list.service";
interface IRequest {
    name: string;
    id: number;
    boardId: number;
}
export interface IPayload {
    name: string;
    boardId: number;
}

export const useMutateAddTaskList = (): UseMutationResult<
    AxiosResponse<IRequest, any>,
    Error,
    IPayload,
    unknown
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: IPayload) =>
            await listService.addList<IRequest>(payload.name, payload.boardId),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-lists"],
            });
        },
    });
};
