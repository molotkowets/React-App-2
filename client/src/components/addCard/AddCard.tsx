import React, { useState } from "react";
import "./addCard.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type ITaskLists } from "../task-list/TaskList";
import InputError from "../inputError/InputError";
import { addTask } from "../../queries/add-task.query";
import { useNavigate } from "react-router-dom";
export interface ICardForm {
    name: string;
    description: string;
    priority: string;
    dueDate: string;
    taskListId: number;
}
interface IAddCard {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
    listStatus: ITaskLists[];
    listId: number;
}

export default function AddCard({ toClose, listStatus, listId }: IAddCard): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICardForm>();
    const navigate = useNavigate();
    const defaultValue = listStatus.find((v) => v.id === listId);
    const [formStat, setFormState] = useState<ICardForm | null>(null);
    const { status } = addTask(formStat);

    if (status === "success") {
        navigate(0);
    }

    const onSubmit: SubmitHandler<ICardForm> = (data) => {
        setFormState(data);
    };

    return (
        <div className="add-card-wrapper modal-wrapper">
            <div
                onClick={() => {
                    toClose(false);
                }}
                className="modal-to-close-btn"></div>
            <div className="modal-container add-card-container">
                <div className="add-modal-header cb-head-line">
                    <div
                        onClick={() => {
                            toClose(false);
                        }}>
                        <CloseIcon className="close-btn" />
                    </div>
                </div>
                <div className="cb-body">
                    <h2>Add task</h2>
                    <div className="cb-b-data">
                        <form className="cb-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="cb-f-input-box">
                                <label htmlFor="name">Name:</label>
                                <input
                                    {...register("name", {
                                        required: "Name is require field!",
                                    })}
                                    type="text"
                                />
                                {errors.name != null && <InputError error={errors.name?.message} />}
                            </div>
                            <div className="cb-f-input-box">
                                <label htmlFor="Description">Description:</label>
                                <textarea
                                    {...register("description", {
                                        required: "Description is require field!",
                                    })}
                                    // name="Description"
                                    // id="Description"
                                ></textarea>
                                {errors.name != null && (
                                    <InputError error={errors.description?.message} />
                                )}
                            </div>
                            <div className="cb-f-input-box">
                                <label htmlFor="dueDate">Due date:</label>
                                <input
                                    {...register("dueDate", {
                                        required: true,
                                    })}
                                    type="datetime-local"
                                />
                            </div>
                            <div className="cb-f-input-box">
                                <label htmlFor="name">Priority:</label>
                                <select
                                    {...register("priority", {
                                        required: true,
                                    })}>
                                    <option value="low">low</option>
                                    <option value="middle">middle</option>
                                    <option value="high">high</option>
                                </select>
                            </div>
                            <div className="cb-f-input-box">
                                <label htmlFor="name">Task list:</label>
                                <select
                                    {...register("taskListId", {
                                        required: true,
                                    })}
                                    defaultValue={defaultValue?.id}>
                                    <option value="value0" disabled>
                                        Task list:
                                    </option>
                                    {listStatus.map((v, key) => (
                                        <option key={key} value={v.id}>
                                            {v.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button>send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
