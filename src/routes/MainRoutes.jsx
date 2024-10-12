import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Global from '../pages/global/Global'
import Home from '../pages/global/home/Home'
import AdminAuth from '../pages/admin/auth/AdminAuth'
import AdminMain from '../pages/admin/main/AdminMain'
import DashBoard from '../pages/admin/dashboard/DashBoard'
import QuestionsManager from '../pages/admin/management/questions/QuesitonsManager'
import UsersManager from '../pages/admin/management/users/UsersManager'
import ExamsManager from '../pages/admin/management/exams/ExamsManager'
import ExamsList from '../pages/global/exams/ExamsList'
import Auth from '../pages/global/auth/Auth'
import Enroll from '../pages/global/enroll/Enroll'
import TestingPage from '../pages/global/testing/TestingPage'
import HistoryExam from '../pages/global/history/HistoryExam'

export default function MainRoutes() {
  return (
    <Routes>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/enroll' element={<Enroll/>}></Route>
        <Route path="/" element={<Global/>}>
            <Route path='' element={<Home/>}></Route>
            <Route path='exams' element={<ExamsList/>}></Route>
            <Route path='exams/:id' element={<TestingPage/>}></Route>
            <Route path='history' element={<HistoryExam/>}></Route>
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
