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
                <img className="mb-4" src={logo} alt="" width="150" />
                <h1 className="h3 mb-3 fw-normal textWhite">Please sign in</h1>

                <div className="w-100 form-floating">
                    <input type="email" className="form-control" id="floatingInput" name='email' placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="w-100 form-floating">
                    <input type="password" className="form-control" id="floatingPassword" name='password' placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="w-100 checkbox mb-3 text-center">
                    <label className='textWhite'>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted textWhite">&copy; 2017–2021</p>
            </form>
        </main>
    );
}
