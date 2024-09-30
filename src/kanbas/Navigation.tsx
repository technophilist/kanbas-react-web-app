import neuLogo from "../images/neu_logo.png"
import {Link, useLocation} from "react-router-dom";
import {AiOutlineDashboard} from "react-icons/ai";
import {LiaBookSolid} from "react-icons/lia";
import {FaRegCircleUser, FaInbox} from "react-icons/fa6";
import React, {useMemo} from "react";
import {GoGear} from "react-icons/go";
import {BsCalendar4Week} from "react-icons/bs";

function KanbasNavigation() {
    const {pathname} = useLocation()
    const navItems = useMemo(() => {
        return [
            {link: "/kanbas/account", icon: <FaRegCircleUser className="fs-1 text text-white"/>, label: "Account"},
            {link: "/kanbas/dashboard", icon: <AiOutlineDashboard className="fs-1 text-danger"/>, label: "Dashboard"},
            {link: "/kanbas/courses", icon: <LiaBookSolid className="fs-1 text-danger"/>, label: "Courses"},
            {link: "/kanbas/calendar", icon: <BsCalendar4Week className="fs-1 text-danger"/>, label: "Calendar"},
            {link: "/kanbas/inbox", icon: <FaInbox className="fs-1 text-danger"/>, label: "Inbox"},
            {link: "/labs", icon: <GoGear className="fs-1 text-danger"/>, label: "Labs"}

        ]
    }, [])


    return (
        <div id="wd-kanbas-navigation"
             style={{width: 120}}
             className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
            <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank"
               className="list-group-item bg-black border-0 text-center">
                <img src={neuLogo} width="75px"/>
            </a>
            {navItems.map((navItem) => {
                return <Link to={navItem.link} id="wd-account-link"
                             className= {`list-group-item text-center border-0 ${pathname === navItem.link ? "bg-white text-danger" : "bg-black text-white"}`}>
                    {navItem.icon}<br/> {navItem.label}
                </Link>
            })}
            {/*<Link to="/kanbas/account" id="wd-account-link"*/}
            {/*      className="list-group-item text-center border-0 bg-black text-white">*/}
            {/*    <FaRegCircleUser className="fs-1 text text-white"/> <br/> Account*/}
            {/*</Link>*/}

            {/*<Link to="/kanbas/dashboard" id="wd-dashboard-link"*/}
            {/*      className="list-group-item text-center border-0 bg-white text-danger">*/}
            {/*    <AiOutlineDashboard className="fs-1 text-danger"/> <br/> Dashboard</Link>*/}
            {/*<Link to="/kanbas/courses" id="wd-course-link"*/}
            {/*      className="list-group-item text-white bg-black text-center border-0">*/}
            {/*    <LiaBookSolid className="fs-1 text-danger"/> <br/>Courses</Link>*/}

            {/*For these three*/}
            {/*<Link to="/kanbas/calendar" id="wd-calendar-link"*/}
            {/*      className="list-group-item text-white bg-black text-center border-0">*/}
            {/*    <BsCalendar4Week className="fs-1 text-danger"/><br/>Calendar</Link>*/}

            {/*<Link*/}
            {/*    to="/kanbas/inbox"*/}
            {/*    id="wd-inbox-link"*/}
            {/*    className="list-group-item text-white bg-black text-center border-0">*/}
            {/*    <FaInbox className="fs-1 text-danger"/> <br/>Inbox</Link>*/}

            {/*<Link to="/labs" id="wd-labs-link"*/}
            {/*      className="list-group-item text-white bg-black text-center border-0"><GoGear*/}
            {/*    className="fs-1 text-danger"/> <br/>Labs</Link>*/}
        </div>
    );
}

export default KanbasNavigation