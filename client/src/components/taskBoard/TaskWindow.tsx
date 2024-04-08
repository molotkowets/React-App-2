import React from "react";
import "./task-window.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { ReactComponent as StatusIcon } from "../../assets/icons/status.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
import { ReactComponent as PriorityIcon } from "../../assets/icons/priority.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { type ITAskFromList } from "../../types/queries.types";

interface ITaskBoard {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
    data: ITAskFromList;
    listName: string | undefined;
}

export default function TaskWindow({ toClose, data, listName }: ITaskBoard): JSX.Element {
    console.log("listName", listName);
    return (
        <div className="card-board-wrapper modal-wrapper">
            <div
                onClick={() => {
                    toClose(false);
                }}
                className="modal-to-close-btn"></div>
            <div className="task-board-container modal-container">
                <div className="cb-head-line">
                    <div
                        onClick={() => {
                            toClose(false);
                        }}>
                        <CloseIcon className="close-btn" />
                    </div>
                </div>
                <div className="cb-body">
                    <div className="cb-b-data">
                        <div className="cd-d-header">
                            <h2>Name: {data.name}</h2>
                            <button className="cb-edit-btn">
                                <EditIcon className="cb-point-icon" />
                                Edit task
                            </button>
                        </div>
                        <div className="cb-point-data">
                            <span>
                                <StatusIcon className="cb-point-icon" />
                                Status
                            </span>
                            <p>{listName}</p>
                        </div>
                        <div className="cb-point-data">
                            <span>
                                <DateIcon className="cb-point-icon" />
                                Due date
                            </span>
                            <p>test</p>
                        </div>
                        <div className="cb-point-data">
                            <span>
                                <PriorityIcon className="cb-point-icon" />
                                Priority
                            </span>
                            <p>{data.priority}</p>
                        </div>
                        <div className="cb-description-container">
                            <h2>Description</h2>
                            <p>{data.description}</p>
                        </div>
                    </div>
                    <div className="cb-b-activity">
                        <h2>Activity</h2>
                        <div className="cb-b-activity-list">
                            <p>test</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
