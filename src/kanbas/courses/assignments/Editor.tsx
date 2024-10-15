import React, {useMemo} from "react";
import {MdAddIcCall, MdOutlineCalendarMonth} from "react-icons/md";
import {Link, useParams} from "react-router-dom";
import dbAssignments from "../../database/assignments.json"

function AssignmentEditor() {
    const {cid, aid} = useParams()
    const assignment = useMemo(() => {
        const listOfAssignmentLists = dbAssignments
            .filter((assignment) => assignment.course === cid)
            .map((assignment) => assignment.assignmentItems)

        for (const assignmentList of listOfAssignmentLists) {
            const assignment = assignmentList.find((assignmentItem) => assignmentItem.id === aid)
            if (assignment) return assignment
        }
        return undefined
    }, [aid, cid])
    const dueDateString = useMemo(() => {
        if (!assignment) return ""
        const date = new Date(`${assignment.due.substring(0, 6)}, 2024`);
        return date.toISOString().slice(0, 10);
    }, [assignment])

    const availableFromDateString = useMemo(() => {
        if (!assignment) return ""
        const date = new Date(`${assignment.notAvailableUntil.substring(0, 6)}, 2024`);
        return date.toISOString().slice(0, 10);
    }, [assignment])


    if (!assignment) return <h1>An error occurred, please try again</h1>

    return (
        <div id="wd-assignments-editor">
            <form className="p-5">
                <label htmlFor="wd-name" className="form-label"><span
                    className="fw-semibold"> Assignment Name </span></label>
                <input id="wd-name" value={assignment.title} className="form-control"/>
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
                        <input id="wd-points" className="form-control" value={100}/>
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
                                <input id="wd-due-date" type="date" value={dueDateString} className="form-control"/>
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
                                        <input id="wd-available-from" type="date" value={availableFromDateString}
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
                                        <input id="wd-available-until" type="date" value={dueDateString}
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
                    <Link to={`/kanbas/courses/${cid}/assignments`}>
                        <button className="btn btn-secondary me-2 rounded-1">Cancel</button>
                    </Link>
                    <Link to={`/kanbas/courses/${cid}/assignments`}>
                        <button className="btn btn-danger rounded-1">Save</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default AssignmentEditor