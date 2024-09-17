import {useMemo} from "react";

const assignments = [
    {
        title: "A1 - ENV + HTML",
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
    },
];

function Assignments() {
    const assignmentListItems = useMemo(() => {
        return assignments.map((assignment) => {
            return (
                <li className="wd-assignment-list-item">
                    <a className="wd-assignment-link"
                       href={assignment.link}>
                        {assignment.title}
                    </a>
                    <p>{assignment.description}</p>
                </li>
            )
        })
    }, [])

    return (
        <div id="wd-assignments">
            <input id="wd-search-assignment"
                   placeholder="Search for Assignments"/>
            <button id="wd-add-assignment-group">+ Group</button>
            <button id="wd-add-assignment">+ Assignment</button>
            <h3 id="wd-assignments-title">
                ASSIGNMENTS 40% of Total <button>+</button>
            </h3>
            <ul id="wd-assignment-list">
                {assignmentListItems}
            </ul>
        </div>
    );
}

export default Assignments