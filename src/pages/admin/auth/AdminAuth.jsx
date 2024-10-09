import React from 'react'
import './adminAuth.scss'
import { SignJWT, jwtVerify } from 'jose'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function AdminAuth() {
    const navigate = useNavigate();
    const secretKey = new TextEncoder().encode('don tShare')
    const checkLogin = async() => {
        if (localStorage.getItem('token')) {
            const {payload} = await jwtVerify(localStorage.getItem('token'), secretKey)
            .then(res => {
                if (payload.result.role === 0) {
                    navigate("/admin/dash-board")
                }else{
                    return
                }
            })
            .catch(err => {
                message.error("Token không hợp lệ")
                localStorage.removeItem('token')
            })
        }
    }
    checkLogin()

    const handleLogin = async (e) => {
        e.preventDefault();


        await fetch("http://localhost:3000/users")
            .then(res => res.json())
            .then(async data => {
                const result = data.find(user => user.email == e.target.email.value)
                if (result) {
                    if (result.passwords == e.target.password.value) {
                        const token = await new SignJWT({ result })
                            .setProtectedHeader({ alg: 'HS256' })
                            .setIssuedAt()
                            .setExpirationTime('2h')
                            .sign(secretKey);
                        localStorage.setItem('token', token)
                        message.success('Login Success')
                        navigate("/admin/dash-board")
                    } else {
                        message.error("Passwords incorrect")
                    }
                } else {
                    message.error("Account was not existed")
                }
            })
            .catch(err =>
                console.log(err)
            )
    }
    return (
        <section className="ad-auth-bg">
            <section className="ad-auth-bg-left">
                <section className="auth-box">
                    <section className="hr-header-box">
                        <h2 className="hr-title">Welcome Back! <br />
                            Login to your account</h2>
                        <h4 className="hr-sub-title">It's nice to see you again. Ready to code?</h4>
                    </section>
                    <form action="" onSubmit={(e) => { handleLogin(e) }}>
                        <input id="admin-auth-acc" className="auth-input" name='email' type="email" placeholder="Enter your admin account" />
                        <input id="admin-auth-pw" className="auth-input" name='password' type="text" placeholder="Enter you passwords" />
                        <button id="admin-login-btn" type='submit'>Log in</button>
                        <section id="forget-pw-box">
                            <div id="remember-box">
                                <input type="checkbox" /><label htmlFor="remember-me">Remember me</label>
                            </div>
                            <a href="">Forget passwords</a>
                        </section>
                    </form>
                </section>
            </section>
        </section>
    )
}
