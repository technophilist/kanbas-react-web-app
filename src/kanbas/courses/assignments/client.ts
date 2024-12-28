import axios from "axios";
import {AssignmentItem} from "./reducer";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`

const fetchAllAssignmentsForCourse = async (cid: string): Promise<AssignmentItem[]> => {
    const {data} = await axios.get(`${ASSIGNMENTS_API}/${cid}`)
    return data
}

const createNewAssignment = async (newAssignment: AssignmentItem, parentAssignmentId: string, courseId: string) => {
    const {data} = await axios.post(`${ASSIGNMENTS_API}/new`, {
        newAssignment,
        parentAssignmentId,
        courseId
    })
    return data
}

const updateAssignment = async (updatedAssignment: AssignmentItem, parentAssignmentId: string, courseId: string) => {
    const {data} = await axios.put(`${ASSIGNMENTS_API}/${parentAssignmentId}`, {
        updatedAssignment: updatedAssignment,
        courseId: courseId
    })
    return data
}

const deleteAssignment = async (parentAssignmentId: string, assignmentId: string, courseId: string) => {
    const {data} = await axios.delete(`${ASSIGNMENTS_API}/${parentAssignmentId}/${assignmentId}/${courseId}`)
    return data
}

export {fetchAllAssignmentsForCourse, createNewAssignment, deleteAssignment, updateAssignment}