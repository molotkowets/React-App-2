import React from "react";
import "./App.css";
import "./styles/modal.styles.css";
import "./styles/all.style.css";
import { Route, Routes } from "react-router-dom";
import TaskBoardPage from "./pages/taskBoard/TaskBoardPage";

function App(): JSX.Element {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<TaskBoardPage />} />
            </Routes>
        </div>
    );
}

export default App;
