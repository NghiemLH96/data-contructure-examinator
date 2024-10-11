import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/header/Header.jsx'
import Footer from '../components/footer/Footer.jsx'
import './global.scss'

export default function Global() {
  return (
    <div className='page-global'>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
