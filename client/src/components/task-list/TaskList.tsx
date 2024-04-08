import React, { useState } from "react";
import "./taskList.css";
import { ReactComponent as Menu } from "../../assets/icons/menu.svg";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import EditMenuList from "../editMenu/EditMenuList";
import AddCard from "../addCard/AddCard";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useMutateRenameList } from "../../queries/rename-list.query";
import Task from "../task/Task";
import { type ITask } from "../../types/queries.types";

export interface ITaskLists {
    id: number;
    name: string;
    boardId: number;
    tasks: ITask[];
}
interface ITaskList {
    taskLists: ITaskLists[];
    list: ITaskLists;
}
interface IInput {
    name: string;
}

export default function TaskList({ list, taskLists }: ITaskList): JSX.Element {
    const { register, handleSubmit } = useForm<IInput>();
    const [menuOpen, setMenuOpen] = useState(false);
    const [addCardModal, setAddCardModal] = useState(false);
    const [editListName, setEditListName] = useState(false);
    const renameList = useMutateRenameList();
    const tasksNoId = taskLists.find((v) => v.id === list.id);

    const onSubmit: SubmitHandler<IInput> = (data) => {
        renameList.mutate({ ...data, id: list.id });
        setEditListName(false);
    };

    return (
        <div className="task-list-container">
            <div className="tl-header">
                <div className="tl-header-title">
                    {editListName ? (
                        <form className="tl-form-edit-list" onSubmit={handleSubmit(onSubmit)}>
                            <input
                                {...register("name", {
                                    required: "Name is require field!",
                                    value: list.name,
                                })}
                                type="text"
                            />
                            <button>Edit</button>
                        </form>
                    ) : (
                        <h2>{list.name}</h2>
                    )}

                    <span>{list.tasks.length}</span>
                </div>
                <div className="tl-header-menu">
                    <Menu
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                        }}
                        className="tl-header-menu-icon"
                    />
                    {menuOpen && (
                        <EditMenuList
                            setEditListName={setEditListName}
                            id={list.id}
                            setAddCardModal={setAddCardModal}
                            toClose={setMenuOpen}
                        />
                    )}
                </div>
            </div>
            {addCardModal && (
                <AddCard toClose={setAddCardModal} taskLists={taskLists} list={list} />
            )}
            <div className="tl-button-container">
                <button
                    onClick={() => {
                        setAddCardModal(true);
                    }}
                    className="tl-button-add">
                    <Add className="tl-button-add-icon" />
                    <span>Add new card</span>
                </button>
            </div>
            <div className="tl-task-cads">
                {tasksNoId?.tasks.map((i, key) => (
                    <Task taskLists={taskLists} listId={list.id} key={key} data={i} />
                ))}
            </div>
        </div>
    );
}
