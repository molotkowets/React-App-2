interface IRequest {
    id: number;
    name: string;
}
export interface ITask {
    name: string;
    id: number;
    description: string;
    date: string;
    priority: string;
}
export interface IResponse {
    idStatus: number;
    data: ITask[];
}
const TDescription =
    "Task description should be unambiguous, accurate, factual, comprehensible, correct and uniformly designed.";
const tasks = [...Array(3)].map((u, i) => ({
    name: `Task-${i}`,
    id: i,
    description: TDescription,
    date: "Wed, 19 Apr",
    priority: "Low",
}));

// export const tasksStatus = tasks.map((u, i) => ({ idStatus: i, u }));
export const tasksStatus = (data: IRequest[]): IResponse[] => {
    return data.map((u, i) => ({ idStatus: u.id, data: tasks }));
};

// /////
// interface IRequest {
//     id: number;
//     name: string;
// }
// export interface ITask {
//     name: string;
//     id: number;
//     description: string;
//     date: string;
//     priority: string;
//     status: IRequest;
// }
// export interface IResponse {
//     idStatus: number;
//     data: ITask[];
// }
// const TDescription =
//     "Task description should be unambiguous, accurate, factual, comprehensible, correct and uniformly designed.";
// const tasks = [...Array(3)].map((u, i) => ({
//     name: `Task-${i}`,
//     id: i,

//     description: TDescription,
//     date: "Wed, 19 Apr",
//     priority: "Low",
// }));

// // export const tasksStatus = tasks.map((u, i) => ({ idStatus: i, u }));
// export const tasksStatus = (data: IRequest[]): ITask[] => {
//     return data.map((u, i) => ({ ...tasks, status: u }));
// };
