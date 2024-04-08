import React from "react";
import "./priority.css";

interface IPriority {
    priority: string;
}
export default function Priority({ priority }: IPriority): JSX.Element {
    return (
        <div className="flex">
            <div className="flex  bg-white rounded-8 font-medium items-center">
                <div className={` w-2 h-2 rounded-per50 m-2 bg-low ${priority.toLowerCase()}`} />
                {priority}
            </div>
        </div>
    );
}
