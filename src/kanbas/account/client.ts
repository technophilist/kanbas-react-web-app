import axios from "axios"

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER
export const USERS_API = `${REMOTE_SERVER}/api/users`

type UserDTO = {
    username: string
    password: string
    firstName: string
    lastName: string
    dob: string
    email: string
    role: string
}
const axiosWithCredentials = axios.create({withCredentials: true})


const signIn = async (credentials: { username: string, password: string }) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials)
    return response.data
}

const signup = async (user: UserDTO) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user)
    return response.data
}

const updateUser = async (user: UserDTO & { _id: string }) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user)
    return response.data
}

const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`)
    return response.data
}

const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`)
    return response.data
}

export type Course = {
    number: string
    endDate: string
    credits: number
    imageFileName: string
    name: string
    description: string
    _id: string
    department: string
    startDate: string
}

const findMyCourses = async (): Promise<Array<Course>> => {
    const {data} = await axiosWithCredentials.get(`${USERS_API}/current/courses`)
    return data
}

const createCourse = async (course: Course) => {
    const {data} = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course)
    return data
}
export {signIn, signout, signup, updateUser, profile, findMyCourses, createCourse}