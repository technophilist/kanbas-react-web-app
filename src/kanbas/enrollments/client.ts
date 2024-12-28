import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`
const axiosWithCredentials = axios.create({withCredentials: true})

const enrollCurrentUserToCourse = async (courseId: string) => {
    const {data} = await axiosWithCredentials.post(ENROLLMENTS_API, {courseId: courseId})
    return data
}

const unenrollCurrentUserFromCourse = async (courseId: string) => {
    const {data} = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${courseId}`)
    return data
}

export {enrollCurrentUserToCourse, unenrollCurrentUserFromCourse}