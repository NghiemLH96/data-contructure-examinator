import { useState, useEffect } from 'react';
import { message } from 'antd'; // Ensure you import message
import './Banner.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtVerify } from 'jose';
import $ from 'jquery';
import vmwareLogo from '../../../assets/brands-logo/vmware_black.png';
import stripeLogo from '../../../assets/brands-logo/stripe_black.png';
import pelotonLogo from '../../../assets/brands-logo/peloton_black.png';
import goldmansachsLogo from '../../../assets/brands-logo/goldmansachs_black.png';
import bloombergLogo from '../../../assets/brands-logo/bloomberg_black.png';
import atlassianLogo from '../../../assets/brands-logo/atlassian_black.png';
import linkedinLogo from '../../../assets/brands-logo/linkedin_black.png';
import adobeLogo from '../../../assets/brands-logo/adobe_black.png';

export default function Banner({ title, subTitle }) {
    const navigate = useNavigate();
    const location = useLocation();
    const secretKey = new TextEncoder().encode('don tShare');

    const [pageFn, setPageFn] = useState(location.pathname.split('/')[1]);
    const [checkLoginStatus, setCheckLoginStatus] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem('token-user');
            if (token) {
                try {
                    const checking = await jwtVerify(token, secretKey);
                    if (checking.payload.result) {
                        setCheckLoginStatus(true);
                    }
                } catch (err) {
                    message.error("Token không hợp lệ");
                    navigate("/auth");
                }
            } else {
                setCheckLoginStatus(false);
            }
        };

        checkLogin();
    }, [navigate, secretKey]);
    $(document).ready(()=>{
        $(".home-nav-menu-title").fadeIn(2000)
        $(".home-nav-menu-desc").fadeIn(2000)
    })
    return (
        <div className={pageFn === '' ? 'home-banner-container' : 'home-banner-container fnPage'}>
            <div className='home-nav-menu'>
                <div className='home-nav-menu-content'>
                    {pageFn === '' ? (
                        <>
                            <h2 className='home-nav-menu-title'>Optimize Your Code, Optimize Your Mind!</h2>
                            <p className='home-nav-menu-desc'>We help companies develop the strongest tech teams around. We help candidates sharpen their tech skills and pursue job opportunities.</p>
                            <button id='home-nav-menu-btn' className='home-nav-menu-btn' onClick={() => { navigate("/exams"); }}>Get Started</button>
                            <div className='brands-logo-container'>
                                {[vmwareLogo, stripeLogo, pelotonLogo, goldmansachsLogo, bloombergLogo, atlassianLogo, linkedinLogo, adobeLogo].map((logo, index) => (
                                    <img key={index} className='brand-logo' src={logo} alt={`Brand logo ${index + 1}`} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <h2 className='home-nav-menu-title'>{title}</h2>
                            <p className='home-nav-menu-desc'>{subTitle}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
