import React from "react";
import "./input.css";
import { type ICardForm } from "../addCard/AddCard";
import { type UseFormRegister } from "react-hook-form";

interface IInput {
    register: UseFormRegister<ICardForm>;
    name: string;
    type: string;
}
export default function Input({ register }: IInput): JSX.Element {
    return (
        <div>
            <input
                {...(register("name"),
                {
                    required: true,
                })}
                type="text"
            />
        </div>
    );
}
