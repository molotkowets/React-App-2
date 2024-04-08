import React from "react";
import "./edit-card.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type ITaskLists } from "../task-list/TaskList";
import InputError from "../inputError/InputError";
import { useNavigate } from "react-router-dom";
// import { editTask } from "../../queries/edit-task-card.query";
import { formatDateToForm } from "../../utils/formatDate";
import { type ITask } from "../../types/queries.types";
export interface ICardForm {
    name: string;
    description: string;
    priority: string;
    dueDate: string;
    taskListId: number;
}
interface IAddCard {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
    cardData: ITask;
    taskLists: ITaskLists[];
}

export default function EditCard({ toClose, cardData, taskLists }: IAddCard): JSX.Element {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICardForm>();
    const navigate = useNavigate();

    // const [formStat, setFormState] = useState<ICardForm | null>(null);
    // const { status } = editTask(formStat, cardData.id);

    if (status === "success") {
        navigate(0);
    }

    const onSubmit: SubmitHandler<ICardForm> = (data) => {
        // setFormState(data);
    };

    return (
        <div className="add-card-wrapper flex justify-center items-center flex fixed w-screen h-screen top-0 left-0 z-10 bg-gray44">
            <div
                onClick={() => {
                    toClose(false);
                }}
                className="flex w-screen h-screen absolute"></div>
            <div className="flex rounded-8 bg-white flex-col z-20 m-5 items-center justify-center overflow-hidden">
                <div className="box-border w-full flex justify-end p-p10 bg-blue">
                    <div
                        onClick={() => {
                            toClose(false);
                        }}>
                        <CloseIcon className="w-3 h-3" />
                    </div>
                </div>
                <div className="flex flex-row p-5">
                    <h2>Add task</h2>
                    <div className="flex w100 flex-col p-7">
                        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col my-p10 items-start">
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
                            <div className="flex flex-col my-p10 items-start">
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
                            <div className="flex flex-col my-p10 items-start">
                                <label htmlFor="dueDate">Due date:</label>
                                <input
                                    {...register("dueDate", {
                                        required: true,
                                        value: formatDateToForm(cardData.dueDate),
                                    })}
                                    type="datetime-local"
                                />
                            </div>
                            <div className="flex flex-col my-p10 items-start">
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
                            <div className="flex flex-col my-p10 items-start">
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
