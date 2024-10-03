import {Link, useLocation} from "react-router-dom";
import {useMemo} from "react";

const navLinkItems = [
    {link: "/kanbas/courses/1234/home", label: "Home"},
    {link: "/kanbas/courses/1234/modules", label: "Modules"},
    {link: "/kanbas/courses/1234/piazza", label: "Piazza"},
    {link: "/kanbas/courses/1234/zoom", label: "Zoom"},
    {link: "/kanbas/courses/1234/assignments", label: "Assignments"},
    {link: "/kanbas/courses/1234/quizzes", label: "Quizzes"},
    {link: "/kanbas/courses/1234/grades", label: "Grades"},
    {link: "/kanbas/courses/1234/people", label: "People"}
];

function CoursesNavigation() {
    const {pathname} = useLocation()
    const navigationItems = useMemo(() => {
        return navLinkItems.map((navItem) => {
            return (
                <Link id="wd-course-home-link"
                      key={navItem.link}
                      to={navItem.link}
                      className={`list-group-item border-0 ${pathname === navItem.link ? "active" : "text-danger"}`}>{navItem.label}</Link>
            )
        })
    }, [pathname])
    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {navigationItems}
        </div>);
}

export default CoursesNavigation