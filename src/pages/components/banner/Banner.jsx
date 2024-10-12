import { useState } from 'react';
import './Banner.scss';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import vmwareLogo from '../../../assets/brands-logo/vmware_black.png';
import stripeLogo from '../../../assets/brands-logo/stripe_black.png';
import pelotonLogo from '../../../assets/brands-logo/peloton_black.png';
import goldmansachsLogo from '../../../assets/brands-logo/goldmansachs_black.png';
import bloombergLogo from '../../../assets/brands-logo/bloomberg_black.png';
import atlassianLogo from '../../../assets/brands-logo/atlassian_black.png';
import linkedinLogo from '../../../assets/brands-logo/linkedin_black.png';
import adobeLogo from '../../../assets/brands-logo/adobe_black.png';

export default function Banner() {
    const navigate = useNavigate();

    const [pageFn, setPageFn] = useState(location.pathname.split('/')[1]);

    $(document).ready(() => {
        $(".home-nav-menu-title").fadeIn(1000)
        $(".home-nav-menu-desc").fadeIn(1000)
    })
    return (
        <div className={pageFn === '' ? 'home-banner-container' : 'home-banner-container fnPage'}>
            <div className='home-nav-menu'>
                <div className='home-nav-menu-content'>
                    <>
                        <h2 className='home-nav-menu-title'>Optimize Your Code, Optimize Your Mind!</h2>
                        <p className='home-nav-menu-desc'>Chúng tôi giúp các công ty phát triển đội ngũ công nghệ mạnh nhất. Chúng tôi giúp các ứng viên nâng cao kỹ năng công nghệ và theo đuổi các cơ hội việc làm.</p>
                        <button id='home-nav-menu-btn' className='home-nav-menu-btn' onClick={() => { navigate("/exams"); }}>Bắt đầu</button>
                        <div className='brands-logo-container'>
                            {[vmwareLogo, stripeLogo, pelotonLogo, goldmansachsLogo, bloombergLogo, atlassianLogo, linkedinLogo, adobeLogo].map((logo, index) => (
                                <img key={index} className='brand-logo' src={logo} alt={`Brand logo ${index + 1}`} />
                            ))}
                        </div>
                    </>
                </div>
            </div>
        </div>
    );
}
