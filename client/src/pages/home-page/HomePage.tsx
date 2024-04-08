import React from "react";
import CardBoard from "../../components/cardBoard/CardBoard";
import { getBoards } from "../../queries/get-boards.query";
import Loading from "../../components/loading/Loading";
import Empty from "../../components/empty/Empty";

export default function HomePage(): JSX.Element {
    const { data, isLoading } = getBoards();

    if (isLoading) {
        return <Loading />;
    }
    if (data?.data.length === 0) {
        return <Empty title="You don't have any boards yet." />;
    }
    return (
        <div className="flex w-full h-full flex-wrap p-10 items-stretch content-start">
            {data?.data.map((b, key) => <CardBoard key={key} params={b} />)}
        </div>
    );
}
