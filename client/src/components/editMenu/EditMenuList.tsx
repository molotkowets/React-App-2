import React, { type Dispatch, type SetStateAction } from "react";
import "./editMenu.css";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as TrashCan } from "../../assets/icons/trash-can.svg";
import { useMutateDeleteTaskList } from "../../queries/delete-task-list.query";

interface IEditMenu {
    toClose: React.Dispatch<React.SetStateAction<boolean>>;
    setAddCardModal: Dispatch<SetStateAction<boolean>>;
    id: number;
    setEditListName: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditMenuList({
    id,
    toClose,
    setAddCardModal,
    setEditListName,
}: IEditMenu): JSX.Element {
    const addClick = (): void => {
        toClose(false);
        setAddCardModal(true);
    };
    const deleteList = useMutateDeleteTaskList();

    return (
        <div>
            <div className="flex flex-col rounded-8 p-p10 pr-p30 absolute right-0 top-8 z-10 bg-white">
                <button
                    onClick={() => {
                        setEditListName(true);
                        toClose(false);
                    }}
                    className="flex bg-none border-none cursor-pointer py-1">
                    <Edit className="w-5 h-5 px-1" /> <span>Edit</span>
                </button>
                <button onClick={addClick} className="flex bg-none border-none cursor-pointer py-1">
                    <Add className="w-5 h-5 px-1" />
                    <span>Add new card</span>
                </button>
                <button
                    onClick={() => {
                        deleteList.mutate(id);
                        toClose(false);
                    }}
                    className="flex bg-none border-none cursor-pointer py-1">
                    <TrashCan className="w-5 h-5 px-1" /> <span>Delete</span>
                </button>
            </div>
            <div
                onClick={() => {
                    toClose(false);
                }}
                className="flex fixed w-screen h-screen top-0 left-0 cursor-pointer"></div>
        </div>
    );
}
