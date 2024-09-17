import {Link} from "react-router-dom";
import courseImage from "../images/reactjs.jpeg"
import {useMemo} from "react";

const courseList = [
    {
        dashboardTitle: "CS1234 React JS",
        courseTitle: "Full Stack software developer",
        imgSrc: courseImage,
        route: "/kanbas/courses/1234/home"
    },
    {
        dashboardTitle: "CS5678 Node JS",
        courseTitle: "Backend Development",
        imgSrc: courseImage,
        route: "/kanbas/courses/5678/home"
    },
    {
        dashboardTitle: "CS9101 Python",
        courseTitle: "Data Science",
        imgSrc: courseImage,
        route: "/kanbas/courses/9101/home"
    },
    {
        dashboardTitle: "CS1121 Java",
        courseTitle: "Enterprise Applications",
        imgSrc: courseImage,
        route: "/kanbas/courses/1121/home"
    },
    {
        dashboardTitle: "CS3141 C++",
        courseTitle: "System Programming",
        imgSrc: courseImage,
        route: "/kanbas/courses/3141/home"
    },
    {
        dashboardTitle: "CS5161 Ruby",
        courseTitle: "Web Development",
        imgSrc: courseImage,
        route: "/kanbas/courses/5161/home"
    },
    {
        dashboardTitle: "CS7181 Go",
        courseTitle: "Concurrent Programming",
        imgSrc: courseImage,
        route: "/kanbas/courses/7181/home"
    },
    {
        dashboardTitle: "CS9201 Swift",
        courseTitle: "iOS Development",
        imgSrc: courseImage,
        route: "/kanbas/courses/9201/home"
    }
]


function Dashboard() {
    const courses = useMemo(() => {
        return courseList.map((course) => {
            return (
                <div className="wd-dashboard-course" key={course.courseTitle + course.dashboardTitle}>
                    <img src={courseImage} width={200}/>
                    <div>
                        <Link className="wd-dashboard-course-link"
                              to={course.route}>{course.dashboardTitle}</Link>
                        <p className="wd-dashboard-course-title">{course.courseTitle}</p>
                        <Link to={course.route}>Go</Link>
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
            <div id="wd-dashboard-courses">{courses}</div>
        </div>
    );
}

export default Dashboard