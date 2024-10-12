import {Link} from "react-router-dom";
import React, {useMemo} from "react";
import dbcourses from "./database/courses.json"

function Dashboard() {
    const courses = useMemo(() => dbcourses.map((course) => (
        <div className=
                 "wd-dashboard-course col" style={{width: "300px"}}>
            <div className=
                     "card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark">
                    <img src={process.env.PUBLIC_URL + `/course-images/${course.imageFileName}`}
                         width="100%" height={160}/>
                    <div className="card-body">
                        <h5 className="wd-dashboard-course-title card-title">
                            {course.name} </h5>
                        <p className="wd-dashboard-course-title card-text overflow-y-hidden"
                           style={{maxHeight: 100}}>
                            {course.description} </p>
                        <button className="btn btn-primary">Go</button>
                    </div>
                </Link>
            </div>
        </div>
    )), [])
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>
            <h2 id="wd-dashboard-published">Published Courses ({dbcourses.length})</h2>
            <hr/>
            <div id="wd-dashboard-courses" className="row">
                <div className=
                         "row row-cols-1 row-cols-md-5 g-4">
                    {courses}
                </div>
            </div>
        </div>
    )
}

export default Dashboard