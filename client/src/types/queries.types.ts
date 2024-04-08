export enum HistoryActionEnum {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
}

export interface IToClose {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IBoard {
    id: number;
    name: string;
}

export interface ITask {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    taskListId: number;
    boardId: number;
    taskList: ITaskList;
}
export interface ITAskFromList {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    taskListId: number;
    boardId: number;
}

export interface ITaskList {
    id: number;
    name: string;
    boardId: number;
}

export interface IDataUpdateInput {
    newValue: string;
    oldValue: string;
}

export interface IDataUpdateInputTaskListIdField extends IDataUpdateInput {
    oldLabel: string;
    newLabel: string;
}

export interface ITaskFieldsToUpdating {
    description: IDataUpdateInput;
    dueDate: IDataUpdateInput;
    name: IDataUpdateInput;
    priority: IDataUpdateInput;
    taskListId: IDataUpdateInputTaskListIdField;
}

export interface IHistoryBase<IAction extends HistoryActionEnum> {
    id: number;
    action: HistoryActionEnum;
    entityName: string;
    data: {
        input: IAction extends HistoryActionEnum.CREATE | HistoryActionEnum.DELETE
            ? ITask
            : ITaskFieldsToUpdating;
    };
    entityId: 13;
    createdAt: "2024-04-07T21:53:34.780Z";
}

interface IHistoryCreateType extends IHistoryBase<HistoryActionEnum.CREATE> {
    action: HistoryActionEnum.CREATE;
}
interface IHistoryUpdateType extends IHistoryBase<HistoryActionEnum.UPDATE> {
    action: HistoryActionEnum.UPDATE;
}
interface IHistoryDeleteType extends IHistoryBase<HistoryActionEnum.DELETE> {
    action: HistoryActionEnum.DELETE;
}

export type IHistory = IHistoryCreateType | IHistoryUpdateType | IHistoryDeleteType;
