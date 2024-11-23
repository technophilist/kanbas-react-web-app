import {Link, useNavigate} from "react-router-dom";
import React, {useCallback, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "./store";

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
    allCourses: Course[],
    enrolledCourses: Course[],
    course: Course,
    setCourse: (course: Course) => void
    addNewCourse: () => void
    deleteCourse: (courseId: string) => void
    updateCourse: () => void
    onEnrollButtonClick: (userId: string, courseId: string) => void
    onUnEnrollButtonClick: (userId: string, courseId: string) => void
}>

type CourseItemProps = Readonly<{
    course: Course,
    isEnrolled: boolean,
    isFaculty: boolean,
    onUnenrollCourseButtonClick: (courseId: string) => void
    onDeleteCourseButtonClick: (courseId: string) => void
    onEnrollCourseButtonClick: (courseId: string) => void
    setCourse: (course: Course) => void
}>

function CourseItem(props: CourseItemProps) {
    const navigate = useNavigate()
    const enrollmentButtons = useMemo(() => {
        return props.isEnrolled ? (<button
            onClick={() => props.onUnenrollCourseButtonClick(props.course._id)}
            className="btn btn-danger float-end"
            id="wd-delete-course-click">Unenroll</button>) : (<button
            onClick={() => props.onEnrollCourseButtonClick(props.course._id)}
            className="btn btn-success float-end">Enroll</button>)
    }, [props])
    return (<div className="wd-dashboard-course col" style={{width: "300px"}}>
        <div className="card rounded-3 overflow-hidden">
            <img src={process.env.PUBLIC_URL + `/course-images/${props.course.imageFileName}`}
                 width="100%" height={160}/>
            <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    {props.course.name} </h5>
                <p className="wd-dashboard-course-title card-text overflow-y-hidden"
                   style={{maxHeight: 100}}>
                    {props.course.description} </p>
                {props.isEnrolled && <button className="btn btn-primary"
                                             onClick={() => navigate(`/kanbas/courses/${props.course._id}/home`)}>Go
                </button>}
                {!props.isFaculty && enrollmentButtons}
                {props.isFaculty && <button
                    onClick={(event) => {
                        event.preventDefault();
                        props.onDeleteCourseButtonClick(props.course._id)
                    }} className="btn btn-danger float-end"
                    id="wd-delete-course-click">Delete</button>}
                {props.isFaculty && <button id="wd-edit-course-click"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                props.setCourse(props.course);
                                            }}
                                            className="btn btn-warning me-2 float-end">
                    Edit
                </button>}
            </div>
        </div>
    </div>)
}

function Dashboard(props: DashboardProps) {
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)
    const isFaculty = useMemo(() => currentUser ? currentUser.role === "FACULTY" : false, [currentUser])
    const enrolledCourseItems = useMemo(() => {
        return props.enrolledCourses
            .map((course) => (
                <CourseItem
                    key={course._id}
                    course={course}
                    isEnrolled={true}
                    isFaculty={isFaculty}
                    onUnenrollCourseButtonClick={() => {
                        if (currentUser == null) return
                        props.onUnEnrollButtonClick(currentUser._id, course._id)
                    }}
                    onDeleteCourseButtonClick={props.deleteCourse}
                    onEnrollCourseButtonClick={() => {
                        if (currentUser == null) return
                        props.onEnrollButtonClick(currentUser._id, course._id)
                    }}
                    setCourse={props.setCourse}/>
            ))
    }, [currentUser, isFaculty, props])
    const enrolledCourseIds = useMemo(() => {
        return props.enrolledCourses.map(course => course._id)
    }, [props.enrolledCourses])
    const notEnrolledCourseItems = useMemo(() => {
        return props.allCourses
            .filter(course => !enrolledCourseIds.includes(course._id))
            .map((course) => (
                <CourseItem
                    key={course._id}
                    course={course}
                    isEnrolled={false}
                    isFaculty={isFaculty}
                    onUnenrollCourseButtonClick={() => {
                        if (currentUser == null) return
                        props.onUnEnrollButtonClick(currentUser._id, course._id)
                    }}
                    onEnrollCourseButtonClick={() => {
                        if (currentUser == null) return
                        props.onEnrollButtonClick(currentUser._id, course._id)
                    }}
                    onDeleteCourseButtonClick={props.deleteCourse}
                    setCourse={props.setCourse}/>
            ))
    }, [currentUser, isFaculty, props])
    const [isCurrentlyDisplayingAllCourses, setIsCurrentlyDisplayingAllCourses] = useState(false)
    const coursesTypeButton = useMemo(() => {
        if (isCurrentlyDisplayingAllCourses) {
            return (
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        setIsCurrentlyDisplayingAllCourses(false)
                    }}
                >Display only enrolled courses</button>
            )
        }
        return (
            <button
                className="btn btn-primary"
                onClick={() => {
                    setIsCurrentlyDisplayingAllCourses(true)
                }}
            >Display all courses</button>)
    }, [isCurrentlyDisplayingAllCourses])

    return (
        <div id="wd-dashboard">
            <div className="d-flex justify-content-between">
                <h1 id="wd-dashboard-title">Dashboard</h1>
                {!isFaculty && coursesTypeButton}
            </div>
            <hr/>
            {currentUser && isFaculty && (
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                                id="wd-add-new-course-click"
                                onClick={() => props.addNewCourse()}> Add </button>
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
            <h2 id="wd-dashboard-published">Published Courses ({enrolledCourseItems.length})</h2>
            <hr/>
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {enrolledCourseItems}
                    {!isFaculty && isCurrentlyDisplayingAllCourses && notEnrolledCourseItems}
                </div>
            </div>
        </div>
    )
}

export default Dashboard