import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Lab1 from "./lab1";
import Lab2 from "./lab2";
import Lab3 from "./lab3";
import TOC from "./TOC";

function Labs() {
    return (
        <div>
            <h1>Labs</h1>
            <TOC/>
            <Routes>
                <Route path="/" element={<Navigate to="lab1"/>}/>
                <Route path="lab1" element={<Lab1/>}/>
                <Route path="lab1" element={<Lab2/>}/>
                <Route path="lab1" element={<Lab3/>}/>
            </Routes>
        </div>
    )
}

export default Labs