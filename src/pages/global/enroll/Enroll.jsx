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
            const firstName = $("#firstName").val();
            const lastName = $("#lastName").val();
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
                firstName,
                lastName,
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
            <form id='form' className='flex-column'>
                <img className="mb-4" src={logo} alt="" width="150" />
                <h1 className="h3 mb-3 fw-normal textWhite">Create your own account</h1>
                <div className='d-flex column-gap-3'>
                    <div className="w-100 form-floating">
                        <input type="text" className="form-control" id="firstName" name='firstName' placeholder="name@example.com" />
                        <label htmlFor="firstName">First Name</label>
                    </div>
                    <div className="w-100 form-floating">
                        <input type="text" className="form-control" id="lastName" name='lastName' placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Last Name</label>
                    </div>
                    <div className="w-100 form-floating">
                        <select id='gender' defaultValue={""} className="form-select form-select-lg" aria-label="Default select example">
                            <option disabled value="">Gender select</option>
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                        </select>
                    </div>
                </div>
                <div className='d-flex column-gap-3'>
                    <div className="form-floating info-input">
                        <input type="email" className="form-control" id="email" name='email' placeholder="name@example.com" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating info-input">
                        <input type="password" className="form-control" id="password" name='password' placeholder="name@example.com" />
                        <label htmlFor="password">Passwords</label>
                    </div>
                </div>
                <div className="w-100 form-floating">
                        <input type="text" className="form-control" id="avatar" name='avatar' placeholder="name@example.com" />
                        <label htmlFor="avatar">Avatar link</label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                <p className="mt-5 mb-3 text-muted textWhite">&copy; 2017–2021</p>
            </form>
        </main>
    );
}
