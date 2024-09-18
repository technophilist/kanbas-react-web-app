import React from "react";

function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"><b>Assignment Name</b></label> <br/>
            <br/>
            <input id="wd-name" value="A1 - ENV + HTML"/><br/><br/>
            <textarea id="wd-description" cols = {6} rows = {5}>The assignment is available online Submit a link to the landing page of your Web application running on Netlify.
                The landing page should include the following:
                Your full name and section Links to each of the
                lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page.      </textarea>
            <br/>
            <table cellSpacing="15">
                <tbody>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100}/>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option value="assignments">ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option value="percentage">Percentage</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td valign="top">
                        <select id="wd-submission-type">
                            <option value="online">Online</option>
                        </select>
                        <p>Online Entry Options</p>
                        <input id="wd-text-entry" type="checkbox"/>
                        <label htmlFor="wd-text-entry">Text Entry</label>
                        <br/>
                        <input id="wd-website-url" type="checkbox"/>
                        <label htmlFor="wd-website-url">Website URL</label>
                        <br/>
                        <input id="wd-media-recordings" type="checkbox"/>
                        <label htmlFor="wd-media-recordings">Media Recordings</label>
                        <br/>
                        <input id="wd-student-annotation" type="checkbox"/>
                        <label htmlFor="wd-student-annotation"> Student Annotation </label>
                        <br/>
                        <input id="wd-file-upload" type="checkbox"/>
                        <label htmlFor="wd-file-upload"> File Uploads </label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        Assign
                    </td>
                    <td valign="top">
                        <label htmlFor="wd-assign-to">Assign to</label> <br/>
                        <input id="wd-assign-to" type="text" value="Everyone"/><br/><br/>
                        <label htmlFor="wd-due-date">Due</label><br/>
                        <input id="wd-due-date" type="date"/><br/><br/>
                        <table>
                            <tbody>
                            <tr>
                                <td valign="top">
                                    <label htmlFor="wd-available-from">Available from</label><br/>
                                    <input id="wd-available-from" type="date"/> <br/><br/>
                                </td>
                                <td valign="top">
                                    <label htmlFor="wd-available-until">Until</label><br/>
                                    <input id="wd-available-until" type="date"/>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="right" colSpan={2}>
                        <hr/>
                        <button>Cancel</button> &nbsp;
                        <button>Save</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AssignmentEditor