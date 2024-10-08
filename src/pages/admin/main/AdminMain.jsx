import './adminMain.scss'
import $ from 'jquery'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message , Modal } from 'antd'
import { jwtVerify } from 'jose'

export default function AdminMain() {
    const [adminInfo, setAdminInfo] = useState({})
    const navigate = useNavigate();
    const secretKey = new TextEncoder().encode('don tShare')
    const checkLogin = async () => {
        if (localStorage.getItem('token')) {
            const { payload } = await jwtVerify(localStorage.getItem('token'), secretKey)
            if (!payload || payload.result.role != 0) {
                message.error("This page only for admin")
                navigate("/admin-auth")
            } else {
                setAdminInfo(payload.result)
                return
            }
        } else {
            message.error("This page only for admin")
            navigate("/admin-auth")
        }
    }
    useEffect(() => {
        checkLogin();
    }, [])

    useEffect(() => {
        $(".menu-item").click(function () {
            let menuId = $(this).data("menu-id")
            $(`#submenu${menuId}`).slideToggle("fast")
            $(`#sub-menu-arrow-${menuId}`).toggleClass("reverse")
        })
    }, [])

    useEffect(() => {
        console.log(adminInfo);

    }, [adminInfo])

    const handleLogout = () => {
        Modal.confirm({
            title: 'Do you want to log-out?',
            onOk() {
                localStorage.removeItem('token')
                navigate("/admin-auth")
            }
          });
    }

    return (
        <section className="page-container">
            <section className="page-left">
                <section className="menu-container">
                    <section className="logo-box">
                        <h1 className="logo">Logo</h1>
                    </section>
                    <section className="admin-info">
                        <img id="admin-avatar" src={adminInfo.avatar} alt="" />
                        <span id="admin-name">{adminInfo.first_name}</span>
                    </section>
                    <section className="menu-box">
                        <ul className='menu'>
                            <li className='menu-item' data-menu-id="1">Dashboard</li>
                            <li className='menu-item' data-menu-id="2">Management
                                <span id="sub-menu-arrow-2" className="material-symbols-outlined sub-menu-arrow">
                                    keyboard_arrow_up
                                </span>
                            </li>
                            <ul id="submenu2" className="submenu">
                                <li className="submenu-item"><a onClick={() => { navigate("/admin/users") }}>Users List</a></li>
                                <li className="submenu-item"><a onClick={() => { navigate("/admin/questions") }}>Question List</a></li>
                                <li className="submenu-item"><a onClick={() => { navigate("/admin/exams") }}>Exams Manager</a></li>
                            </ul>
                            <li className='menu-item' data-menu-id="4" onClick={handleLogout}>Log out
                                <span className="material-symbols-outlined sub-menu-arrow">
                                    logout
                                </span>
                            </li>
                        </ul>
                    </section>
                </section>
            </section>
            <section className="page-right">
                <Outlet></Outlet>
            </section>
        </section>
    )
}
