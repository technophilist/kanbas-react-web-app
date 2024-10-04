import {Link, useLocation} from "react-router-dom";
import {useMemo} from "react";

const navLinkItems = [
    {link: "/kanbas/account/signin", label: "Signin"},
    {link: "/kanbas/account/signup", label: "Signup"},
    {link: "/kanbas/account/profile", label: "Profile"},
];

function AccountNavigation() {
    const {pathname} = useLocation()
    const navigationItems = useMemo(() => {

        return navLinkItems.map((navItem) => {
            console.log(`${pathname}, ${navItem.link}, ${pathname.includes(navItem.link)}`)
            return (
                <Link
                    key={navItem.link}
                    to={navItem.link}
                    className={`list-group-item border-0 ${pathname.includes(navItem.link) ? "active" : "text-danger"}`}> {navItem.label}
                </Link>
            )
        })
    }, [pathname])
    return (
        <div id="wd-account-navigation" className="wd-course-home-link list-group fs-5 rounded-0 wd">
            {navigationItems}
        </div>
    );
}

export default AccountNavigation