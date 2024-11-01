import Signin from "./Signin";
import {Navigate, Route, Routes} from "react-router-dom";
import React from "react";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./navigation";
import {RootState} from "../store";
import {useSelector} from "react-redux";

function Account() {
    const {currentUser} = useSelector((state: RootState) => state.accountReducer);
    return (
        <div id="wd-account-screen">
            <table>
                <tbody>
                <tr>
                    <td valign="top">
                        <AccountNavigation/>
                    </td>
                    <td valign="top">
                        {/*Similar to <Outlet/> in new react v6 Api*/}
                        <Routes>
                            <Route path="/"
                                   element={currentUser ? <Navigate to="profile"/> : <Navigate to="signin"/>}/>
                            <Route path="/signin" element={<Signin/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/signup" element={<Signup/>}/>
                        </Routes>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Account