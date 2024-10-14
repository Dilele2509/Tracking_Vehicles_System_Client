import React from 'react';
import './Account.css'
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { ownerAccountRoutes } from '../../../Routes';
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";

export default function Account() {
  return (
    <div className='account-container'>
      <div className='taskbar-account'>
        <label>Setting Account</label>
        <div className='taskbar-set-box'>
          <Link className='taskbar-set-item' to={'information'}>
            <FaUserEdit className='info-account-icon' />
            <p>Personal Information</p>
          </Link>
          <Link className='taskbar-set-item' to={'password'}>
            <MdOutlineSecurity className='info-account-icon' />
            <p>Password</p>
          </Link>
        </div>
      </div>
      <div className='account-content'>
        <Routes>
          {/* Redirect từ /account/ về /account/information */}
          <Route path="/" element={<Navigate to="/account/information" replace />} />
          {ownerAccountRoutes.map((route, index) => {
            const Page = route.component;

            return (
              <Route
                key={index}
                path={route.path}
                element={<Page />}
              />
            );
          })}
        </Routes>
      </div>
    </div>
  );
}
