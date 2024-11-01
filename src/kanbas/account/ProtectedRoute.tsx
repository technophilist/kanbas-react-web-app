import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Navigate} from "react-router-dom";
import React from "react";

type ProtectedRouteProps = {
    children: React.ReactNode
}

function ProtectedRoute(props: ProtectedRouteProps) {
    const {currentUser} = useSelector((state: RootState) => state.accountReducer)
    if (currentUser) return <>{props.children}</>
    return <Navigate to="/kanbas/account/signin"/>
}

export default ProtectedRoute;