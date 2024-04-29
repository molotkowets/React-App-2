import React, { useState } from "react";
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
        <div className=" w-48 h-28 bg-slate-400 hover:bg-slate-500 flex justify-between overflow-hidden m-5 rounded-4 transition-colors relative size-16 font-bold text-white ">
            <NavLink className="flex w-full h-full" to={`task-lists/${params.id}`}></NavLink>
            {editMenu && (
                <EditMenu toClose={setEditMenu} id={params.id} setEditName={setEditName} />
            )}
            <div className="flex absolute w-full justify-between p-5 items-center">
                {editName ? (
                    <InputEditName setEditName={setEditName} name={params.name} id={params.id} />
                ) : (
                    <h2>{params.name}</h2>
                )}

                <button
                    onClick={() => {
                        setEditMenu(true);
                    }}
                    className="flex">
                    <MenuIcon className="edit-menu w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
