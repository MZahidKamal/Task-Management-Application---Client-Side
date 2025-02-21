import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router";
import './index.css'
import MainLayout from "./Layouts/MainLayout.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import SignUpPage from "@/Pages/SignUpPage/SignUpPage.jsx";
import SignInPage from "@/Pages/SignInPage/SignInPage.jsx";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<MainLayout/>}>
                    <Route path={'/'} element={<HomePage/>}></Route>
                    <Route path={'/sign-up'} element={<SignUpPage/>}></Route>
                    <Route path={'/sign-in'} element={<SignInPage/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
