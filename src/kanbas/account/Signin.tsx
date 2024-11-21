import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import * as client from "./client"
import {setCurrentUser} from "./reducer";

function Signin() {
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signin = async () => {
        const user = await client.signIn(credentials)
        if (!user) return;
        dispatch(setCurrentUser(user))
        navigate("/kanbas/dashboard")
    }
    return (
        <div id="wd-signin-screen">
            <h3>Sign in</h3>
            <input
                id="wd-username"
                placeholder="username"
                className="form-control mb-2"
                defaultValue={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
            <input
                id="wd-password"
                placeholder="password"
                type="password"
                className="form-control mb-2"
                defaultValue={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
            <button
                id="wd-signin-btn"
                className="btn btn-primary w-100"
                onClick={signin}
            > Sign in
            </button>
            <Link id="wd-signup-link" to="/kanbas/account/signup">Sign up</Link>
        </div>
    )
}

export default Signin
