import axios from "axios"
import {Course} from "../account/client";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER
const COURSES_API = `${REMOTE_SERVER}/api/courses`

const fetchAllCourses = async () => {
    const {data} = await axios.get(COURSES_API)
    return data
}

const deleteCourse = async (id: string) => {
    const {data} = await axios.delete(`${COURSES_API}/${id}`)
    return data
}

const updateCourse = async (course: Course) => {
    const {data} = await axios.put(`${COURSES_API}/${course._id}`, course)
    return data
}
export {fetchAllCourses, deleteCourse, updateCourse}