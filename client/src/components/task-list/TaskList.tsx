import React, { useState } from "react";
import "./taskList.css";
import { ReactComponent as Menu } from "../../assets/icons/menu.svg";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import TaskCard from "../task-card/TaskCard";
import EditMenuList from "../editMenu/EditMenuList";
import AddCard from "../addCard/AddCard";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type IParams, removeNameList } from "../../queries/remove-name-list.query";
import { useNavigate } from "react-router-dom";

export interface ITasks {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    taskListId: number;
}
export interface ITaskLists {
    name: string;
    id: number;
    tasks: ITasks[];
}
interface ITaskList {
    title: string;
    id: number;
    taskLists: ITaskLists[];
}
// interface IInput {
//     name: string;
// }

export default function TaskList({ title, id, taskLists }: ITaskList): JSX.Element {
    const { register, handleSubmit } = useForm<IParams>();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [addCardModal, setAddCardModal] = useState(false);
    const [editListName, setEditListName] = useState(false);
    const [formStat, setFormState] = useState<IParams | null>(null);

    const { status } = removeNameList(formStat, id);

    if (status === "success") {
        navigate(0);
    }
    const tasksNoId = taskLists.find((v) => v.id === id);

    const onSubmit: SubmitHandler<IParams> = (data) => {
        setFormState(data);
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
                                    value: title,
                                })}
                                type="text"
                            />
                            <button>Edit</button>
                        </form>
                    ) : (
                        <h2>{title}</h2>
                    )}

                    <span>{tasksNoId?.tasks.length}</span>
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
                            id={id}
                            setAddCardModal={setAddCardModal}
                            toClose={setMenuOpen}
                        />
                    )}
                </div>
            </div>
            {addCardModal && (
                <AddCard toClose={setAddCardModal} listStatus={taskLists} listId={id} />
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
                    <TaskCard taskLists={taskLists} listId={id} key={key} data={i} />
                ))}
            </div>
        </div>
    );
}
