import ModuleControls from "./ModuleControls";
import {useMemo} from "react";
import {BsGripVertical} from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

const modules = [
    {
        title: "Week 1",
        lessons: [
            "LEARNING OBJECTIVES",
            "Introduction to the course",
            "Learn what is Web Development",
            "Lesson 1",
            "Lesson2"
        ]
    },
    {
        title: "Week 1, Lecture 2 - Formatting User Interfaces with HTML",
        lessons: [
            "LEARNING OBJECTIVES",
            "Learn how to create user interfaces with HTML",
            "Deploy the assignment to Netlify",
            "Introduction to HTML and the DOM",
            "Formatting Web content with Headings",
            "Formatting content with Lists and Tables"
        ]
    }
]

function Modules() {
    const moduleItems = useMemo(() => {
        return modules.map((module) => {
            return (
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3"/>
                        {module.title}
                        <ModuleControlButtons/>
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {module.lessons.map((lessonTitle) => {
                            return (
                                <li
                                    className="wd-lesson list-group-item p-3 ps-1">
                                    <BsGripVertical className="me-2 fs-3"/>
                                    {lessonTitle}
                                    <LessonControlButtons/>
                                </li>
                            )
                        })}
                    </ul>
                </li>
            )
        })
    }, [])
    return (
        <div>
            <ModuleControls/> <br/> <br/> <br/>
            <ul id="wd-modules" className="list-group rounded-0">
                {moduleItems}
            </ul>
        </div>);
}

export default Modules