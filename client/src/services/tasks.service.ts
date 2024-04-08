import axios, { type AxiosResponse } from "axios";
// export interface IDeleteResponse {
//     delete: boolean;
// }
class TasksService {
    private readonly URL = "http://localhost:3000/";

    async add<T, R>(params: T): Promise<AxiosResponse<R>> {
        return await axios.post(`${this.URL}tasks`, params);
    }

    async delete<R>(id: number): Promise<AxiosResponse<R>> {
        return await axios.delete(`${this.URL}tasks/${id}`);
    }

    async moveTo<R>(taskListId: number, id: number): Promise<AxiosResponse<R>> {
        console.log("taskListId:", taskListId, "id:", id);
        return await axios.patch(`${this.URL}tasks/${id}`, { taskListId });
    }

    async edit<T, R>(params: T, id: number): Promise<AxiosResponse<R>> {
        return await axios.patch(`${this.URL}tasks/${id}`, params);
    }
}
export default new TasksService();
