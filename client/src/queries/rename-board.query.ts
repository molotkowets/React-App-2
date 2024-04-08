import { useQueryClient, useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { type IBoard } from "../types/queries.types";
import boardService from "../services/board.service";

export interface IPayload {
    name: string;
    id: number;
}

export const useMutateRenameBoard = (): UseMutationResult<
    AxiosResponse<IBoard, any>,
    Error,
    IPayload,
    unknown
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: IPayload) =>
            await boardService.rename<string, IBoard>(payload.name, payload.id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-boards"],
            });
        },
    });
};

// queryClient.fetchQuery
// queryClient.setQueryData(["get-boards"], (old) => {
//     return [...((old as any).data ?? []), data.data];
// });
