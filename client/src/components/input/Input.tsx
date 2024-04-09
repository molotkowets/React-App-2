import React from "react";
import "./input.css";
import { type ICardForm } from "../addCard/AddCard";
import { type UseFormRegister } from "react-hook-form";

export interface IInput {
    register: UseFormRegister<ICardForm>;
    name: string;
    type: string;
    placeholder: string;
}
export default function Input({ register, name, type, placeholder }: IInput): JSX.Element {
    return (
        <div>
            <input
                {...(register("name"),
                {
                    required: true,
                })}
                className="input"
                type={type}
                name={name}
                placeholder={placeholder}
            />
        </div>
    );
}
