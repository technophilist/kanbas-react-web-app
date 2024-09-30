import React from "react";
import Account from "./account";
import {Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./courses";
import KanbasNavigation from "./Navigation";


function Kanbas() {
    return (
        <div id="wd-kanbas">
            <KanbasNavigation/>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="account"/>}/>
                    <Route path="/account/*" element={<Account/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                    <Route path="/courses/:cid/*" element={<Courses/>}/>
                    <Route path="/calendar" element={<h1>Calendar</h1>}/>
                    <Route path="/inbox" element={<h1>Inbox</h1>}/>
                </Routes>
            </div>
        </div>
    )
}


export default Kanbas