import React, { useState } from "react";
import "./task.css";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
// import { type ITaskLists } from "../task-list/TaskList";
import EditMenuCard from "../editMenu/EditMenuCard";
import Priority from "../priority/Priority";
import Dropdown from "../dropdown/Dropdown";
import CardBoard from "../taskBoard/TaskBoard";
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
        <div className="tc-container">
            {cardBoardModal && (
                <CardBoard listName={listName} data={data} toClose={setCardBoardModal} />
            )}
            <div
                onClick={() => {
                    setCardBoardModal(true);
                }}
                className="tc-btn-close-wrapper">
                <div className="tc-header">
                    <h3>{data.name}</h3>
                </div>
                <p className="tc-description">{data.description}</p>
                <span className="tc-date">
                    <DateIcon className="tc-date-icon" />
                    {formatDate(data.dueDate)}
                </span>
                <Priority priority={data.priority} />
            </div>
            <div className="tk-menu-icon tl-header-menu">
                <MenuIcon
                    onClick={() => {
                        setMenuOpen(!menuOpen);
                    }}
                    className="tl-header-menu-icon"
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
            <div className="tc-input-status">
                <Dropdown listStatus={taskLists} listId={listId} id={data.id} />
            </div>
        </div>
    );
}
