import React, {useMemo} from "react";
import {FaUserCircle} from "react-icons/fa";

const peopleList = [
    {
        name: {
            first: "Tony",
            last: "Stark",
        },
        icon: <FaUserCircle className="me-2 fs-1 text-secondary"/>,
        loginId: "0012345615",
        section: "S101",
        role: "STUDENT",
        lastActivity: "2020-10-01",
        totalActivity: "10:21:32"
    },
    {
        name: {
            first: "Bruce",
            last: "Wayne",
        },
        icon: <FaUserCircle className="me-2 fs-1 text-secondary"/>,
        loginId: "0012345616",
        section: "S101",
        role: "STUDENT",
        lastActivity: "2020-10-02",
        totalActivity: "12:34:56"
    },
    {
        name: {
            first: "Steve",
            last: "Rogers",
        },
        icon: <FaUserCircle className="me-2 fs-1 text-secondary"/>,
        loginId: "0012345617",
        section: "S101",
        role: "STUDENT",
        lastActivity: "2020-10-03",
        totalActivity: "14:23:45"
    },
    {
        name: {
            first: "Natasha",
            last: "Romanoff",
        },
        icon: <FaUserCircle className="me-2 fs-1 text-secondary"/>,
        loginId: "0012345618",
        section: "S101",
        role: "STUDENT",
        lastActivity: "2020-10-04",
        totalActivity: "16:45:12"
    },
    {
        name: {
            first: "Thor",
            last: "Odinson",
        },
        icon: <FaUserCircle className="me-2 fs-1 text-secondary"/>,
        loginId: "0012345619",
        section: "S101",
        role: "STUDENT",
        lastActivity: "2020-10-05",
        totalActivity: "18:12:34"
    },
    {
        name: {
            first: "Bruce",
            last: "Banner",
        },
        icon: <FaUserCircle className="me-2 fs-1 text-secondary"/>,
        loginId: "0012345620",
        section: "S101",
        role: "STUDENT",
        lastActivity: "2020-10-06",
        totalActivity: "20:34:56"
    }
]

function PeopleTable() {
    const peopleItems = useMemo(() => {
        return peopleList.map((person) => {
            return (
                <tr key={person.loginId}>
                    <td className="wd-full-name text-nowrap">
                        {person.icon}
                        <span className="wd-first-name">{person.name.first}</span>{" "}
                        <span className="wd-last-name">{person.name.last}</span>
                    </td>
                    <td className="wd-login-id" valign="middle">{person.loginId}</td>
                    <td className="wd-section" valign="middle">{person.section}</td>
                    <td className="wd-role" valign="middle">{person.role}</td>
                    <td className="wd-last-activity" valign="middle">{person.lastActivity}</td>
                    <td className="wd-total-activity" valign="middle">{person.totalActivity}</td>
                </tr>
            )
        })
    }, [])
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