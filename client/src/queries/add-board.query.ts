import { useQueryClient, useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { type IBoard } from "../types/queries.types";
import boardService from "../services/board.service";

export interface IPayload {
    name: string;
}

export const useMutateAddBoard = (): UseMutationResult<
    AxiosResponse<IBoard, any>,
    Error,
    IPayload | null,
    unknown
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: IPayload | null) =>
            await boardService.add<IPayload | null, IBoard>(payload),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-boards"],
            });
        },
    });
};
