import "./styles.css"
import Account from "./account"
import {Navigate, Route, Routes} from "react-router-dom"
import Dashboard, {Course} from "./Dashboard"
import Courses from "./courses"
import KanbasNavigation from "./Navigation"
import {useCallback, useEffect, useState} from "react"
import {Provider, useSelector} from "react-redux"
import ProtectedRoute from "./account/ProtectedRoute"
import Session from "./account/Session"
import * as userClient from "./account/client"
import {RootState} from "./store";
import * as courseClient from "./courses/client";

function Kanbas() {
    const {currentUser} = useSelector((state: RootState) => state.accountReducer);
    const [courses, setCourses] = useState<Course[]>([])
    const [course, setCourse] = useState<Course>({
        _id: "1234",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        description: "New Description",
        department: "Department1",
        credits: 3,
        imageFileName: "reactjs.jpg"
    })
    const addNewCourse = useCallback(async () => {
        const newCourse = await userClient.createCourse(course)
        setCourses([...courses, newCourse])
    }, [course, courses])
    const deleteCourse = useCallback(async (courseId: string) => {
        const status = await courseClient.deleteCourse(courseId)
        setCourses(courses.filter(course => course._id !== courseId))
    }, [courses])

    const updateCourse = async () => {
        await courseClient.updateCourse(course)
        setCourses(
            courses.map(c => {
                if (c._id === course._id) return course
                return c
            })
        )
    }
    // const addNewEnrollment = useCallback((userId: string, courseId: string) => {
    //     setEnrollments([...enrollments, {_id: new Date().getTime().toString(), user: userId, course: courseId}])
    // }, [enrollments])
    // const removeEnrollment = useCallback((userId: string, courseId: string) => {
    //     setEnrollments(enrollments.filter((enrollment) => !(enrollment.user === userId && enrollment.course === courseId)))
    // }, [enrollments])

    const fetchCourses = useCallback(async () => {
        let courses: Array<Course> = []
        try {
            courses = await userClient.findMyCourses()
        } catch (error) {
            console.error(error)
        }
        setCourses(courses)
    }, [])

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses, currentUser])

    return (
        <Session>
            <div id="wd-kanbas">
                <KanbasNavigation/>
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="account"/>}/>
                        <Route path="/account/*" element={<Account/>}/>
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard
                                        courses={courses}
                                        enrollments={[]} // TODO
                                        course={course}
                                        setCourse={setCourse}
                                        addNewCourse={addNewCourse} // TODO
                                        deleteCourse={deleteCourse}
                                        updateCourse={updateCourse}
                                        onEnrollButtonClick={() => {}}// TODO
                                        onUnEnrollButtonClick={() => {}} // TODO
                                    />
                                </ProtectedRoute>
                            }>
                        </Route>
                        <Route
                            path="/courses/:cid/*"
                            element={
                                <ProtectedRoute>
                                    <Courses courses={courses}/>
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/calendar" element={<h1>Calendar</h1>}/>
                        <Route path="/inbox" element={<h1>Inbox</h1>}/>
                    </Routes>
                </div>
            </div>
        </Session>
    )
}


export default Kanbas