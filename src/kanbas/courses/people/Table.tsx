import React, {useMemo} from "react";
import {FaUserCircle} from "react-icons/fa";
import dbUsersList from "../../database/users.json"
import dbEnrollmentsList from "../../database/enrollments.json"
import {useParams} from "react-router-dom";


function PeopleTable() {
    const {cid} = useParams()
    const peopleItems = useMemo(() => {
        return dbUsersList
            .filter((user) =>
                dbEnrollmentsList.some((enrollment) => enrollment.user === user._id && enrollment.course === cid)
            ).map((user) => {
                return (
                    <tr key={user._id}>
                        <td className="wd-full-name text-nowrap">
                            <FaUserCircle className="me-2 fs-1 text-secondary"/>
                            <span className="wd-first-name">{user.firstName}</span>{" "}
                            <span className="wd-last-name">{user.lastName}</span>
                        </td>
                        <td className="wd-login-id" valign="middle">{user.loginId}</td>
                        <td className="wd-section" valign="middle">{user.section}</td>
                        <td className="wd-role" valign="middle">{user.role}</td>
                        <td className="wd-last-activity" valign="middle">{user.lastActivity}</td>
                        <td className="wd-total-activity" valign="middle">{user.totalActivity}</td>
                    </tr>
                )
            })
    }, [cid])
    return (
        <div id="wd-people-table">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Login ID</th>
                    <th>Section</th>
                    <th>Role</th>
                    <th>Last Activity</th>
                    <th>Total Activity</th>
                </tr>
                </thead>
                <tbody>
                {peopleItems}
                </tbody>
            </table>
        </div>
    );
}

export default PeopleTable