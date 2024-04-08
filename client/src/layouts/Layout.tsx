import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";

export default function Layout(): JSX.Element {
    const pathname = useLocation().pathname;
    const title = pathname === "/" ? "My boards" : "My task board";

    return (
        <div className="flex flex-col h-full box-border">
            <Header title={title} />
            <Outlet />
        </div>
    );
}
