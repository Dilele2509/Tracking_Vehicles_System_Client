import './AdminSidebar.css'
import '../Header/Header.css'

import { IoMdClose } from "react-icons/io";
import { HiMenu } from "react-icons/hi";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineNotificationImportant } from "react-icons/md";
import axios from '../../api/axios';

function AdminSidebar() {
    const location = useLocation();  // Lấy đường dẫn hiện tại
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [notifyViolation, setNotifyViolation] = useState(false)
    const baseIP = '103.77.209.110';
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    }

    // Kết nối WebSocket
    useEffect(() => {
        const ws = new WebSocket(`ws://${baseIP}:3002`);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            //console.log(data);
            if (data.event === 'violateNotify') {
                // Cập nhật mới từ WebSocket
                setNotifyViolation(data.data)
            }
        };

        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            ws.close();
        };
    }, []);

    // Tự động cập nhật activeLink theo URL hiện tại
    const activeLink = location.pathname;

    const handleLogout = async () => {
        try {
            const response = await axios.get('/login/logout', config);
            console.log(response);
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

    const toggleNotify = () => {
        if(notifyViolation){
            setNotifyViolation(!notifyViolation)
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
                <IoMdClose className='admin-sidebar-close' onClick={handleCloseSidebar} />
                <div className='admin-sidebar-header'>
                    <div className="sidebar-logo">
                        <a href="/">
                            <div className="iconLogo">HaLee</div>
                        </a>
                    </div>
                </div>
                <div className='admin-sidebar-content'>
                    <ul className='sidebar-list'>

                        <Link to='/'
                            className={activeLink === '/' ? 'sidebar-checked' : ''}
                        >
                            <li className='sidebar-list-item'>Dashboard</li>
                        </Link>
                        <Link to='/admin'
                            className={activeLink === '/admin' ? 'sidebar-checked' : ''}
                        >
                            <li className='sidebar-list-item'>Admin</li>
                        </Link>
                        <Link to='/userAdmin'
                            className={activeLink === '/userAdmin' ? 'sidebar-checked' : ''}
                        >
                            <li className='sidebar-list-item'>Driver</li>
                        </Link>
                        <Link to='/vehicleAdmin'
                            className={activeLink === '/vehicleAdmin' ? 'sidebar-checked' : ''}
                        >
                            <li className='sidebar-list-item'>Vehicle</li>
                        </Link>

                        <Link to='/driverError'
                            onClick={toggleNotify}
                            className={activeLink === '/driverError' ? 'sidebar-checked' : ''}
                        >
                            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} className='sidebar-list-item'>
                                <li>Violation</li>
                                {notifyViolation ? <MdOutlineNotificationImportant className='notify'/> : null}
                            </div>
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
