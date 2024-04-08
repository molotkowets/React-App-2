import React, { useState } from "react";
import "./create-button.css";
import { ReactComponent as AddIcon } from "../../assets/icons/add-white.svg";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type IInput } from "../InputEditName/InputEditName";
import { useMutateAddBoard } from "../../queries/add-board.query";
import { useMutateAddTaskList } from "../../queries/add-task-list.query";
import { useParams } from "react-router-dom";

interface ICreateButton {
    locationCheck: boolean;
}

export default function CreateButton({ locationCheck }: ICreateButton): JSX.Element {
    const { register, handleSubmit, setValue } = useForm<IInput>();
    const [createNewList, setCreateNewList] = useState(false);
    const addBoardMutation = useMutateAddBoard();
    const addTaskList = useMutateAddTaskList();
    const { id } = useParams();

    const onSubmit: SubmitHandler<IInput> = (data) => {
        if (locationCheck) {
            addBoardMutation.mutate(data);
        } else {
            console.log("if - list");
            addTaskList.mutate({ ...data, boardId: Number(id) });
        }

        setValue("name", "");
        setCreateNewList(false);
    };

    return (
        <div
            onBlur={() => {
                setValue("name", "");
                setCreateNewList(false);
            }}>
            {createNewList ? (
                <form onSubmit={handleSubmit(onSubmit)} className="header-button header-button-add">
                    <button className="header-btn-send">
                        <AddIcon className="header-button-icon" />
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
                    className="header-button header-button-add">
                    <AddIcon className="header-button-icon" />
                    {locationCheck ? "Create new board" : "Create new list"}
                </button>
            )}
        </div>
    );
}
