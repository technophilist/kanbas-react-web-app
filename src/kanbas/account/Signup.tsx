import React from "react";
import {Link} from "react-router-dom";

function Signup() {
    return (
        <div id="wd-signup-screen">
            <h3>Sign up</h3>
            <input placeholder="username"/><br/>
            <input placeholder="password" type="password"/><br/>
            <input placeholder="verify password" type="password"/><br/>
            <Link to="/kanbas/account/profile"> Sign up </Link><br/>
            <Link to="/kanbas/account/signin">Sign in</Link>
        </div>
    );
}

export default Signup