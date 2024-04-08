import axios, { type AxiosResponse } from "axios";

class BoardService {
    private readonly URL = "http://localhost:3000/";
    async getAll<T>(): Promise<AxiosResponse<T>> {
        return await axios.get(`${this.URL}boards`);
    }

    async add<T, R>(params: T): Promise<AxiosResponse<R>> {
        return await axios.post(`${this.URL}boards`, params);
    }

    async delete<R>(id: number): Promise<AxiosResponse<R>> {
        return await axios.delete(`${this.URL}boards/${id}`);
    }

    async rename<T, R>(name: T, id: number): Promise<AxiosResponse<R>> {
        return await axios.patch(`${this.URL}boards/${id}`, { name });
    }
}
export default new BoardService();
