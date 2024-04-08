import React from "react";
import "./layout.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";

export default function Layout(): JSX.Element {
    const pathname = useLocation().pathname;
    const title = pathname === "/" ? "My boards" : "My task board";

    return (
        <div className="app-container">
            <Header title={title} />
            <Outlet />
        </div>
    );
}
