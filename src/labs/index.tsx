import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Lab1 from "./lab1";
import Lab2 from "./lab2";
import Lab3 from "./lab3";
import TOC from "./TOC";
import Lab4 from "./lab4";

function Labs() {
    return (
        <div>
            <h2>Name: Marsh Royden</h2>
            <h2>Section: 1</h2>
            <h1>Labs</h1>
            <TOC/>
            <Routes>
                <Route path="/" element={<Navigate to="lab1"/>}/>
                <Route path="lab1" element={<Lab1/>}/>
                <Route path="lab2" element={<Lab2/>}/>
                <Route path="lab3/*" element={<Lab3/>}/>
                <Route path="lab4" element={<Lab4/>}/>
            </Routes>
        </div>
    )
}

export default Labs