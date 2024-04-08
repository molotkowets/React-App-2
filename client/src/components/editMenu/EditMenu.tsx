import React from "react";
import "./editMenu.css";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as TrashCan } from "../../assets/icons/trash-can.svg";
import { useMutateDeleteBoard } from "../../queries/delete-board.query";

interface IEditMenu {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
    id: number;
    setEditName: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditMenu({ toClose, id, setEditName }: IEditMenu): JSX.Element {
    const deleteBoard = useMutateDeleteBoard();

    return (
        <div>
            <div className="flex flex-col rounded-4 border-gray border-1 p-p10 pr-p30 absolute top-14 right-6 bg-white z-10">
                <button
                    onClick={() => {
                        toClose(false);
                        setEditName(true);
                    }}
                    className="flex bg-none border-none cursor-pointer py-1 size-max items-center ">
                    <Edit className=" w-5 h-5 px-1" /> <span>Edit</span>
                </button>
                <button
                    onClick={() => {
                        deleteBoard.mutate(id);
                        toClose(false);
                    }}
                    className="flex bg-none border-none cursor-pointer py-1 size-max items-center">
                    <TrashCan className=" w-5 h-5 px-1" /> <span>Delete</span>
                </button>
            </div>
            <div
                onClick={() => {
                    toClose(false);
                }}
                className=" flex fixed w-screen h-screen cursor-pointer top-0 left-0"></div>
        </div>
    );
}
