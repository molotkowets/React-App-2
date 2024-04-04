import React from "react";
import "./priority.css";

interface IPriority {
    priority: string;
}
export default function Priority({ priority }: IPriority): JSX.Element {
    return (
        <div className="priority-container">
            <div className="priority">
                <div className={`priority-dot p-dot-${priority.toLowerCase()}`} />
                {priority}
            </div>
        </div>
    );
}
