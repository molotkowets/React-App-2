import React from "react";
import "./input-edit-name.css";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useMutateRenameBoard } from "../../queries/rename-board.query";

export interface IInput {
    name: string;
}
interface IParams {
    id: number;
    name: string;
    setEditName: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function InputEditName({ setEditName, name, id }: IParams): JSX.Element {
    const { register, handleSubmit, setValue } = useForm<IInput>();
    const renameBoard = useMutateRenameBoard();

    const onSubmit: SubmitHandler<IInput> = (data) => {
        renameBoard.mutate({ ...data, id });
        setValue("name", "");
        setEditName(false);
    };

    return (
        <form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("name", {
                    required: "Name is require field!",
                    value: name,
                })}
                type="text"
            />
            <button>Edit</button>
        </form>
    );
}
