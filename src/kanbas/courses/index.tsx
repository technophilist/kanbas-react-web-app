import CoursesNavigation from "./Navigation";
import React, {useMemo} from "react";
import {Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
import Modules from "./modules";
import Home from "./home";
import Assignments from "./assignments";
import AssignmentEditor from "./assignments/Editor";
import {FaAlignJustify} from "react-icons/fa";
import PeopleTable from "./people/Table";
import {Course} from "../Dashboard";
import Quizzes from "./quizzes";
import QuizDetails from "./quizzes/QuizDetailScreen";
import QuizDetailScreen from "./quizzes/QuizDetailScreen";
import QuizDetailsEditorScreen from "./quizzes/QuizDetailsEditorScreen";


function toSentenceCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

type Props = {
    courses: Course[]
}

function Courses(props: Props) {
    const {cid} = useParams()
    const course = useMemo(() => props.courses.find((course) => course._id === cid), [cid, props.courses])
    const {pathname} = useLocation()
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1"/>
                {course && course.name} &gt; {toSentenceCase(pathname.split("/")[4])}
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
                        <Route path="assignments/:parentAssignmentId/:aid" element={<AssignmentEditor/>}/>
                        <Route path="people" element={<PeopleTable/>}/>
                        <Route path="quizzes" element={<Quizzes/>}/>
                        <Route path="quizzes/:qid" element={<QuizDetailScreen/>}/>
                        <Route path="quizzes/new" element={<QuizDetailsEditorScreen/>}/>
                        <Route path="quizzes/:qid/edit" element={<QuizDetailsEditorScreen/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Courses