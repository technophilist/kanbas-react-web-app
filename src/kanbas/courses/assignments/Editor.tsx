import React, {useCallback, useEffect, useMemo, useState} from "react";
import { MdOutlineCalendarMonth} from "react-icons/md";
import { useNavigate, useParams} from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {AssignmentItem} from "./reducer";
import {addAssignment, updateAssignment} from "./reducer";
import * as client from "./client"


function AssignmentEditor() {
    const {cid, parentAssignmentId, aid} = useParams()
    const navigate = useNavigate()
    const {assignments} = useSelector((state: RootState) => state.assignmentsReducer)
    const dispatch = useDispatch()
    const [assignment, setAssignment] = useState<AssignmentItem>({
        id: aid || uuidv4(),
        link: `#/kanbas/courses/${cid}/assignments/${parentAssignmentId}/${aid}`,
        title: "",
        notAvailableUntil: "2024-05-28",
        due: "2024-05-29",
        totalPoints: ""
    })
    const createNewAssignment = useCallback(async () => {
        if (!parentAssignmentId || !cid) return
        const newAssignment = {
            ...assignment,
            totalPoints: `${assignment.totalPoints} pts`
        }
        await client.createNewAssignment(newAssignment, parentAssignmentId, cid)
        dispatch(addAssignment({newAssignment: newAssignment, parentAssignmentId, cid}))
    }, [assignment, cid, dispatch, parentAssignmentId])

    const updateCurrentAssignment = useCallback(async () => {
        if (!parentAssignmentId || !cid) return
        await client.updateAssignment(assignment, parentAssignmentId, cid)
        dispatch(updateAssignment({updatedAssignment: assignment, parentAssignmentId, cid}))
    }, [assignment, cid, dispatch, parentAssignmentId])

    const [isUpdatingOldAssignment, setIsUpdatingOldAssignment] = useState(false)

    useEffect(() => {
        const listOfAssignmentLists = assignments
            .filter((assignment) => assignment.course === cid)
            .map((assignment) => assignment.assignmentItems)

        for (const assignmentList of listOfAssignmentLists) {
            const assignment = assignmentList.find((assignmentItem) => assignmentItem.id === aid)
            if (assignment) {
                setAssignment(assignment)
                setIsUpdatingOldAssignment(true)
            }
        }
    }, [aid, cid, assignments])

    return (
        <div id="wd-assignments-editor">
            <form className="p-5">
                <label htmlFor="wd-name" className="form-label"><span
                    className="fw-semibold"> Assignment Name </span></label>
                <input
                    id="wd-name"
                    value={assignment.title}
                    className="form-control"
                    onChange={(e) => setAssignment({...assignment, title: e.target.value})}/>
                <p id="wd-description"
                   className="form-text border border-secondary-subtle p-4 rounded-2 fw-semibold mt-3">
                    The assignment is <span className="text-danger">available online</span> <br/><br/>
                    Submit a link to the landing page of your Web application running on
                    Netlify.
                    <span>The landing page should include the following:</span> <br/><br/>
                    <ul>
                        <li>Your full name and section</li>
                        <li>Links to each of the lab assignments</li>
                        <li>Link to the Kanbas application</li>
                        <li>Links to all relevant source code repositories</li>
                    </ul>
                    The Kanbas application should include a link to navigate back to the landing page.
                </p>

                <br/>
                <div className="row p-2">
                    <div className="col-3 d-flex justify-content-end">
                        <label htmlFor="wd-points" className="col-form-label fw-semibold">Points</label>
                    </div>
                    <div className="col-9">
                        <input
                            id="wd-points"
                            className="form-control" value={assignment.totalPoints}
                            onChange={(e) => setAssignment({...assignment, totalPoints: e.target.value})}
                        />
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col-3 d-flex justify-content-end">
                        <label htmlFor="wd-group" className="col-form-label fw-semibold">Assignment Group</label>
                    </div>
                    <div className="col-9">
                        <select id="wd-group" className="form-select">
                            <option value="assignments">ASSIGNMENTS</option>
                        </select>
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col-3 d-flex justify-content-end">
                        <label htmlFor="wd-display-grade-as" className="col-form-label fw-semibold">Display Grade
                            as</label>
                    </div>
                    <div className="col-9">
                        <select id="wd-display-grade-as" className="form-select">
                            <option value="percentage">Percentage</option>
                        </select>
                    </div>
                </div>
                <div className="row p-2">
                    <div className="col-3 d-flex justify-content-end">
                        <label htmlFor="wd-submission-type" className="col-form-label fw-semibold">Submission
                            Type</label>
                    </div>

                    <div className="col-9 p-3 rounded-2 ">
                        <div className="border p-3 rounded-2">
                            <select id="wd-submission-type" className="form-select">
                                <option value="online">Online</option>
                            </select>
                            <p className="fw-bold mt-3">Online Entry Options</p>

                            <div className="d-flex p-1">
                                <input id="wd-text-entry" type="checkbox" className="form-check"/>
                                <label htmlFor="wd-text-entry" className="form-check-label ms-2">Text Entry</label>
                            </div>

                            <div className="d-flex p-1">
                                <input id="wd-website-url" type="checkbox" className="form-check"/>
                                <label htmlFor="wd-website-url" className="form-check-label ms-2">Website URL</label>
                            </div>

                            <div className="d-flex p-1">
                                <input id="wd-media-recordings" type="checkbox" className="form-check me-1"/>
                                <label htmlFor="wd-media-recordings" className="form-check-label ms-2">Media
                                    Recordings</label>
                            </div>

                            <div className="d-flex p-1">
                                <input id="wd-student-annotation" type="checkbox" className="form-check me-1"/>
                                <label htmlFor="wd-student-annotation" className="form-check-label ms-2"> Student
                                    Annotation </label>
                            </div>

                            <div className="d-flex p-1">
                                <input id="wd-file-upload" type="checkbox" className="form-check me-1"/>
                                <label htmlFor="wd-file-upload" className="form-check-label ms-2"> File Uploads </label>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col-3 d-flex justify-content-end"><p
                        className="col-form-label fw-semibold">Assign</p></div>
                    <div className="col-9">
                        <div className="border p-3 rounded-2">
                            <label htmlFor="wd-assign-to" className="form-label fw-semibold">Assign to</label> <br/>
                            <input id="wd-assign-to" type="text" value="Everyone" className="form-control"/>

                            <label htmlFor="wd-due-date" className="form-label fw-semibold mt-3">Due</label><br/>
                            <div className="input-group">
                                <input
                                    id="wd-due-date"
                                    type="date"
                                    value={assignment.due}
                                    onChange={(e) => setAssignment({...assignment, due: e.target.value})}
                                    className="form-control"/>
                                <div className="input-group-append">
                                    <div className="input-group-text rounded-start-0"><MdOutlineCalendarMonth
                                        className="fs-4"/></div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div>
                                    <label htmlFor="wd-available-from" className="form-label fw-semibold mt-3">Available
                                        from</label><br/>
                                    <div className="input-group">
                                        <input id="wd-available-from"
                                               type="date"
                                               value={assignment.notAvailableUntil}
                                               onChange={(e) => setAssignment({
                                                   ...assignment,
                                                   notAvailableUntil: e.target.value
                                               })}
                                               className="form-control"/>
                                        <div className="input-group-append me-2">
                                            <div className="input-group-text rounded-start-0"><MdOutlineCalendarMonth
                                                className="fs-4"/></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="wd-available-until"
                                           className="form-label fw-semibold mt-3">Until</label><br/>
                                    <div className="input-group">
                                        <input id="wd-available-until"
                                               type="date"
                                               value={assignment.due}
                                               onChange={(e) => setAssignment({...assignment, due: e.target.value})}
                                               className="form-control"/>
                                        <div className="input-group-append">
                                            <div className="input-group-text rounded-start-0"><MdOutlineCalendarMonth
                                                className="fs-4"/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="mt-5"/>
                <div className="d-flex justify-content-end">
                    <button
                        className="btn btn-secondary me-2 rounded-1"
                        onClick={() => navigate(`/kanbas/courses/${cid}/assignments`)}
                    >Cancel
                    </button>

                    <button
                        className="btn btn-danger rounded-1"
                        onClick={() => {
                            if (isUpdatingOldAssignment) updateCurrentAssignment()
                            else createNewAssignment()
                            navigate(`/kanbas/courses/${cid}/assignments`)
                        }}
                    > Save
                    </button>

                </div>
            </form>
        </div>
    );
}

export default AssignmentEditor