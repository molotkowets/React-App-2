import React, { useState } from "react";
import "./editMenu.css";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as TrashCan } from "../../assets/icons/trash-can.svg";
// import { deleteTask } from "../../queries/delete-task.query";
// import { useNavigate } from "react-router-dom";
import EditCard from "../editCard/EditCard";
import { type ITaskLists } from "../task-list/TaskList";
import { useMutateDeleteTask } from "../../queries/delete-task.query";
import { type ITask } from "../../types/queries.types";

interface IEditMenu {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
    cardData: ITask;
    taskLists: ITaskLists[];
}
export default function EditMenuCard({ toClose, id, cardData, taskLists }: IEditMenu): JSX.Element {
    // const [deleteId, setDeleteId] = useState<number | null>(null);
    const [editCardModal, setEditCardModal] = useState(false);
    const { mutate } = useMutateDeleteTask();
    // const navigate = useNavigate();
    // const { status } = deleteTask(deleteId);

    // if (status === "success") {
    //     navigate(0);
    // }

    return (
        <div>
            <div className="flex flex-col rounded-8 p-p10 pr-p30 absolute right-0 top-8 z-10 bg-white">
                {editCardModal && (
                    <EditCard
                        taskLists={taskLists}
                        toClose={setEditCardModal}
                        cardData={cardData}
                    />
                )}
                <button
                    onClick={() => {
                        setEditCardModal(true);
                        // toClose(false);
                    }}
                    className="flex bg-none border-none cursor-pointer py-1">
                    <Edit className="w-5 h-5 px-1" /> <span>Edit</span>
                </button>
                <button
                    onClick={() => {
                        mutate(id);
                    }}
                    className="flex bg-none border-none cursor-pointer py-1">
                    <TrashCan className="w-5 h-5 px-1" /> <span>Delete</span>
                </button>
            </div>
            <div
                onClick={() => {
                    toClose(false);
                }}
                className="flex fixed w-screen h-screen top-0 left-0 cursor-pointer"></div>
        </div>
    );
}
