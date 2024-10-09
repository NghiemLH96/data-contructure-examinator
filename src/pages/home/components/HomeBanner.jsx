import React from 'react'
import $ from 'jquery'
import './HomeBanner.scss'
import vmwareLogo from '../../../assets/brands-logo/vmware_black.png'
import stripeLogo from '../../../assets/brands-logo/stripe_black.png'
import pelotonLogo from '../../../assets/brands-logo/peloton_black.png'
import goldmansachsLogo from '../../../assets/brands-logo/goldmansachs_black.png'
import bloombergLogo from '../../../assets/brands-logo/bloomberg_black.png'
import atlassianLogo from '../../../assets/brands-logo/atlassian_black.png'
import linkedinLogo from '../../../assets/brands-logo/linkedin_black.png'
import adobeLogo from '../../../assets/brands-logo/adobe_black.png'

export default function HomeBanner() {
    $(document).ready(()=>{
        $(".home-nav-menu-title").fadeIn(1500)
        $(".home-nav-menu-desc").fadeIn(2000)
    })
  return (
    <div className='home-banner-container'>
        <div className='home-nav-menu'>
            <div className='home-nav-menu-content'>
                <h2 className='home-nav-menu-title'>Optimize Your Code, Optimize Your Mind!</h2>
                <p className='home-nav-menu-desc'>We help companies develop the strongest tech teams around. We help candidates sharpen their tech skills and pursue job opportunities.</p>
                <button className='home-nav-menu-btn'>Get Start</button>
                <div className='brands-logo-container'>
                    <img className='brand-logo' src={vmwareLogo} alt="" />
                    <img className='brand-logo' src={stripeLogo} alt="" />
                    <img className='brand-logo'src={pelotonLogo} alt="" />
                    <img className='brand-logo' src={goldmansachsLogo} alt="" />
                    <img className='brand-logo' src={bloombergLogo} alt="" />
                    <img className='brand-logo' src={atlassianLogo} alt="" />
                    <img className='brand-logo' src={linkedinLogo} alt="" />
                    <img className='brand-logo' src={adobeLogo} alt="" />
                </div>
            </div>
        </div>
    </div>
  )
}
