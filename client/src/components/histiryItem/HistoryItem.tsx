import React from "react";
import "./history-item.css";
interface IHistoryItem {
    message: string;
}
export default function HistoryItem({ message }: IHistoryItem): JSX.Element {
    return <li className=" mb-p10 ml-p10">{message}</li>;
}
