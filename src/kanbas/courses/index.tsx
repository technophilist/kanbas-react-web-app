import CoursesNavigation from "./Navigation";
import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Modules from "./modules";
import Home from "./home";
import Assignments from "./assignments";
import AssignmentEditor from "./assignments/Editor";
import {FaAlignJustify} from "react-icons/fa";
import PeopleTable from "./people/Table";

function Courses() {
    return (
        <div id="wd-courses">
            <h2 className="text-danger">Course 1234
                <FaAlignJustify className="me-4 fs-4 mb-1"/>
            </h2>
            <hr/>
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation/>
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="home"/>}/>
                        <Route path="home" element={<Home/>}/>
                        <Route path="modules" element={<Modules/>}/>
                        <Route path="assignments" element={<Assignments/>}/>
                        <Route path="assignments/:aid" element={<AssignmentEditor/>}/>
                        <Route path="people" element={<PeopleTable/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Courses