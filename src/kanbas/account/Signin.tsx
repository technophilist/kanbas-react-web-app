import {Link} from "react-router-dom";

function Signin() {
    return (
        <div id="wd-signin-screen">
            <h3>Sign in</h3>
            <input id="wd-username" placeholder="username"/> <br/>
            <input id="wd-password" placeholder="password" type="password"/> <br/>
            <Link id="wd-signin-btn"
                  to="/kanbas/dashboard"> Sign in </Link> <br/>
            <Link id="wd-signup-link" to="/kanbas/account/signup">Sign up</Link>
        </div>
    )
}

export default Signin
