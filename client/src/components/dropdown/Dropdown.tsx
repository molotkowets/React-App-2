import React, { useState } from "react";
import "./dropdown.css";
import { type ITaskLists } from "../task-list/TaskList";
import { taskMoveTo } from "../../queries/patch-task-move-to.query";
import { useNavigate } from "react-router-dom";

interface IDropDown {
    listStatus: ITaskLists[];
    listId: number;
    id: number;
}
export default function Dropdown({ listStatus, listId, id }: IDropDown): JSX.Element {
    const [selectVal, setSelectVal] = useState<number | null>(null);
    const { status } = taskMoveTo({ taskListId: selectVal }, id);
    const navigate = useNavigate();

    if (status === "success") {
        navigate(0);
    }

    console.log("id: ", id, "status: ", status, "selectVal: ", selectVal);
    return (
        <select
            onChange={(e) => {
                setSelectVal(Number(e.target.value));
            }}
            className="dropdown-input"
            name="select"
            defaultValue={"value0"}>
            <option value="value0" disabled>
                Move to:
            </option>
            {listStatus.map((v, key) => (
                <option key={key} value={v.id}>
                    {v.name}
                </option>
            ))}
        </select>
    );
}
