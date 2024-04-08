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
        <div className=" mr-8 min-w-60 max-w-72  last:mr-0">
            <div className="flex items-center justify-between border-t-gray border-b-gray py-1 border-t-1 border-b-1">
                <div className="flex justify-between items-center w-full">
                    {editListName ? (
                        <form className="flex pr-p10" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="flex relative">
                    <Menu
                        onClick={() => {
                            setMenuOpen(!menuOpen);
                        }}
                        className="flex h-4 justify-center px-1 cursor-pointer"
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
            <div className="flex">
                <button
                    onClick={() => {
                        setAddCardModal(true);
                    }}
                    className="flex w-full bg-none rounded-8 border-dashed border-gray p-p10 items-center justify-center my-p10 cursor-pointer">
                    <Add className="flex w-4 h-4" />
                    <span>Add new card</span>
                </button>
            </div>
            <div className="">
                {tasksNoId?.tasks.map((i, key) => (
                    <Task taskLists={taskLists} listId={list.id} key={key} data={i} />
                ))}
            </div>
        </div>
    );
}
