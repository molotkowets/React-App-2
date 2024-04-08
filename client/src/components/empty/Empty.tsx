import React from "react";

interface IEmpty {
    title: string;
}
export default function Empty({ title }: IEmpty): JSX.Element {
    return (
        <div>
            <h2>{title}</h2>
        </div>
    );
}
