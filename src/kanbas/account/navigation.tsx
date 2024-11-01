import {Link, useLocation} from "react-router-dom";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../store";

const signedInNavLinkItems = [
    {link: "/kanbas/account/profile", label: "Profile"}
]

const signedOutNavLinkItems = [
    {link: "/kanbas/account/signin", label: "Signin"},
    {link: "/kanbas/account/signup", label: "Signup"},
]

function AccountNavigation() {
    const {pathname} = useLocation()
    const {currentUser} = useSelector((state: RootState) => state.accountReducer);

    const navigationItems = useMemo(() => {
        return (currentUser ? signedInNavLinkItems : signedOutNavLinkItems)
            .map((navItem) => {
                return (
                    <Link
                        key={navItem.link}
                        to={navItem.link}
                        className={`list-group-item border-0 ${pathname.includes(navItem.link) ? "active" : "text-danger"}`}> {navItem.label}
                    </Link>
                )
            })
    }, [currentUser, pathname])
    return (
        <div id="wd-account-navigation" className="wd-course-home-link list-group fs-5 rounded-0 wd">
            {navigationItems}
        </div>
    );
}

export default AccountNavigation