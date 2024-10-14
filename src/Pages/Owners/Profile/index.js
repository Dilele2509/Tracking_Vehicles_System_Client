import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';
import { FaRegUser, FaCar, FaEdit } from 'react-icons/fa';
import { FaPhoneVolume } from 'react-icons/fa6';
import { MdAlternateEmail, MdOutlinePostAdd } from 'react-icons/md';
import { IoIosCamera } from 'react-icons/io';
import { FillBackgroundButton, PostContent } from '../../../Components';

export default function Profile() {
    const [openModal, setOpenModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState('Cho thuê BWM Z4 odon 14k km giá 1tr3/ngày. Chính chủ cho thuê, làm việc trực tiếp trên hợp đồng với chủ, cam kết xe luôn sạch sẽ, có sẵn xăng khi bàn giao cho khác. Giá cả có thể thương lượng trong quá trình trao đổi hợp đồng cho thuê. Giấy tờ cần thiết để thuê: CCCD, GPLX (chỉ tạm giữ giấy phép lái xe đến khi nhận lại xe và kiểm tra tình trạng xe) Ib trực tiếp để có thêm thông tin');
    const [image, setImage] = useState('/assets/Images/bmw_z4.png'); 
    const navigate = useNavigate()

    const handleClickModal = () => {
        setOpenModal(!openModal);
    }

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className='profile-container'>
            <div className='profile-contain-layout'>
                <div className='profile-avatar'>
                    <div className='ava-contain'>
                        <div className='ava-contain-feature'>
                            <button>
                                <IoIosCamera className='change-ava' />
                            </button>
                            <img src='/assets/Images/chikawa.png' alt='avatar' />
                        </div>
                        <h1>Vy Le</h1>
                    </div>
                </div>

                <div className='profile-post-contain'>
                    <div className='profile-info'>
                        <div className='info-box'>
                            <FaRegUser className='icon-profile' />
                            <div className='info-contain'>
                                <h2>Full name: </h2>
                                <p>Vy Le</p>
                            </div>
                        </div>
                        <div className='info-box'>
                            <MdAlternateEmail className='icon-profile' />
                            <div className='info-contain'>
                                <h2>Email: </h2>
                                <p>vyle@gmail.com</p>
                            </div>
                        </div>
                        <div className='info-box'>
                            <FaPhoneVolume className='icon-profile' />
                            <div className='info-contain'>
                                <h2>Phone: </h2>
                                <a href='tel: +84966480829'>+84 966480829</a>
                            </div>
                        </div>
                        <div className='info-box'>
                            <FaCar className='icon-profile' />
                            <div className='info-contain'>
                                <h2>Quantity of vehicle: </h2>
                                <p>5</p>
                            </div>
                        </div>
                        <FillBackgroundButton
                            content='Edit Information'
                            background_color='#000'
                            text_color='#fff'
                            action={() => {
                                navigate('/account')
                            }}
                        />
                    </div>
                    <div className='profile-post'>
                        <button onClick={handleClickModal} className='create-post-btn'>
                            <MdOutlinePostAdd />
                            <span>Create new post</span>
                        </button>
                        <div className='create-post-contain'>
                            <img src='/assets/Images/chikawa.png' alt='user avatar' />
                            <button onClick={handleClickModal}>Create your new post</button>
                        </div>
                        <div className='post-content'>
                            <div className='post-content-info'>
                                <div className='post-user-info'>
                                    <img src='/assets/Images/chikawa.png' alt='user avatar' />
                                    <Link className='post-user-name' to='/profile'>Vy Le</Link>
                                </div>
                                <button className='edit-post-btn' onClick={handleEditClick}>
                                    <FaEdit />
                                </button>
                            </div>
                            <div className='post-image'>
                                <img src={image} alt='Post' />
                            </div>
                            <div className='post-details'>
                                {isEditing ? (
                                    <textarea
                                        className='post-edit-textarea'
                                        value={content}
                                        onChange={handleContentChange}
                                    />
                                ) : (
                                    <PostContent content={content} />
                                )}
                            </div>
                            {isEditing && (
                                <>
                                    <button className='save-post-btn' onClick={handleSave}>
                                        Save
                                    </button>
                                    <button className='save-post-btn cancel-color' onClick={handleEditClick}>
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ visibility: openModal ? 'visible' : 'hidden' }} className='modal-upload-post'>
                <form className="bg-white w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label for="title" className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <input
                            placeholder="Enter title"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label for="content" className="block text-gray-700 text-sm font-bold mb-2">
                            Content
                        </label>
                        <textarea
                            rows="5"
                            placeholder="Enter your content"
                            id="content"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        ></textarea>
                    </div>
                    <div className='mb-4'>
                        <label for="content" className="block text-gray-700 text-sm font-bold mb-2">
                            Images
                        </label>
                        <label className="custum-file-upload" for="file">
                            <div className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g stroke-width="0" id="SVGRepo_bgCarrier"></g><g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clip-rule="evenodd" fill-rule="evenodd"></path> </g></svg>
                            </div>
                            <div className="text">
                                <span>Click to upload image</span>
                            </div>
                            <input type="file" id="file" />
                        </label>

                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Post
                        </button>

                        <button
                            type="button"
                            onClick={handleClickModal}
                            className="bg-gray-400 text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
