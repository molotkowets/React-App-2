import axios, { type AxiosResponse } from "axios";

class ListService {
    private readonly URL = "http://localhost:3000/";
    async getAll<T>(boardId: number): Promise<AxiosResponse<T>> {
        return await axios.get(`${this.URL}task-lists`, {
            params: {
                boardId,
            },
        });
    }

    async addList<R>(name: string, boardId: number): Promise<AxiosResponse<R>> {
        console.log({
            name,
            boardId,
        });
        return await axios.post(`${this.URL}task-lists`, {
            name,
            boardId,
        });
    }

    async deleteList<R>(id: number): Promise<AxiosResponse<R>> {
        return await axios.delete(`${this.URL}task-lists/${id}`);
    }

    async removeName<R>(name: string, id: number): Promise<AxiosResponse<R>> {
        return await axios.patch(`${this.URL}task-lists/${id}`, { name });
    }
}
export default new ListService();
