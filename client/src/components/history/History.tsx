import React from "react";
import "./history.css";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
import { type IToClose } from "../../types/hook.types";

// export interface IHistory {
//     toClose: React.Dispatch<React.SetStateAction<boolean>>;
// }
export default function History({ toClose }: IToClose): JSX.Element {
    function toCloseHistory(): void {
        toClose(false);
        console.log("closeHistory");
    }
    return (
        <div className="history-container modal-wrapper">
            <div onClick={toCloseHistory} className="modal-to-close-btn"></div>
            <div className="h-list-wrapper">
                <div className="h-l-header">
                    <h2>History</h2>
                    <CloseIcon onClick={toCloseHistory} className="close-btn" />
                </div>
            </div>
        </div>
    );
}
