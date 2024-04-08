import { type AxiosResponse } from "axios";
import listService from "../services/list.service";

import { useQueryClient, useMutation, type UseMutationResult } from "@tanstack/react-query";

export interface IPayload {
    name: string;
    id: number;
}
interface IData {
    id: number;
    name: string;
    boardId: number;
}

export const useMutateRenameList = (): UseMutationResult<
    AxiosResponse<IData, any>,
    Error,
    IPayload,
    unknown
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: IPayload) =>
            await listService.removeName<IData>(payload.name, payload.id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-lists"],
            });
        },
    });
};
