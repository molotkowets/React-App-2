import React from "react";
import "./input-error.css";
interface IInputError {
    error: string | undefined;
}
export default function InputError({ error }: IInputError): JSX.Element {
    return <div className=" text-red-500">{error}</div>;
}
