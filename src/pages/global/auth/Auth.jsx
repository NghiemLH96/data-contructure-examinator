import React, { useEffect } from 'react';
import logo from '../../../assets/logo.png';
import { SignJWT } from 'jose';
import { message } from 'antd';
import './auth.scss';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
    const navigate = useNavigate();
    const secretKey = new TextEncoder().encode('don tShare')
    useEffect(() => {
        const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                const res = await fetch('http://localhost:3000/users');
                const data = await res.json();

                const result = data.find(element => element.email === event.target.email.value);
                if (result) {
                    console.log(result.password);
                    console.log(event.target.password.value);
                    if (result.passwords == event.target.password.value) {
                        const token = await new SignJWT({ result })
                            .setProtectedHeader({ alg: 'HS256' })
                            .setIssuedAt()
                            .sign(secretKey);

                        localStorage.setItem('token-user', token);
                        message.success('Login Success');
                        navigate("/");
                    } else {
                        message.error("Passwords incorrect");
                    }
                } else {
                    message.error("Account does not exist");
                }
            } catch (error) {
                console.error('Error:', error);
                message.error("An error occurred. Please try again later.");
            }
        };

        const form = document.getElementById('form');
        form.addEventListener('submit', handleSubmit);

        return () => {
            form.removeEventListener('submit', handleSubmit);
        };
    }, [navigate]);

    return (
        <main className="form-signin">
            <form id='form'>
                <img className="logo" src={logo} alt="" width="150" />
                <h1 className="formTitle textWhite">Đăng nhập</h1>

                <div className="w-100 form-floating">
                    <input type="email" className='inputField' name='email' placeholder="Nhập địa chỉ email" />
                </div>
                <div className="w-100 form-floating">
                    <input type="password" className='inputField' name='password' placeholder="Nhập mật khẩu" />
                </div>

                <div className="rememberBox">
                    <label className='textWhite'>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                    <a href="" className='textWhite'>Forget passwords</a>
                </div>
                <button type="submit" className='submitBtn'>Đăng nhập</button>
                <a href="/enroll" className='textWhite'>Chưa có tài khoản?</a>
            </form>
        </main>
    );
}
