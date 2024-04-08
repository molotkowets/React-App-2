import React, { useState } from "react";
import "./header.css";
import History from "../history/History";
import { ReactComponent as HistoryIcon } from "../../assets/icons/history.svg";
import { useLocation } from "react-router-dom";
import CreateButton from "../createButton/CreateButton";

interface IHeader {
    title: string;
}

export default function Header({ title }: IHeader): JSX.Element {
    const location = useLocation();
    const [historyModal, setHistoryModal] = useState(false);

    const locationCheck = location.pathname === "/";

    return (
        <div className="header-container">
            <h1>{title}</h1>

            {historyModal && <History toClose={setHistoryModal} />}
            <div className="header-buttons-wrapper">
                {!locationCheck && (
                    <button
                        onClick={() => {
                            setHistoryModal(true);
                        }}
                        className="header-button header-button-his">
                        <HistoryIcon className="header-button-icon" />
                        History
                    </button>
                )}
                <CreateButton locationCheck={locationCheck} />
            </div>
        </div>
    );
}
