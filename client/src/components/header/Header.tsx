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
        <div className="flex w-full p-7 box-border justify-between">
            <h1>{title}</h1>

            {historyModal && <History toClose={setHistoryModal} />}
            <div className="flex items-center">
                {!locationCheck && (
                    <button
                        onClick={() => {
                            setHistoryModal(true);
                        }}
                        className="flex h-7 items-center border-none rounded-4 cursor-pointer px-p10 ml-p10 font-medium bg-white border-1 border-gray">
                        <HistoryIcon className="w-5 h-5 pr-2" />
                        History
                    </button>
                )}
                <CreateButton locationCheck={locationCheck} />
            </div>
        </div>
    );
}
