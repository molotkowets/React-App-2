import axios, { type AxiosResponse } from "axios";

class ListService {
    private readonly URL = "http://localhost:3000/";
    async getAll<T>(): Promise<AxiosResponse<T>> {
        return await axios.get(`${this.URL}task-lists`);
        // return data;
    }

    async addList<T, R>(params: T): Promise<AxiosResponse<R>> {
        return await axios.post(`${this.URL}task-lists`, params);
    }

    async deleteList<R>(id: number | null): Promise<AxiosResponse<R>> {
        const ids = id != null ? id : "";
        return await axios.delete(`${this.URL}task-lists/${ids}`);
    }

    async removeName<T, R>(params: T, id: number): Promise<AxiosResponse<R>> {
        return await axios.patch(`${this.URL}task-lists/${id}`, params);
    }
}
export default new ListService();
