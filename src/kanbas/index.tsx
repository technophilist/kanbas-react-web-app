import React from "react";
import Account from "./account";
import {Navigate, Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./courses";


function Kanbas() {
    return (
        <div id="wd-kanbas">
            <table>
                <tbody>
                <tr>
                    <td valign="top">
                        <KanbasNavigation/>
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/" element={<Navigate to="account"/>}/>
                            <Route path="/account/*" element={<Account/>}/>
                            <Route path="/dashboard" element={<Dashboard/>}></Route>
                            <Route path="/courses/:cid/*" element={<Courses/>}/>
                            <Route path="/calendar" element={<h1>Calendar</h1>}/>
                            <Route path="/inbox" element={<h1>Inbox</h1>}/>
                        </Routes>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}


export default Kanbas