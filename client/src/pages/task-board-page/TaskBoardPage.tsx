import React from "react";
import "./taskBoardPage.css";
import TaskList from "../../components/task-list/TaskList";
import { getListsById } from "../../queries/get-lists.query";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import Empty from "../../components/empty/Empty";

export default function TaskBoardPage(): JSX.Element {
    const { id } = useParams();
    const { isLoading, data: response } = getListsById(Number(id));
    if (isLoading) {
        return <Loading />;
    }
    if (response?.data.length === 0) {
        return <Empty title="You don't have any task lists yet." />;
    }
    return (
        <div className=" flex flex-col items-start pb-0 h-full box-border ">
            <div className="flex flex-row overflow-x-auto px-8 w-full h-full">
                {response?.data.map((i, key) => (
                    <TaskList list={i} key={key} taskLists={response?.data} />
                ))}
            </div>
        </div>
    );
}
