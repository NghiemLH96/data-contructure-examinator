import React from 'react'
import '../../popup.scss'

export default function UserDetail({ setDetailPopup, currentUser }) {
    return (
        <section className='popup-container'>
            <section className='popup-box'>
                <span className="material-symbols-outlined close-icon" onClick={() => { setDetailPopup(false) }}>
                    close
                </span>
                <section className='popup-box-content'>
                    <h3>Thông tin người dùng</h3>
                    <p><span>ID:</span> {currentUser.id}</p>
                    <div className='popup-box-content-info'>
                        <p><span>Tên:</span> {currentUser.first_name}</p>
                        <p><span>Họ:</span> {currentUser.last_name}</p>
                    </div>
                    <div className='popup-box-content-info'>
                        <p><span>Email:</span> {currentUser.email}</p>
                        <p><span>Giới tính:</span> {currentUser.gender == 1 ? 'Nam' : 'Nữ'}</p>
                    </div>
                    <div className='popup-box-content-info'>
                        <p><span>Trạng thái:</span> {currentUser.active == 1 ? 'Hoạt động' : 'Tạm ngưng'}</p>
                        <p><span>Role:</span> {currentUser.role == 1 ? 'Admin' : 'User'}</p>
                    </div>
                </section>
            </section>
        </section>
    )
}
