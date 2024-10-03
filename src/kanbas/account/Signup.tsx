import React from "react";
import {Link} from "react-router-dom";

function Signup() {
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input placeholder="username" className="form-control mb-2"/>
            <input placeholder="password" type="password" className="form-control mb-2"/>
            <input placeholder="verify password" type="password" className="form-control mb-2"/><br/>
            <Link to="/kanbas/account/profile"  className="btn btn-primary w-100"> Sign up </Link><br/>
            <Link to="/kanbas/account/signin">Sign in</Link>
        </div>
    );
}

export default Signup