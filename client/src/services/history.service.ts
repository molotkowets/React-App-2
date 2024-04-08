import axios, { type AxiosResponse } from "axios";

class HistoryService {
    private readonly URL = "http://localhost:3000/";
    async getAll<T>(): Promise<AxiosResponse<T>> {
        return await axios.get(`${this.URL}history`);
    }
}
export default new HistoryService();
