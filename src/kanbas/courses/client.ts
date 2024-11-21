import axios from "axios"
import {Course} from "../account/client";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER
const COURSES_API = `${REMOTE_SERVER}/api/courses`
const MODULES_API = `${REMOTE_SERVER}/api/modules`

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

const findModulesForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/modules`)
    return response.data
}
const createModuleForCourse = async (courseId: string, module: { name: string, course: string }) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/modules`, module)
    return response.data
}

export {
    fetchAllCourses,
    deleteCourse,
    updateCourse,
    findModulesForCourse,
    createModuleForCourse,
}