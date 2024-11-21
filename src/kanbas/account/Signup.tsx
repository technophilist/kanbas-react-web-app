import React, {useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {setCurrentUser} from "./reducer"
import * as client from "./client"

type User = {
    username: string
    password: string
}

function Signup() {
    const [user, setUser] = useState<User>({username: "", password: ""})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const signup = async () => {
        const currentUser = await client.signup(user)
        dispatch(setCurrentUser(currentUser))
        navigate("/kanbas/account/profile")
    }
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input value={user.username} onChange={(e) => setUser({...user, username: e.target.value})}
                   className="wd-username form-control mb-2" placeholder="username"/>
            <input value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} type="password"
                   className="wd-password form-control mb-2" placeholder="password"/>
            <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up
            </button>
            <br/>
            <Link to="/Kanbas/Account/Signin" className="wd-signin-link">Sign in</Link>
        </div>
    )
}

export default Signup