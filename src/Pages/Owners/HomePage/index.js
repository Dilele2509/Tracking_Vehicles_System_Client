import React from 'react';
import './HomePage.css';
import { RotatingCard, RotatingCardFront, RotatingCardBack } from '../../../Components/RotatingCard';
import { LuMonitorSmartphone } from "react-icons/lu";
import { MdPriceCheck, MdSmartToy } from "react-icons/md";
import { IoFlash } from "react-icons/io5";

const hachi = '/assets/Images/hachi.jpeg'
const chikawa = '/assets/Images/chikawa.png'

export default function HomePage() {
  return (
    <div className='homepage-container'>
      <div className='static-content'>
        <div className='static-element'>
          <h1>5</h1>
          <p className='static-title'>Owned Vehicles</p>
        </div>
        <div className='static-element'>
          <h1>3</h1>
          <p className='static-title'>Vehicles for Rent</p>
        </div>
      </div>

      <div className='feature-content'>
        <div className='card-feature'>
          <RotatingCard>
            <RotatingCardFront
              color="#000"
              image={hachi}
              title={
                <>
                  Touch Hachi
                  <br />
                </>
              }
              description="Touch Hachi to see Chikawa"
            />
            <RotatingCardBack
              image={chikawa}
              title="kakaka"
              description="hihihihi"
              action={{ type: "internal", route: "/vehicles", btn_background_color: "#E9BD20", btn_color: "#333", label: "Show vehicle list" }}
            />
          </RotatingCard>
        </div>
        <div className='content-feature'>
          <div className='content-box'>
            <div className='content-item'>
              <LuMonitorSmartphone className='icon-feature' />
              <h1>Multi Platform</h1>
              <p>Support owners to manage their vehicles on all platforms such as Website, IOS, Android.</p>
            </div>

            <div className='content-item'>
              <IoFlash className='icon-feature'/>
              <h1>Convenient and Fast</h1>
              <p>Easy installation, quick location updates and not limited by large distances.</p>
            </div>
          </div>

          <div className='content-box'>
            <div className='content-item'>
              <MdPriceCheck className='icon-feature'/>
              <h1>Reasonable Price</h1>
              <p>The price is suitable for the market and at the same time solves the disadvantages of those products.</p>
            </div>

            <div className='content-item'>
              <MdSmartToy className='icon-feature'/>
              <h1>Smart Features</h1>
              <p>Integrating AI features to support users not only in vehicle management but also in traffic participation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
