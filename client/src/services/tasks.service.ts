import axios, { type AxiosResponse } from "axios";
export interface IDeleteResponse {
    delete: boolean;
}
class TasksService {
    private readonly URL = "http://localhost:3000/";

    async add<T, R>(params: T): Promise<AxiosResponse<R>> {
        return await axios.post(`${this.URL}tasks`, params);
    }

    async delete(id: number | null): Promise<AxiosResponse<IDeleteResponse>> {
        const ids = id != null ? id : "";
        return await axios.delete(`${this.URL}tasks/${ids}`);
    }

    async moveTo<T, R>(params: T, id: number): Promise<AxiosResponse<R>> {
        return await axios.patch(`${this.URL}tasks/${id}`, params);
    }

    async edit<T, R>(params: T, id: number): Promise<AxiosResponse<R>> {
        return await axios.patch(`${this.URL}tasks/${id}`, params);
    }
}
export default new TasksService();
