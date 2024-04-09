import React from "react";
import "./task-window.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { ReactComponent as StatusIcon } from "../../assets/icons/status.svg";
import { ReactComponent as DateIcon } from "../../assets/icons/date.svg";
import { ReactComponent as PriorityIcon } from "../../assets/icons/priority.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import { type ITAskFromList } from "../../types/queries.types";
import { formatDate } from "../../utils/formatDate";
import { getTaskHistory } from "../../queries/get-task-history.query";

interface ITaskBoard {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
    data: ITAskFromList;
    listName: string | undefined;
}
export default function TaskWindow({ toClose, data, listName }: ITaskBoard): JSX.Element {
    const { data: history } = getTaskHistory({ entityName: "task_entity", entityId: data.id });

    console.log(history?.data);

    return (
        <div className="card-board-wrapper flex justify-center items-center flex fixed w-screen h-screen top-0 left-0 z-10 bg-gray44">
            <div
                onClick={() => {
                    toClose(false);
                }}
                className="flex w-screen h-screen absolute"></div>
            <div className=" bg-white flex flex-col items-start pb-0 rounded-8 overflow-hidden box-border modal-container z-10">
                <div className="flex justify-end  bg-blue w-full">
                    <div
                        className=" p-3 cursor-pointer"
                        onClick={() => {
                            toClose(false);
                        }}>
                        <CloseIcon className="w-3 h-3" />
                    </div>
                </div>
                <div className="flex flex-row ">
                    <div className="flex w-96 flex-col p-7">
                        <div className=" flex justify-between">
                            <h2 className="text-black font-bold mb-5"> {data.name}</h2>
                            <button className=" flex items-center h-6 px-2 bg-none outline-none rounded-4 cursor-pointer border-gray border-1 border-solid">
                                <EditIcon className="w-4 h-4 mr-1" />
                                Edit task
                            </button>
                        </div>
                        <div className="flex items-center mb-4">
                            <span className=" flex items-center w-32">
                                <StatusIcon className="w-4 h-4 mr-2" />
                                Status
                            </span>
                            <p className="text-black">{listName}</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <span className=" flex items-center w-32">
                                <DateIcon className="w-4 h-4 mr-2" />
                                Due date
                            </span>
                            <p className="text-black">{formatDate(data.dueDate)}</p>
                        </div>
                        <div className="flex items-center mb-4">
                            <span className=" flex items-center w-32">
                                <PriorityIcon className="w-4 h-4 mr-2" />
                                Priority
                            </span>
                            <p className="text-black">{data.priority}</p>
                        </div>
                        <div className="flex flex-col items-start mt-4">
                            <h2 className=" text-black font-semibold">Description</h2>
                            <p>{data.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-start w-72 min-h-7 bg-gray-100 p-5">
                        <h2 className=" text-black">Activity</h2>
                        <div className="flex flex-col items-start w-full h-full">
                            <p>{"test"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
