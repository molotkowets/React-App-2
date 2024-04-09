import React, { useState } from "react";
import "./task.css";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
// import { type ITaskLists } from "../task-list/TaskList";
import EditMenuCard from "../editMenu/EditMenuCard";
import Priority from "../priority/Priority";
import Dropdown from "../dropdown/Dropdown";
import TaskWindow from "../taskBoard/TaskWindow";
import { type ITaskLists } from "../task-list/TaskList";
import { formatDate } from "../../utils/formatDate";
import { type ITask } from "../../types/queries.types";

export interface TTasks {
    name: string;
    id: number;
    description: string;
    date: string;
    priority: string;
}
interface ITaskCard {
    key: number;
    data: ITask;
    listId: number;
    taskLists: ITaskLists[];
}
export default function Task({ data, listId, taskLists }: ITaskCard): JSX.Element {
    const [cardBoardModal, setCardBoardModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const listName = taskLists.find((i) => i.id === listId)?.name;

    return (
        <div className=" text-gray-400 rounded-8 border-2 p-4 mb-5 relative">
            {cardBoardModal && (
                <TaskWindow listName={listName} data={data} toClose={setCardBoardModal} />
            )}
            <div
                onClick={() => {
                    setCardBoardModal(true);
                }}
                className="flex flex-col z-10">
                <div className="flex justify-between items-center">
                    <h3 className=" text-black font-medium">{data.name}</h3>
                </div>
                <p className=" text-left my-p10  leading-5  break-words">{data.description}</p>
                <span className=" text-left mb-p10 font-semibold">
                    <DateIcon className="w-4 h-4 pr-4" />
                    {formatDate(data.dueDate)}
                </span>
                <Priority priority={data.priority} />
            </div>
            <div className="flex absolute right-0 py-1 px-2 z-10 flex  absolute top-4 right-7">
                <MenuIcon
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                    }}
                    className="flex h-4 justify-center px-1 cursor-pointer absolute"
                />
                {menuOpen && (
                    <EditMenuCard
                        taskLists={taskLists}
                        cardData={data}
                        id={data.id}
                        toClose={setMenuOpen}
                    />
                )}
            </div>
            <div className="flex box-border w-full justify-between rounded-4  bg-gray-200 mt-p10 items-center">
                <Dropdown listStatus={taskLists} listId={listId} id={data.id} />
            </div>
        </div>
    );
}
