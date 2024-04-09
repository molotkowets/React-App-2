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
            addTaskList.mutate({ ...data, boardId: Number(id) });
        }
        console.log("test Form");

        setValue("name", "");
        setCreateNewList(false);
    };

    return (
        <div>
            {createNewList ? (
                <div className=" relative">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex h-7 items-center border-none rounded-4 cursor-pointer px-p10 ml-p10 relative z-20 font-medium bg-blue">
                        <button type="submit" className=" border-none outline-none bg-none">
                            <AddIcon className="w-5 h-5 pr-2" />
                        </button>
                        {/* <input type="submit" /> */}
                        <input
                            {...register("name", {
                                required: "Name is require field!",
                            })}
                            type="text"
                            placeholder="Enter name"
                        />
                    </form>
                    <div
                        onClick={() => {
                            setCreateNewList(false);
                        }}
                        className=" bg-gray44 w-screen h-screen fixed top-0 left-0 z-10"></div>
                </div>
            ) : (
                <button
                    onClick={() => {
                        setCreateNewList(true);
                    }}
                    className="flex h-7 items-center border-none rounded-4 cursor-pointer px-p10 ml-p10 font-medium bg-blue text-white">
                    <AddIcon className="w-5 h-5 pr-2" />
                    {locationCheck ? "Create new board" : "Create new list"}
                </button>
            )}
        </div>
    );
}
