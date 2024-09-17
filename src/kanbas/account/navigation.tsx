import {Link} from "react-router-dom";

function AccountNavigation() {
    return (
        <div id="wd-account-navigation">
            <Link to={`/kanbas/account/signin`}> Signin </Link> <br/>
            <Link to={`/kanbas/account/signup`}> Signup </Link> <br/>
            <Link to={`/kanbas/account/profile`}> Profile </Link> <br/>
        </div>
    );
}

export default AccountNavigation