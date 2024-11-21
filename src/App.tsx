import React from 'react';
import Labs from "./labs"
import './App.css';
import Kanbas from "./kanbas";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import {Provider, useSelector} from "react-redux"
import store from "./kanbas/store"


function App() {

    return (
        <HashRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="labs"/>}/>
                    <Route path="/labs/*" element={<Labs/>}/>
                    <Route path="/kanbas/*" element={
                        <Provider store={store}>
                            <Kanbas/>
                        </Provider>
                    }/>
                </Routes>
            </div>
        </HashRouter>
    )
}

export default App;
