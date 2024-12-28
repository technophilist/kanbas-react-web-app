// import React, {useState} from "react"
// import {Link, useNavigate} from "react-router-dom"
// import {useDispatch} from "react-redux"
// import {setCurrentUser} from "./reducer"
// import * as client from "./client"
//
// type User = {
//     username: string
//     password: string
// }
//
// function Signup() {
//     const [user, setUser] = useState<User>({username: "", password: ""})
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const signup = async () => {
//         const currentUser = await client.signup(user)
//         dispatch(setCurrentUser(currentUser))
//         navigate("/kanbas/account/profile")
//     }
//     return (
//         <div id="wd-signup-screen">
//             <h3>Sign up</h3>
//             <input value={user.username} onChange={(e) => setUser({...user, username: e.target.value})}
//                    className="wd-username form-control mb-2" placeholder="username"/>
//             <input value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} type="password"
//                    className="wd-password form-control mb-2" placeholder="password"/>
//             <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up
//             </button>
//             <br/>
//             <Link to="/Kanbas/Account/Signin" className="wd-signin-link">Sign in</Link>
//         </div>
//     )
// }
//
// export default Signup
import React, {useCallback, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setCurrentUser} from "./reducer"
import * as client from "./client"

type User = {
    username: string
    password: string
    firstName: string
    lastName: string
    dob: string
    email: string
    role: string
}

function Signup() {
    const [user, setUser] = useState<User>({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        role: "STUDENT"
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signup = useCallback(async () => {
        const currentUser = await client.signup(user)
        dispatch(setCurrentUser(currentUser))
        navigate("/kanbas/account/profile")
    }, [dispatch, navigate, user])
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input value={user.username} onChange={(e) => setUser({...user, username: e.target.value})}
                   className="wd-username form-control mb-2" placeholder="Username"/>
            <input value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}
                   className="wd-email form-control mb-2" placeholder="Email"/>
            <input value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} type="password"
                   className="wd-password form-control mb-2" placeholder="Password"/>
            <input value={user.firstName} onChange={(e) => setUser({...user, firstName: e.target.value})}
                   className="wd-firstname form-control mb-2" placeholder="First Name"/>
            <input value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})}
                   className="wd-lastname form-control mb-2" placeholder="Last Name"/>
            <input value={user.dob} onChange={(e) => setUser({...user, dob: e.target.value})} type="date"
                   className="wd-dob form-control mb-2" placeholder="Date of Birth"/>
            <select value={user.role} onChange={(e) => setUser({...user, role: e.target.value})}
                    className="wd-role form-select mt-2">
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
            </select><br/>
            <button onClick={(e) => {
                e.preventDefault()
                signup()
            }} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up
            </button>
            <br/>
            <Link to="/Kanbas/Account/Signin" className="wd-signin-link">Sign in</Link>
        </div>
    )
}

export default Signup