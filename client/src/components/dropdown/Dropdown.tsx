import React from "react";
import "./dropdown.css";
import { type ITaskLists } from "../task-list/TaskList";
import { useMutateTaskMoveTo } from "../../queries/patch-task-move-to.query";
// import { taskMoveTo } from "../../queries/patch-task-move-to.query";
// import { useNavigate } from "react-router-dom";

interface IDropDown {
    listStatus: ITaskLists[];
    listId: number;
    id: number;
}
export default function Dropdown({ listStatus, listId, id }: IDropDown): JSX.Element {
    const { mutate } = useMutateTaskMoveTo();
    // const [selectVal, setSelectVal] = useState<number | null>(null);
    // const { status } = taskMoveTo({ taskListId: selectVal }, id);
    // const navigate = useNavigate();

    // if (status === "success") {
    //     navigate(0);
    // }
    const selectList = listStatus.filter((i) => i.id !== listId);

    console.log("id:", id, "listId:", listId, "selectList:", selectList);
    return (
        <select
            onChange={(e) => {
                // setSelectVal(Number(e.target.value));
                console.log(e.target.value);
                mutate({ taskListId: Number(e.target.value), id });
            }}
            className="dropdown-input"
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
