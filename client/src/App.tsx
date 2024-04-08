import React from "react";
import "./App.css";
import "./styles/modal.styles.css";
import "./styles/all.style.css";
import { Route, Routes } from "react-router-dom";
import TaskBoardPage from "./pages/task-board-page/TaskBoardPage";
import HomePage from "./pages/home-page/HomePage";
import Layout from "./layouts/Layout";

function App(): JSX.Element {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="task-lists/:id" element={<TaskBoardPage />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
