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
            <div className="em-container-board">
                <button
                    onClick={() => {
                        toClose(false);
                        setEditName(true);
                    }}
                    className="em-button">
                    <Edit className="em-btn-icon" /> <span>Edit</span>
                </button>
                <button
                    onClick={() => {
                        deleteBoard.mutate(id);
                        toClose(false);
                    }}
                    className="em-button">
                    <TrashCan className="em-btn-icon" /> <span>Delete</span>
                </button>
            </div>
            <div
                onClick={() => {
                    toClose(false);
                }}
                className="em-background-button-close"></div>
        </div>
    );
}
