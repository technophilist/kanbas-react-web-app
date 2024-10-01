import {Link} from "react-router-dom";
import courseImage from "../images/reactjs.jpeg"
import React, {useMemo} from "react";
import {SlNote} from "react-icons/sl";
import {FaEdit} from "react-icons/fa";

const courseList = [
    {
        id: "1",
        title: "CS4550 12631 Web Development",
        subtitle: "CS4550.12631.202410",
        yearAndSection: "202410_1 Fall 2023 Semester Full Term",
        imgSrc: courseImage,
        route: "/kanbas/courses/1234/home"
    },
    {
        id: "2",
        title: "CS3200 12632 Database Design",
        subtitle: "CS3200.12632.202410",
        yearAndSection: "202410_2 Fall 2023 Semester Full Term",
        imgSrc: courseImage,
        route: "/kanbas/courses/1235/home"
    },
    {
        id: "3",
        title: "CS4500 12633 Software Development",
        subtitle: "CS4500.12633.202410",
        yearAndSection: "202410_3 Fall 2023 Semester Full Term",
        imgSrc: courseImage,
        route: "/kanbas/courses/1236/home"
    },
    {
        id: "4",
        title: "CS5600 12634 Computer Systems",
        subtitle: "CS5600.12634.202410",
        yearAndSection: "202410_4 Fall 2023 Semester Full Term",
        imgSrc: courseImage,
        route: "/kanbas/courses/1237/home"
    },
    {
        id: "5",
        title: "CS5800 12635 Algorithms",
        subtitle: "CS5800.12635.202410",
        yearAndSection: "202410_5 Fall 2023 Semester Full Term",
        imgSrc: courseImage,
        route: "/kanbas/courses/1238/home"
    },
    {
        id: "6",
        title: "CS6200 12636 Information Retrieval",
        subtitle: "CS6200.12636.202410",
        yearAndSection: "202410_6 Fall 2023 Semester Full Term",
        imgSrc: courseImage,
        route: "/kanbas/courses/1239/home"
    },
    {
        id: "7",
        title: "CS6650 12637 Distributed Systems",
        subtitle: "CS6650.12637.202410",
        yearAndSection: "202410_7 Fall 2023 Semester Full Term",
        imgSrc: courseImage,
        route: "/kanbas/courses/1240/home"
    }
]

function Dashboard() {
    const courses = useMemo(() => {
        return courseList.map((course) => {
            return (
                <div className="wd-dashboard-course col"
                     style={{width: "300px"}}
                     key={course.id}>
                    <div className="card rounded-3 overflow-hidden">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                              to={course.route}>
                            <img src={courseImage} width="100%" height={160}/>
                            <div className="card-body">
                                <h6 className="wd-dashboard-course-title card-title text-truncate fw-semibold m-0"
                                    style={{color: "#0076B8"}}>{course.title}</h6>
                                <h6 className="wd-dashboard-course-title card-text text-secondary m-0">{course.subtitle}</h6>
                                <h6 className="text-truncate text-secondary">{course.yearAndSection}</h6>
                                {/*<button className="btn btn-primary"> </button>*/}
                                <SlNote/>
                            </div>
                        </Link>
                    </div>
                </div>
            )
        })
    }, [])

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>
            <h2 id="wd-dashboard-published">Published Courses (12)</h2>
            <hr/>
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses}
                </div>
            </div>
        </div>
    );
}

export default Dashboard