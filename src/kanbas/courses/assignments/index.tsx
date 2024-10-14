import {useMemo} from "react";
import {BsGripVertical, BsPlus} from "react-icons/bs";
import {IoEllipsisVertical, IoSearch} from "react-icons/io5";
import {IoMdArrowDropdown} from "react-icons/io";
import LessonControlButtons from "../modules/LessonControlButtons";
import {FaRegEdit} from "react-icons/fa";
import dbAssingments from "../../database/assignments.json"
import {useParams} from "react-router-dom";

function Assignments() {
    const {cid} = useParams()
    const assignmentItems = useMemo(() => {
        return dbAssingments
            .filter((assignments) => assignments.course === cid)
            .map((assignment) => {
                return (
                    <li className="list-group-item p-0 mb-5 fs-5 border-gray" key={assignment._id}>
                        <div id="wd-assignments-title"
                             className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <BsGripVertical className="me-2 fs-4"/>
                                <IoMdArrowDropdown className="fs-4"/>
                                <span className="fw-semibold">{assignment.title}</span>
                            </div>
                            <div className="d-flex align-items-center">
                            <span className="rounded-5 ps-3 pe-3 pt-1 pb-1 fs-5 fw-semibold"
                                  style={{border: "1px solid gray"}}> 40% of Total</span>
                                <button className="btn"><BsPlus className="fs-4"/></button>
                                <IoEllipsisVertical className="fs-4"/>
                            </div>
                        </div>
                        {assignment.assignmentItems && assignment.assignmentItems.map((assignmentItem) => {
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
                                               href={assignmentItem.link}>
                                                {assignmentItem.title}
                                            </a>
                                            <div>
                                                <p className="mb-0 pb-0">
                                                    <span className="text-danger">Multiple Modules</span> | <span
                                                    className="fw-semibold">Not available until </span>{assignmentItem.notAvailableUntil} |
                                                </p>
                                                <p className="m-0 p-0"><span
                                                    className="fw-semibold">Due</span> {assignmentItem.due}| {assignmentItem.totalPoints}
                                                </p>
                                            </div>

                                        </div>
                                    </div>
                                    <LessonControlButtons/>
                                </li>)
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