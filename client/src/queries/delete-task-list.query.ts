import { type UseMutationResult, useQueryClient, useMutation } from "@tanstack/react-query";
import listService from "../services/list.service";

import { type AxiosResponse } from "axios";

interface IRequest {
    delete: boolean;
}
export const useMutateDeleteTaskList = (): UseMutationResult<
    AxiosResponse<IRequest, any>,
    Error,
    number,
    unknown
> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => await listService.deleteList<IRequest>(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["get-lists"],
            });
        },
    });
};
// export interface IPayload {
//     id: number;
// }
// export const deleteTaskList = (
//     id: number | null
// ): UseQueryResult<AxiosResponse<IDeleteResponse>> => {
//     return useQuery<
//         AxiosResponse<IDeleteResponse>,
//         DefaultError,
//         AxiosResponse<IDeleteResponse>,
//         [string]
//     >({
//         queryKey: ["delete-list"],
//         enabled: id !== null,
//         queryFn: async () => {
//             return await listService.deleteList<IDeleteResponse>(id);
//         },
//     });
// };
