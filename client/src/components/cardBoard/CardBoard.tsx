import React, { useState } from "react";
import "./card-board.css";
import { type IBoard } from "../../types/queries.types";
import { ReactComponent as MenuIcon } from "../../assets/icons/menu.svg";
import EditMenu from "../editMenu/EditMenu";
import InputEditName from "../InputEditName/InputEditName";
import { NavLink } from "react-router-dom";

interface ICardBoard {
    params: IBoard;
}

export default function CardBoard({ params }: ICardBoard): JSX.Element {
    const [editMenu, setEditMenu] = useState(false);
    const [editName, setEditName] = useState(false);

    return (
        <div className="card-board-container">
            <NavLink className="card-board-skin-button" to={`task-lists/${params.id}`}></NavLink>
            {editMenu && (
                <EditMenu toClose={setEditMenu} id={params.id} setEditName={setEditName} />
            )}
            <div className="cb-header">
                {editName ? (
                    <InputEditName setEditName={setEditName} name={params.name} id={params.id} />
                ) : (
                    <h2>{params.name}</h2>
                )}

                <button
                    onClick={() => {
                        setEditMenu(true);
                    }}
                    className="cb-button">
                    <MenuIcon className="edit-menu" />
                </button>
            </div>
        </div>
    );
}
