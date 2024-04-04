import React, { useState } from "react";
import "./taskBoardPage.css";
import TaskList from "../../components/task-list/TaskList";
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg";
import { ReactComponent as AddIcon } from "../../assets/icons/add-white.svg";
import History from "../../components/history/History";
import { getCategoriesByParams } from "../../queries/get-lists.query";
import Loading from "../../components/loading/Loading";
import { type SubmitHandler, useForm } from "react-hook-form";
import { addTaskList, type IParams } from "../../queries/add-task-list.query";
import { useNavigate } from "react-router-dom";

interface IInputName {
    name: string;
}

export default function TaskBoardPage(): JSX.Element {
    const { register, handleSubmit } = useForm<IInputName>();
    const navigate = useNavigate();
    const { isLoading, data: response } = getCategoriesByParams();
    const [historyModal, setHistoryModal] = useState(false);
    const [listName, setListName] = useState<null | IParams>(null);
    const [createNewList, setCreateNewList] = useState(false);

    const { status } = addTaskList(listName);

    if (status === "success") {
        navigate(0);
    }

    if (isLoading) {
        console.log("loading");
        return <Loading />;
    }
    const onSubmit: SubmitHandler<IInputName> = (data) => {
        setListName(data);
    };

    return (
        <div className="task-board-container">
            {historyModal && <History toClose={setHistoryModal} />}

            <div className="tb-header">
                <h1>My Task Board</h1>
                <div className="tb-header-buttons-container">
                    <button
                        onClick={() => {
                            setHistoryModal(true);
                        }}
                        className="tb-header-button tb-button-his">
                        <HistoryIcon className="tb-button-icon" />
                        History
                    </button>
                    {createNewList ? (
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="tb-header-button tb-button-add">
                            <button className="tb-header-btn-send">
                                <AddIcon className="tb-button-icon" />
                            </button>
                            <input
                                {...register("name", {
                                    required: "Name is require field!",
                                })}
                                type="text"
                                placeholder="Enter name"
                            />
                        </form>
                    ) : (
                        <button
                            onClick={() => {
                                setCreateNewList(true);
                            }}
                            className="tb-header-button tb-button-add">
                            <AddIcon className="tb-button-icon" />
                            Create new list
                        </button>
                    )}
                </div>
            </div>
            <div className="tb-column-container">
                {response?.data.map((i, key) => (
                    <TaskList
                        title={i.name}
                        id={i.id}
                        key={key}
                        // tasks={tasksStatus(response?.data)}
                        taskLists={response?.data}
                    />
                ))}
            </div>
        </div>
    );
}
