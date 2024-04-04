import React, { useState, type Dispatch, type SetStateAction } from "react";
import "./editMenu.css";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import { ReactComponent as Edit } from "../../assets/icons/edit.svg";
import { ReactComponent as TrashCan } from "../../assets/icons/trash-can.svg";
import { useNavigate } from "react-router-dom";
import { deleteTaskList } from "../../queries/delete-task-list.query";

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
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const addClick = (): void => {
        toClose(false);
        setAddCardModal(true);
    };
    const navigate = useNavigate();
    const { status } = deleteTaskList(deleteId);

    if (status === "success") {
        navigate(0);
    }

    return (
        <div>
            <div className="em-container">
                <button className="em-button">
                    <Edit
                        onClick={() => {
                            setEditListName(true);
                            toClose(false);
                        }}
                        className="em-btn-icon"
                    />{" "}
                    <span>Edit</span>
                </button>
                <button onClick={addClick} className="em-button">
                    <Add className="em-btn-icon" />
                    <span>Add new card</span>
                </button>
                <button
                    onClick={() => {
                        setDeleteId(id);
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
