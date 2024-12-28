import {Link, useLocation, useParams} from "react-router-dom";
import {useMemo} from "react";

function CoursesNavigation() {
    const {pathname} = useLocation()
    const {cid} = useParams()
    const navItems = useMemo(() => {
        return [
            {link: `/kanbas/courses/${cid}/home`, label: "Home"},
            {link: `/kanbas/courses/${cid}/modules`, label: "Modules"},
            {link: `/kanbas/courses/${cid}/piazza`, label: "Piazza"},
            {link: `/kanbas/courses/${cid}/zoom`, label: "Zoom"},
            {link: `/kanbas/courses/${cid}/assignments`, label: "Assignments"},
            {link: `/kanbas/courses/${cid}/quizzes`, label: "Quizzes"},
            {link: `/kanbas/courses/${cid}/grades`, label: "Grades"},
            {link: `/kanbas/courses/${cid}/people`, label: "People"}
        ]
    }, [cid])
    const navLinkItems = useMemo(() => {
        return navItems.map((navItem) => {
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
            {navLinkItems}
        </div>);
}

export default CoursesNavigation