import React from 'react'
import $ from 'jquery'
import './Banner.scss'
export default function ExamsPageBanner() {
    $(document).ready(()=>{
        $(".home-nav-menu-title").fadeIn(1000)
        $(".home-nav-menu-desc").fadeIn(1000)
    })
    return (
        <div className='home-banner-container fnPage'>
            <div className='home-nav-menu'>
                <div className='home-nav-menu-content'>
                    <>
                        <h2 className='home-nav-menu-title'>Danh sách bài thi</h2>
                        <p className='home-nav-menu-desc'>Cấu trúc dữ liệu: Bản thiết kế cho việc lập trình của bạn!</p>
                    </>
                </div>
            </div>
        </div>
    )
}
