import React, { useState } from "react";
import "./edit-card.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type ITaskLists, type ITasks } from "../task-list/TaskList";
import InputError from "../inputError/InputError";
import { useNavigate } from "react-router-dom";
import { editTask } from "../../queries/edit-task-card.query";
import { formatDateToForm } from "../../other/formatDate";
export interface ICardForm {
    name: string;
    description: string;
    priority: string;
    dueDate: string;
    taskListId: number;
}
interface IAddCard {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
    cardData: ITasks;
    taskLists: ITaskLists[];
}

export default function EditCard({ toClose, cardData, taskLists }: IAddCard): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICardForm>();
    const navigate = useNavigate();

    const [formStat, setFormState] = useState<ICardForm | null>(null);
    const { status } = editTask(formStat, cardData.id);

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
                                        value: cardData.name,
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
                                        value: cardData.description,
                                    })}></textarea>
                                {errors.name != null && (
                                    <InputError error={errors.description?.message} />
                                )}
                            </div>
                            <div className="cb-f-input-box">
                                <label htmlFor="dueDate">Due date:</label>
                                <input
                                    {...register("dueDate", {
                                        required: true,
                                        value: formatDateToForm(cardData.dueDate),
                                    })}
                                    type="datetime-local"
                                />
                            </div>
                            <div className="cb-f-input-box">
                                <label htmlFor="name">Priority:</label>
                                <select
                                    {...register("priority", {
                                        required: true,
                                        value: cardData.priority,
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
                                    defaultValue={cardData.taskListId}>
                                    <option value="value0" disabled>
                                        Task list:
                                    </option>
                                    {taskLists.map((v, key) => (
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
