import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'

export default function Global() {
  return (
    <div>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}
