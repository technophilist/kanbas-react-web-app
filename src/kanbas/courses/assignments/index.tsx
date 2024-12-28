import {useCallback, useEffect, useMemo, useState} from "react";
import {BsGripVertical, BsPlus} from "react-icons/bs";
import {IoEllipsisVertical, IoSearch} from "react-icons/io5";
import {IoMdArrowDropdown} from "react-icons/io";
import LessonControlButtons from "../modules/LessonControlButtons";
import {FaRegEdit} from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import * as reducer from "./reducer";
import * as client from "./client"

function Assignments() {
    const {cid} = useParams()
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)
    const {assignments} = useSelector((state: RootState) => state.assignmentsReducer)
    const navigate = useNavigate()
    const [parentOfLastAssignment, setParentOfLastAssignment] = useState("")
    const dispatch = useDispatch()
    const fetchAndSetAssignmentsForCurrentCourse = useCallback(async () => {
        if (!cid) return
        const assignmentsForCourse = await client.fetchAllAssignmentsForCourse(cid)
        dispatch(reducer.setAssignmentsForCourse({assignments: assignmentsForCourse}))
    }, [cid, dispatch])
    const deleteAssignment = useCallback(async (parent: string, assignmentId: string) => {
        if (!cid) return
        await client.deleteAssignment(parent, assignmentId, cid)
        dispatch(reducer.deleteAssignment({
            parentAssignmentId: parent,
            assignmentId: assignmentId,
            cid: cid
        }))
    }, [cid, dispatch])
    const assignmentItems = useMemo(() => {
        if (assignments.at(-1)) {
            setParentOfLastAssignment(assignments.at(-1)!._id)
        }
        return assignments.map((assignment) => {
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
                            {currentUser && currentUser.role === "FACULTY" &&
                                <button className="btn"><BsPlus className="fs-4"/></button>}
                            <IoEllipsisVertical className="fs-4"/>
                        </div>
                    </div>
                    {assignment.assignmentItems && assignment.assignmentItems.map((assignmentItem) => {
                        return (<li key={assignmentItem.id} style={{borderLeft: "3px solid green"}}
                                className="wd-assignment-list-item list-group-item rounded-0 d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    {currentUser && currentUser.role === "FACULTY" &&
                                        <div className="d-flex align-items-center pe-4">
                                            <BsGripVertical className="fs-4 me-2"/>
                                            <FaRegEdit className="fs-5 text-success"/>
                                        </div>}
                                    <div className="d-flex flex-column">
                                        {
                                            (currentUser?.role && currentUser.role === "FACULTY") ?
                                                (
                                                    <a className="wd-assignment-link text-black text-decoration-none fw-semibold"
                                                       href={assignmentItem.link}>
                                                        {assignmentItem.title}
                                                    </a>) : (<span
                                                    className="wd-assignment-link text-muted">{assignmentItem.title}</span>)
                                        }
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
                                {currentUser && currentUser.role === "FACULTY" &&
                                    <LessonControlButtons
                                        deleteAssignment={() => {
                                            //FIXME
                                            // alert(`hmm.....Deleting assignment ${assignmentItem.id}, parent ${assignment._id}`)
                                            deleteAssignment(assignment._id, assignmentItem.id)
                                        }}/>}
                            </li>
                        )
                    })}
                </li>
            )
        })
    }, [assignments, cid, currentUser, dispatch])

    useEffect(() => {
        fetchAndSetAssignmentsForCurrentCourse()
    }, [fetchAndSetAssignmentsForCurrentCourse]);

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
                {currentUser && currentUser.role === "FACULTY" && <div style={{height: "38px"}} className="d-flex">
                    <button id="wd-add-assignment-group" className="btn btn-secondary me-1 rounded-1">+ Group
                    </button>
                    <button id="wd-add-assignment"
                            className="btn btn-danger rounded-1"
                            onClick={() => navigate(`/kanbas/courses/${cid}/assignments/${parentOfLastAssignment}/new`)}
                    >+ Assignment
                    </button>
                </div>}
            </div>
            <ul id="wd-assignment-list" className="list-group rounded-0">
                {assignmentItems}
            </ul>
        </div>
    )
}

export default Assignments