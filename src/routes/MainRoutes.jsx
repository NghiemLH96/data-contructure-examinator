import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Global from '../pages/Global'
import Home from '../pages/home/Home'
import AdminAuth from '../pages/admin/auth/AdminAuth'
import AdminMain from '../pages/admin/main/AdminMain'
import DashBoard from '../pages/admin/dashboard/DashBoard'
import QuestionsManager from '../pages/admin/management/questions/QuesitonsManager'
import UsersManager from '../pages/admin/management/users/UsersManager'
import ExamsManager from '../pages/admin/management/exams/ExamsManager'

export default function MainRoutes() {
  return (
    <Routes>
        <Route path="" element={<Global/>}>
            <Route path='' element={<Home/>}></Route>
        </Route>
        <Route path='/admin-auth' element={<AdminAuth/>}></Route>
        <Route path='/admin/*' element={<AdminMain/>}>
            <Route path='dash-board' element={<DashBoard/>}></Route>
            <Route path='questions' element={<QuestionsManager/>}></Route>
            <Route path='users' element={<UsersManager/>}></Route>
            <Route path='exams' element={<ExamsManager/>}></Route>
        </Route>
    </Routes>
  )
}
