import React from 'react';
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
                    <Route path="/" element={<Navigate to="/kanbas"/>}/>
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
