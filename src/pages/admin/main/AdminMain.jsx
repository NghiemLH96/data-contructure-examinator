import './adminMain.scss'
import $ from 'jquery'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { message , Modal } from 'antd'
import { jwtVerify } from 'jose'
import logo from '../../../assets/logo.png'

export default function AdminMain() {
    const [adminInfo, setAdminInfo] = useState({})
    const navigate = useNavigate();
    const secretKey = new TextEncoder().encode('don tShare')
    const checkLogin = async () => {
        const token = localStorage.getItem('token-admin');
        if (token) {
            try {
                const { payload } = await jwtVerify(token, secretKey);
                if (!payload || payload.result.role !== 0) {
                    message.error("This page is only for admins");
                    navigate("/admin-auth");
                } else {
                    setAdminInfo(payload.result);
                }
            } catch (error) {
                console.error("JWT verification error:", error);
                message.error("Invalid token. Please log in again.");
                navigate("/admin-auth");
            }
        } else {
            message.error("This page is only for admins");
            navigate("/admin-auth");
        }
    };

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

    const handleLogout = () => {
        Modal.confirm({
            title: 'Bạn chắc chắn muốn đăng xuất chứ?',
            onOk() {
                localStorage.removeItem('token-admin')
                navigate("/admin-auth")
            },
            okText: 'Đồng ý',
            cancelText: 'Hủy',
          });
    }

    return (
        <section className="page-container-admin">
            <section className="page-left">
                <section className="menu-container">
                    <section className="logo-box">
                        <img id='logo' onClick={()=>{navigate("/admin/dash-board")}} src={logo} alt="" />
                    </section>
                    <section className="admin-info">
                        <img id="admin-avatar" src={adminInfo.avatar} alt="" />
                        <span id="admin-name">{adminInfo.first_name}</span>
                    </section>
                    <section className="menu-box">
                        <ul className='menu'>
                            <li className='menu-item' data-menu-id="1" onClick={() => { navigate("/admin/dash-board") }}>Bảng điều khiển</li>
                            <li className='menu-item' data-menu-id="2">Quản lý
                                <span id="sub-menu-arrow-2" className="material-symbols-outlined sub-menu-arrow">
                                    keyboard_arrow_up
                                </span>
                            </li>
                            <ul id="submenu2" className="submenu">
                                <li className="submenu-item"><a onClick={() => { navigate("/admin/users") }}>Quản lý người dùng</a></li>
                                <li className="submenu-item"><a onClick={() => { navigate("/admin/questions") }}>Quản lý câu hỏi</a></li>
                                <li className="submenu-item"><a onClick={() => { navigate("/admin/exams") }}>Quản lý bài thi</a></li>
                            </ul>
                            <li className='menu-item' data-menu-id="4" onClick={handleLogout}>Đăng xuất
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
