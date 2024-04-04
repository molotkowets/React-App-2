import React, { useState } from "react";
import "./taskCard.css";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
// import { type ITaskLists } from "../task-list/TaskList";
import EditMenuCard from "../editMenu/EditMenuCard";
import Priority from "../priority/Priority";
import Dropdown from "../dropdown/Dropdown";
import CardBoard from "../cardBoard/CardBoard";
import { type ITaskLists, type ITasks } from "../task-list/TaskList";
import { formatDate } from "../../other/formatDate";

export interface TTasks {
    name: string;
    id: number;
    description: string;
    date: string;
    priority: string;
}
interface ITaskCard {
    key: number;
    data: ITasks;
    listId: number;
    taskLists: ITaskLists[];
}
export default function TaskCard({ data, listId, taskLists }: ITaskCard): JSX.Element {
    const [cardBoardModal, setCardBoardModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="tc-container">
            {cardBoardModal && <CardBoard toClose={setCardBoardModal} />}
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
