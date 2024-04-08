import { useQueryClient, useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type AxiosResponse } from "axios";
import { type IBoard } from "../types/queries.types";
import boardService from "../services/board.service";

export const useMutateDeleteBoard = (): UseMutationResult<
    AxiosResponse<IBoard, any>,
    Error,
    number,
    unknown
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => await boardService.delete<IBoard>(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-boards"],
            });
        },
    });
};
