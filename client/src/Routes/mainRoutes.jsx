import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Join } from "../Components/Join/Join";
import { Chat } from "../Components/Chat/Chat";
import { useLocation } from "react-router-dom";

export const MainRoutes = () => {
    let data = useLocation();

    return (
        <>
            <Routes>
                <Route path="/" exact element={<Join />} />
                <Route path="/chat" element={<Chat location={data} />} />
                <Route path="*" element={<h1><Link to="/">Invalid Page Return To Home Page</Link></h1>} />
            </Routes>
        </>
    )
}