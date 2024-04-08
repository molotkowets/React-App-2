import React from "react";
import "./addCard.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type ITaskLists } from "../task-list/TaskList";
import InputError from "../inputError/InputError";
import { useMutateAddCard } from "../../queries/add-task.query";

export interface ICardForm {
    name: string;
    description: string;
    priority: string;
    dueDate: string;
    taskListId: number;
}
interface IAddCard {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
    taskLists: ITaskLists[];
    list: ITaskLists;
}

export default function AddCard({ toClose, taskLists, list }: IAddCard): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICardForm>();

    const { mutate, isSuccess } = useMutateAddCard();

    const onSubmit: SubmitHandler<ICardForm> = (data) => {
        mutate({ ...data, boardId: list.id });
        console.log(isSuccess);
    };

    if (isSuccess) {
        toClose(false);
    }

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
                                    defaultValue={list.id}>
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
