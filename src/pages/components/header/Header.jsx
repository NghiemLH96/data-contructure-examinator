import React from 'react'
import './header.scss'

export default function Header() {
    return (
        <header>
            <nav className="header-nav">
                <span>Logo</span>
                <ul className="header-nav-account">
                    <li><a id="admin-nav-link" className="nav-btn" href="">For adminstrator</a></li>
                    <li><a className="nav-btn" href="">Log in</a></li>
                    <li><a id="signup-nav-link" className="nav-btn" href="">Sign up</a></li>
                </ul>
            </nav>
        </header>
    )
}
