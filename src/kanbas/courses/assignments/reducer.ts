import dbAssignments from "../../database/assignments.json"
import {createSlice} from "@reduxjs/toolkit";

export type AssignmentItem = {
    id: string;
    link: string;
    title: string;
    notAvailableUntil: string;
    due: string;
    totalPoints: string;
}

type Assignment = {
    _id: string;
    title: string;
    course: string;
    assignmentItems: AssignmentItem[];
}

const initialState: { assignments: Assignment[] } = {
    assignments: dbAssignments
}

const assignmentsReducer = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            const {newAssignment, parentAssignmentId, cid} = action.payload
            for (const assignment of state.assignments) {
                if (assignment._id !== parentAssignmentId || assignment.course !== cid) continue
                assignment.assignmentItems.push(newAssignment)
            }
        },
        updateAssignment: (state, action) => {
            const {updatedAssignment, parentAssignmentId, cid} = action.payload
            for (const assignment of state.assignments) {
                if (assignment._id !== parentAssignmentId || assignment.course !== cid) continue
                for (const assignmentItem of assignment.assignmentItems) {
                    if (assignmentItem.id === updatedAssignment.id) {
                        assignmentItem.link = updatedAssignment.link
                        assignmentItem.title = updatedAssignment.title
                        assignmentItem.notAvailableUntil = updatedAssignment.notAvailableUntil
                        assignmentItem.due = updatedAssignment.due
                        assignmentItem.totalPoints = updatedAssignment.totalPoints
                    }
                }
            }
        },
        deleteAssignment: (state, action) => {
            const {assignmentId, parentAssignmentId, cid} = action.payload
            for (const assignment of state.assignments) {
                if (assignment._id !== parentAssignmentId || assignment.course !== cid) continue;
                assignment.assignmentItems = assignment.assignmentItems.filter(item => item.id !== assignmentId);
            }
        }
    }
})

export default assignmentsReducer.reducer
export const {addAssignment, updateAssignment, deleteAssignment} = assignmentsReducer.actions