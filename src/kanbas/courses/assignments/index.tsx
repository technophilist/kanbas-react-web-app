import {useMemo} from "react";
import {BsGripVertical, BsPlus} from "react-icons/bs";
import ModuleControlButtons from "../modules/ModuleControlButtons";
import {IoEllipsisVertical, IoSearch} from "react-icons/io5";
import {IoMdArrowDropdown} from "react-icons/io";
import LessonControlButtons from "../modules/LessonControlButtons";
import {SlNote} from "react-icons/sl";
import {FaRegEdit} from "react-icons/fa";

const assignments = [
    {
        assignmentTitle: "ASSIGNMENTS",
        assignments: [
            {
                title: "A1",
                description: "Multiple Modules | Not available until May 6 at 12:00 am | Due May 13 at 11:59pm | 100pts",
                link: "#/kanbas/courses/1234/assignments/123",
            },
            {
                title: "A2-CSS + BOOTSTRAP",
                description: "Multiple Modules | Not available until May 13 at 12:00 am | Due May 20 at 11:59pm | 100pts",
                link: "#/kanbas/courses/1234/assignments/456", // Replace with the actual link for A2
            },
            {
                title: "A3 - JAVASCRIPT + REACT",
                description: "Multiple Modules | Not available until May 20 at 12:00 am | Due May 27 at 11:59pm | 100pts",
                link: "#/kanbas/courses/1234/assignments/789", // Replace with the actual link for A3
            }
        ]
    }
];

function Assignments() {
    const assignmentItems = useMemo(() => {
        return assignments.map((assignmentItem) => {
            return (
                <li className="list-group-item p-0 mb-5 fs-5 border-gray">
                    <div id="wd-assignments-title"
                         className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <BsGripVertical className="me-2 fs-4"/>
                            <IoMdArrowDropdown className="fs-4"/>
                            <span className="fw-semibold">{assignmentItem.assignmentTitle}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <span className="rounded-5 ps-3 pe-3 pt-1 pb-1 fs-5 fw-semibold"
                                  style={{border: "1px solid gray"}}> 40% of Total</span>
                            <button className="btn"><BsPlus className="fs-4"/></button>
                            <IoEllipsisVertical className="fs-4"/>
                        </div>
                    </div>
                    {assignmentItem.assignments.map((assignment) => {
                        return (
                            <li style={{
                                borderLeft: "3px solid green"
                            }}
                                className="wd-assignment-list-item list-group-item rounded-0 d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <div className="d-flex align-items-center pe-4">
                                        <BsGripVertical className="fs-4 me-2"/>
                                        <FaRegEdit className="fs-5 text-success"/>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <a className="wd-assignment-link text-black text-decoration-none fw-semibold"
                                           href={assignment.link}>
                                            {assignment.title}
                                        </a>
                                        <div>
                                            <p className="mb-0 pb-0">
                                                <span className="text-danger">Multiple Modules</span> | <span
                                                className="fw-semibold">Not available until </span>May 20 at 12:00 am |
                                            </p>
                                            <p className="m-0 p-0"><span
                                                className="fw-semibold">Due</span> May 27 at 11:59pm | 100 pts</p>
                                        </div>

                                    </div>
                                </div>
                                <LessonControlButtons/>
                            </li>
                        )
                    })}
                </li>
            )
        })
    }, [])

    return (
        <div id="wd-assignments">
            <div className="d-flex justify-content-between">
                <div style={{height: "38px", width: "50%"}} className="input-group mb-3">
                    <span className="input-group-text bg-white"><IoSearch/></span>
                    <input
                        id="wd-search-assignment"
                        type="text"
                        className="form-control rounded-1 w-50 rounded-start-0 border-start-0"
                        placeholder="Search..."/>
                </div>
                <div style={{height: "38px"}} className="d-flex">
                    <button id="wd-add-assignment-group" className="btn btn-secondary me-1 rounded-1">+ Group</button>
                    <button id="wd-add-assignment" className="btn btn-danger rounded-1">+ Assignment</button>
                </div>
            </div>
            <ul id="wd-assignment-list" className="list-group rounded-0">
                {assignmentItems}
            </ul>
        </div>
    );
}

export default Assignments