import React from "react";
import "./dropdown.css";
import { type ITaskLists } from "../task-list/TaskList";
import { useMutateTaskMoveTo } from "../../queries/patch-task-move-to.query";

interface IDropDown {
    listStatus: ITaskLists[];
    listId: number;
    id: number;
}
export default function Dropdown({ listStatus, listId, id }: IDropDown): JSX.Element {
    const { mutate } = useMutateTaskMoveTo();
    const selectList = listStatus.filter((i) => i.id !== listId);

    return (
        <select
            onChange={(e) => {
                console.log(e.target.value);
                mutate({ taskListId: Number(e.target.value), id });
            }}
            className=" bg-no-repeat border-none w-full font-semibold outline-none bg-gray-200 rounded-4 px-3 py-1"
            name="select"
            defaultValue={"value0"}>
            <option value="value0" disabled>
                Move to:
            </option>
            {selectList.map((v, key) => (
                <option key={key} value={v.id}>
                    {v.name}
                </option>
            ))}
        </select>
    );
}
