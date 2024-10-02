import React from 'react'
import './Footer.css'
import { FaFacebook, FaInstagram, FaReact, FaGithub } from "react-icons/fa";

const logo_light = '/assets/Logo/logo-light.png';

export default function Footer() {
  return (
    <div className='footer-container'>
      <footer className='footer'>
        <div className='footer-outline'>
          <div className='footer-layout'>
            <div className='footer-content'>
              <div className='content-info'>
                <div className='footer-logo'>
                  <div>
                    <div className='logo-item'>
                      <img src={logo_light} alt='company-logo' />
                    </div>
                    <h3 className='logo-title'>HaLee Company</h3>
                  </div>
                  <div className='social'>
                    <a href='https://www.facebook.com/vyle2509'><FaFacebook className='icon-social' /></a>
                    <a href='https://www.instagram.com/imvylee_/'><FaInstagram className='icon-social' /></a>
                    <a href='https://react.dev/'><FaReact className='icon-social' /></a>
                    <a href='https://github.com/Dilele2509'><FaGithub className='icon-social' /></a>
                  </div>
  
                </div>
  
                <div className='footer-items'>
                  <div className='footer-item'>
                    <span>About Us</span>
                    <p>We specialize in providing new technology monitoring equipment to serve the most convenient monitoring and protection of assets.</p>
                  </div>
    
                  <div className='footer-item'>
                    <span>Contact</span><br/>
                    <a href="tel:+84966480829">+84 966480829</a> {/* Now it's clickable! */}
                  </div>
    
                  <div className='footer-item'>
                    <span>Location</span>
                    <p>1 Vo Van Ngan, Linh Chieu, Thu Duc, Ho Chi Minh city</p>
                  </div>
                </div>
              </div>

              <div className='footer-sign'>
                <p>All rights reserved. Copyright © 2024 Vehicle Tracking System by <a href='https://www.facebook.com/vyle2509'>Vy Le</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
