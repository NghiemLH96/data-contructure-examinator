import React from 'react'
import $ from 'jquery'
import './Banner.scss'
export default function FnPageBanner() {
    $(document).ready(()=>{
        $(".home-nav-menu-title").fadeIn(2000)
        $(".home-nav-menu-desc").fadeIn(2000)
    })
    return (
        <div className='home-banner-container fnPage'>
            <div className='home-nav-menu'>
                <div className='home-nav-menu-content'>
                    <>
                        <h2 className='home-nav-menu-title'>Exams</h2>
                        <p className='home-nav-menu-desc'>Data Structures: Your Blueprint for Coding!</p>
                    </>
                </div>
            </div>
        </div>
    )
}
