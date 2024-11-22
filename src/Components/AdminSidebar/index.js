import './AdminSidebar.css'
import '../Header/Header.css'

import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

function AdminSidebar() {
    const [activeLink, setActiveLink] = useState('/');
    const [sidebarOpen, setSidebarOpen] = useState(false); 
    const [showButton, setShowButton] = useState(true);
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    }

    const handleChangePage = (to) => {
        setActiveLink(to);
    };

    const handleLogout = async () => {
        try {
            /* const response = await axios.get('/logout', config);
            console.log(response); */
            window.location.href = '/';
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleOpenSidebar = () => {
        setSidebarOpen(true);
        setShowButton(true);
        const asideContainer = document.querySelector('.aside-container');
        if (asideContainer) {
            asideContainer.classList.remove('close-admin-sidebar');
        }
    }

    const handleCloseSidebar = () => {
        setSidebarOpen(false);
        setShowButton(false);
        const asideContainer = document.querySelector('.aside-container');
        if (asideContainer) {
            asideContainer.classList.add('close-admin-sidebar');
        }
    }

    return (
        <>
            {(!sidebarOpen) && ( 
                <button className={`show-sidebar-button ${showButton ? '' : 'close'}`} onClick={handleOpenSidebar}>
                        <HiMenu className="open-sidebar-btn" />
                </button>
            )}
            <aside className={`aside-container`}>
                <IoMdClose className='admin-sidebar-close' onClick={handleCloseSidebar}/>
                <div className='admin-sidebar-header'>
                    <div className="sidebar-logo">
                        <a href="/">
                            <div className="iconLogo">UrCake</div>
                        </a>
                    </div>
                </div>
                <div className='admin-sidebar-content'>
                    <ul className='sidebar-list'>

                        <Link to='/'
                            onClick={() => handleChangePage('/')}
                            className={activeLink === '/' ? 'sidebar-checked' : ''}
                        >
                            <li className='sidebar-list-item'>Dashboard</li>
                        </Link>
                        <Link to='/admin'
                            onClick={() => handleChangePage('/admin')}
                            className={activeLink === '/admin' ? 'sidebar-checked' : ''}
                        >
                            <li className='sidebar-list-item'>Admin</li>
                        </Link>
                        <Link to='/userAdmin'
                            onClick={() => handleChangePage('/user')}
                            className={activeLink === '/user' ? 'sidebar-checked' : ''}
                        >
                            <li className='sidebar-list-item'>Driver</li>
                        </Link>
                        <Link to='/vehicleAdmin'
                            onClick={() => handleChangePage('/vehicle')}
                            className={activeLink === '/vehicle' ? 'sidebar-checked' : ''}
                        >
                            <li className='sidebar-list-item'>Vehicle</li>
                        </Link>
                        
                        <Link to='/driverError'
                            onClick={() => handleChangePage('/driverError')}
                            className={activeLink === '/driverError' ? 'sidebar-checked' : ''}
                        >
                            <li className='sidebar-list-item'>Driver Violation</li>
                        </Link>

                    </ul>
                </div>
                <div className='admin-sidebar-footer'>
                    <div className='admin-logout'>
                        <button className='admin-logout-btn' onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </aside>
        </>
     );
}

export default AdminSidebar;