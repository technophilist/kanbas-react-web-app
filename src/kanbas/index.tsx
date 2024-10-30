import "./styles.css"
import Account from "./account";
import {Navigate, Route, Routes} from "react-router-dom";
import Dashboard, {Course} from "./Dashboard";
import Courses from "./courses";
import KanbasNavigation from "./Navigation";
import dbCourses from "./database/courses.json"
import {useState} from "react";
import store from "./store";
import {Provider} from "react-redux";

function Kanbas() {
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
    const addNewCourse = () => {
        setCourses([...courses, {...course, _id: new Date().getTime().toString()}])
    }
    const deleteCourse = (courseId: any) => {
        setCourses(courses.filter((course) => course._id !== courseId
        ))
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
    };

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
                                <Dashboard
                                    courses={courses}
                                    course={course}
                                    setCourse={setCourse}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse}
                                />
                            }>
                        </Route>
                        <Route
                            path="/courses/:cid/*"
                            element={
                                <Courses courses={courses}/>
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