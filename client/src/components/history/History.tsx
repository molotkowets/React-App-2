import React from "react";
import "./history.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import {
    HistoryActionEnum,
    type IDataUpdateInput,
    type IHistory,
    type IDataUpdateInputTaskListIdField,
    type ITaskFieldsToUpdating,
} from "../../types/queries.types";
import { getHistory } from "../../queries/get-history.query";
import { type IToClose } from "../../types/hook.types";
import HistoryItem from "../histiryItem/HistoryItem";

export interface IHistoryComponent {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function History({ toClose }: IToClose): JSX.Element {
    const { data } = getHistory();
    // console.log(data?.data.map((e) => historyTransforms(e)));

    function toCloseHistory(): void {
        toClose(false);
        console.log("closeHistory");
    }
    return (
        <div className="history-container modal-wrapper">
            <div onClick={toCloseHistory} className="modal-to-close-btn"></div>
            <div className="h-list-wrapper">
                <div className="h-l-header">
                    <h2>History</h2>
                    <CloseIcon onClick={toCloseHistory} className="close-btn" />
                </div>
                <ul className="history-list">
                    {data?.data.map((e, key) => (
                        <HistoryItem key={key} message={historyTransforms(e)} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

const valueFormat = (
    key: keyof ITaskFieldsToUpdating,
    value: IDataUpdateInput | IDataUpdateInputTaskListIdField,
    fieldType: "oldValue" | "newValue"
): string => {
    if (key === "taskListId") {
        return (value as IDataUpdateInputTaskListIdField)[
            fieldType === "oldValue" ? "oldLabel" : "newLabel"
        ];
    } else if (key === "dueDate") {
        // FIXME: to format
        return value[fieldType === "oldValue" ? "oldValue" : "newValue"];
    }

    return value[fieldType === "oldValue" ? "oldValue" : "newValue"];
};

const historyTransforms = (data: IHistory): string => {
    // console.log("history = ", data);
    if (data.action === HistoryActionEnum.CREATE) {
        const name = data?.data.input?.name;
        const message = `You create task ${name}`;
        return message;
    } else if (data.action === HistoryActionEnum.DELETE) {
        const taskName = data.data.input.name;
        const taskListName = data.data?.input.taskList?.name;
        const message = `You delete ${taskName} from ${taskListName}`;
        return message;
    }

    const changesList = (
        Object.entries(data.data.input) as Array<
            [keyof ITaskFieldsToUpdating, IDataUpdateInput | IDataUpdateInputTaskListIdField]
        >
    ).map(([key, value]) => {
        const action = ["name"].includes(key) ? "renamed" : "changed";
        const oldValue = valueFormat(key, value, "oldValue");
        const newValue = valueFormat(key, value, "newValue");

        const message = `${action} from ${oldValue} to ${newValue}`;
        return message;
    });
    return `You ${changesList.join(" and ")}`;
};
