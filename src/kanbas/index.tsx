import "./styles.css"
import Account from "./account";
import {Navigate, Route, Routes} from "react-router-dom";
import Dashboard, {Course} from "./Dashboard";
import Courses from "./courses";
import KanbasNavigation from "./Navigation";
import dbCourses from "./database/courses.json"
import {useCallback, useState} from "react";
import store from "./store";
import {Provider} from "react-redux";
import ProtectedRoute from "./account/ProtectedRoute";
import dbEnrollments from "../kanbas/database/enrollments.json";

function Kanbas() {
    const [enrollments, setEnrollments] = useState(dbEnrollments);
    const [courses, setCourses] = useState<Course[]>(dbCourses);
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
    });
    const addNewCourse = (userId: string) => {
        const newCourseId = new Date().getTime().toString()
        setCourses([...courses, {...course, _id: newCourseId}])
        setEnrollments([...enrollments, {_id: new Date().getTime().toString(), user: userId, course: newCourseId}])
    }
    const deleteCourse = (courseId: string) => {
        setCourses(courses.filter((course) => course._id !== courseId))
    }
    const updateCourse = () => {
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course
                }
                return c;
            })
        );
    }
    const addNewEnrollment = useCallback((userId: string, courseId: string) => {
        setEnrollments([...enrollments, {_id: new Date().getTime().toString(), user: userId, course: courseId}])
    }, [enrollments])
    const removeEnrollment = useCallback((userId: string, courseId: string) => {
        setEnrollments(enrollments.filter((enrollment) => !(enrollment.user === userId && enrollment.course === courseId)))
    }, [enrollments])
    return (
        <Provider store={store}>
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
                                        enrollments={enrollments}
                                        course={course}
                                        setCourse={setCourse}
                                        addNewCourse={addNewCourse}
                                        deleteCourse={deleteCourse}
                                        updateCourse={updateCourse}
                                        onEnrollButtonClick={addNewEnrollment}
                                        onUnEnrollButtonClick={removeEnrollment}
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
        </Provider>
    )
}


export default Kanbas