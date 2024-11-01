import {Link} from "react-router-dom";
import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "./store";
import dbEnrollments from "./database/enrollments.json"

export type Course = Readonly<{
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    description: string;
    imageFileName: string;
}>

type DashboardProps = Readonly<{
    courses: Course[],
    enrollments: { _id: string, user: string, course: string }[]
    course: Course,
    setCourse: (course: Course) => void
    addNewCourse: (userId: string) => void,
    deleteCourse: (courseId: string) => void
    updateCourse: () => void
}>

function Dashboard(props: DashboardProps) {
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)

    const courses = useMemo(() => {
        return props.courses
            .filter((course) => {
                if (currentUser == null) return false
                return props.enrollments.some((enrollment) => {
                    return enrollment.user === currentUser._id && enrollment.course === course._id
                })
            })
            .map((course) => (
                <div className="wd-dashboard-course col" style={{width: "300px"}}>
                    <div className="card rounded-3 overflow-hidden">
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
                                {currentUser && currentUser.role === "FACULTY" && <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        props.deleteCourse(course._id)
                                    }} className="btn btn-danger float-end"
                                    id="wd-delete-course-click">Delete</button>}
                                {currentUser && currentUser.role === "FACULTY" && <button id="wd-edit-course-click"
                                                                                          onClick={(event) => {
                                                                                              event.preventDefault();
                                                                                              props.setCourse(course);
                                                                                          }}
                                                                                          className="btn btn-warning me-2 float-end">
                                    Edit
                                </button>}
                            </div>
                        </Link>
                    </div>
                </div>
            ))
    }, [currentUser, props])
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr/>
            {currentUser && currentUser.role === "FACULTY" && (
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                                id="wd-add-new-course-click"
                                onClick={() => props.addNewCourse(currentUser._id)}> Add </button>
                        <button className="btn btn-warning float-end me-2"
                                onClick={props.updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </h5>

                    <input
                        defaultValue={props.course.name}
                        className="form-control mb-2"
                        value={props.course.name}
                        onChange={(e) => props.setCourse({...props.course, name: e.target.value})}
                    />
                    <textarea
                        defaultValue={props.course.description}
                        className="form-control"
                        value={props.course.description}
                        onChange={(e) => props.setCourse({...props.course, description: e.target.value})}
                    />
                    <hr/>
                </>
            )}
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr/>
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses}
                </div>
            </div>
        </div>
    )
}

export default Dashboard