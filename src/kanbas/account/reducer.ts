import {createSlice} from "@reduxjs/toolkit";


export type User = Readonly<{
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
}>
const initialState: { currentUser: User | null } = {
    currentUser: null
}

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export const {setCurrentUser} = accountSlice.actions
export default accountSlice.reducer