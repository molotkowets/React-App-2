import axios, { type AxiosResponse } from "axios";
export interface IParamsHistoryById {
    entityName: string;
    entityId: number;
}
class HistoryService {
    private readonly URL = "http://localhost:3000/";
    async getAll<T>(): Promise<AxiosResponse<T>> {
        return await axios.get(`${this.URL}history`);
    }

    async getById<T>(params: IParamsHistoryById): Promise<AxiosResponse<T>> {
        return await axios.get(
            `${this.URL}history?entityName=${params.entityName}&entityId=${params.entityId}`
        );
    }
}
export default new HistoryService();
