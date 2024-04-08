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
        <div className="card-board-wrapper flex justify-center items-center flex fixed w-screen h-screen top-0 left-0 z-10 bg-gray44">
            <div
                onClick={() => {
                    toClose(false);
                }}
                className="flex w-screen h-screen absolute"></div>
            <div className="hidden flex flex-col items-start pb-0 h-full box-border modal-container">
                <div className="flex justify-end p-p10 bg-blue">
                    <div
                        onClick={() => {
                            toClose(false);
                        }}>
                        <CloseIcon className="w-3 h-3" />
                    </div>
                </div>
                <div className="flex flex-row p-5">
                    <div className="flex w100 flex-col p-7">
                        <div className=" flex justify-between">
                            <h2>Name: {data.name}</h2>
                            <button className=" flex items-center h-6 px-2 bg-none outline-none rounded-4 cursor-pointer border-gray border-1 border-solid">
                                <EditIcon className="w-4 h-4 mr-1" />
                                Edit task
                            </button>
                        </div>
                        <div className="flex items-center">
                            <span>
                                <StatusIcon className="w-4 h-4 mr-1" />
                                Status
                            </span>
                            <p>{listName}</p>
                        </div>
                        <div className="flex items-center">
                            <span>
                                <DateIcon className="w-4 h-4 mr-1" />
                                Due date
                            </span>
                            <p>test</p>
                        </div>
                        <div className="flex items-center">
                            <span>
                                <PriorityIcon className="w-4 h-4 mr-1" />
                                Priority
                            </span>
                            <p>{data.priority}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <h2 className=" text-white">Description</h2>
                            <p>{data.description}</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-start w-72 min-h-7">
                        <h2>Activity</h2>
                        <div className="flex flex-col items-start w-full h-full">
                            <p>test</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
