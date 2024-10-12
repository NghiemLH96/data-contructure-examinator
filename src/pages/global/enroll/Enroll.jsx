import React, { useEffect } from 'react';
import logo from '../../../assets/logo.png';
import $ from 'jquery';
import { message } from 'antd';
import './enroll.scss';
import { useNavigate } from 'react-router-dom';



export default function Enroll() {
    const navigate = useNavigate();

    $(document).ready(function () {
        $("#form").on("submit",async function (event) {
            event.preventDefault();
            const first_name = $("#firstName").val();
            const last_name = $("#lastName").val();
            const email = $("#email").val();
            const passwords = $("#password").val();
            const gender = $("#gender").val();
            const avatar = $("#avatar").val() ? $("#avatar").val() : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            if (firstName=="" || lastName=="" || email=="" || password=="" || gender=="" ) {
                message.error("Please fill all the fields")
                return;
            }
        
            const doExist = await fetch('http://localhost:3000/users')
            .then(res=>res.json())
            .then(data=>{
                const checkExist = data.find((user)=> user.email == email)
                return checkExist
            })
            if (doExist) {
                message.error("Email already exist")
                return
            }
            if (password.length < 8) {
                message.error("Password must be at least 8 characters")
                return
            }
            const newUser = {
                first_name,
                last_name,
                email,
                passwords,
                avatar,
                active:true,
                role:1, // 1 for user, 2 for admin
                gender: Number(gender),
                exams:[]
            }
    
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
              })
              .then(res => {
                message.success('Create account successfully')
                navigate('/auth')
              })
              .catch(err => {
                message.error('Creat account failed')
                console.log(err);
              })
        })
    })
    return (
        <main className="form-signin">
            <form id='form'>
            <img className="logo" src={logo} alt=""/>
            <h1 className="textWhite formTitle">Tạo tài khoản</h1>
            <div className='input-container-enroll'>
                    <div className="w-100 form-floating">
                        <input type="text" className="inputField" id="firstName" name='firstName' placeholder="Nhập Họ" />
                    </div>
                    <div className="w-100 form-floating">
                        <input type="text" className="inputField" id="lastName" name='lastName' placeholder="Nhập Tên" />
                    </div>
                    <div className="w-100 form-floating">
                        <select id='gender' defaultValue={""} className="selector inputField" aria-label="Default select example">
                            <option disabled value="">Giới tính</option>
                            <option value="0">Nam</option>
                            <option value="1">Nữ</option>
                        </select>
                    </div>
                </div>
                <div className='input-container-enroll'>
                    <div className="info-input">
                        <input type="email" className="inputField" id="email" name='email' placeholder="Email" />
                    </div>
                    <div className="info-input">
                        <input type="password" className="inputField" id="password" name='password' placeholder="Mật khẩu" />
                    </div>
                </div>
                <div className="info-input-avatar">
                        <input type="text" className="inputField" id="avatar" name='avatar' placeholder="Linh avatar" />
                </div>
                <button className="signUp-btn" type="submit">Đăng ký</button>
                <a href="/auth" className='textWhite'>Trở về đăng nhập</a>
            </form>
        </main>
    );
}
