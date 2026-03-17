import React from 'react'
import { Routes, Route } from 'react-router'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Detail from './Pages/Detail/Detail'
import Create from './Pages/Create/Create'

const RouteConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/create" element={<Create />} />
        </Routes>
    )
}

export default RouteConfig