import { useEffect, useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import './AdminProfile.css'
import axios from '../../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const BASEURL = 'http://localhost:3001'


function AdminProfile() {
    const notify = (message, type = "info") => {
        toast(message, { type });
    };
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    };
    const [userAva, setUserAva] = useState(null);
    const [uploadAvailable, setUploadAvailable] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [adminInfo, setAdminInfo] = useState({});
    const [editStatus, setEditStatus] = useState(false)
    const [changePass, setChangePass] = useState(false)
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [notiOption, setNotiOptione] = useState('')
    const [notiContent, setNotiContent] = useState()
    const [userData, setUserData] = useState({
        id: '',
        fullname: '',
        birthday: null,
        email: '',
        phone_number: '',
    });

    useEffect(() => {
        axios.get('/user/get-info', config)
            .then(response => {
                setAdminInfo(response.data)
                setUserData({
                    id: response.data.id,
                    fullname: response.data.fullname,
                    birthday: response.data.birthday,
                    email: response.data.email,
                    phone_number: response.data.phone_number,
                })
                setUserAva(response.data.avatar)
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    const handleAddChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSaveInfoClick = () => {
        console.log(userData);

        // Sending PUT request to update the user
        axios.put('/user/update-info', userData, config)
            .then(() => {
                notify('update information successfully', 'success');
                // On success, update the user list with the edited user
                axios.get('/user/get-info', config)
                    .then(response => {
                        setAdminInfo(response.data)
                        setUserAva(response.data.avatar)
                    })
                    .catch(error => {
                        console.error(error);
                    });

                // Reset the editing state
                setEditStatus(false)
                setUserData({
                    id: '',
                    fullname: '',
                    birthday: null,
                    email: '',
                    phone_number: '',
                });
            })
            .catch(error => {
                notify('error updating user', 'error')
                console.error(error);
            });
    };

    const handleChangeInfo = () => {
        setEditStatus(true)
    }

    const handleCancelClick = () => {
        setEditStatus(false);
    }

    const handleChangePass = () => {
        setChangePass(true)
    }

    const handleSavePass = async () => {
        setChangePass(false)
    }
    const handleCancelPass = () => {
        setChangePass(false)
    }

    const handleCancelModal = () => {
        setModalVisible(false);
    }

    const handleOpenModal = (notiOption) => () => {
        setNotiOptione(notiOption)
        setModalVisible(true);
        if (notiOption === 'remove') {
            setNotiContent('You can not access the admin page in the future, but you still login as a normal user')
        } else if (notiOption === 'disable') {
            setNotiContent('Your account will be disabled, you can not login in the future')
        }
    }

    const handleConfirmClick = (id, option) => () => {
        setModalVisible(false);
    }


    const handleUploadStatus = () => {
        setUploadAvailable(true);
    }

    const fileSelectedHandler = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);

    };

    const fileUploadHandler = async () => {
        try {
            const formData = new FormData();
            formData.append('avatar', selectedFile);
            axios.post('/user/upload-ava/', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
                .then((response) => {
                    notify('Avatar uploaded successfully', 'success');

                    axios.get('/user/get-info', config)
                        .then(response => {
                            setUserAva(response.data.avatar)
                        })
                        .catch(error => {
                            console.error(error);
                        });
                    setUploadAvailable(false);
                    setSelectedFile(null);
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                    notify('Error uploading file: ', 'error')
                });
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handleCancelUpload = () => {
        setUploadAvailable(false)
    }
    return (
        <>
            <div className='admin-profile-container'>
                <div className='admin-list-item'>
                    <div className='user-list-header'>
                        <div className='user-list-title'>
                            <h3>{adminInfo.fullname}'s Profile</h3>
                        </div>
                    </div>
                    <div className='user-list-content admin-profile-content'>
                        <div className='admin-avatar-area'>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', rowGap: '1rem', width: '50%' }}>
                                <img src={selectedFile ? URL.createObjectURL(selectedFile) : `${BASEURL}${userAva}`} alt='admin-avatar' />
                                <div className='change-user-ava'>
                                    {uploadAvailable ? (
                                        <>
                                            <div className='change-ava-area'>
                                                <div className='upload-file-container'>
                                                    <label htmlFor='file-upload'>Input File <MdOutlineFileUpload className='upload-icon' /></label>
                                                    <input id='file-upload' type="file" accept=".png, .jpg, .jpeg" onChange={fileSelectedHandler} />
                                                </div>
                                                <div style={{ display: 'flex', marginTop: '1rem' }}>
                                                    <button className='change-ava-btn' onClick={fileUploadHandler}>Upload</button>
                                                    <button className='change-ava-btn cancel-mod' onClick={handleCancelUpload}>Cancel</button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <button className='change-ava-btn' onClick={handleUploadStatus}>Change</button>
                                    )}
                                </div>
                            </div>
                            <div className='admin-security-area'>
                                <div className='admin-security-header'>
                                    <h3>Security</h3>
                                    {changePass ? (
                                        <>
                                            <div className='admin-submit-btn submit-change-pass'>
                                                <button className='edit-list-btn save-list-btn' onClick={handleSavePass}>Save</button>
                                                <button className='edit-list-btn cancel-list-btn' onClick={handleCancelPass}>Cancel</button>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className='security-edit-option'>
                                    {changePass ? (
                                        <>
                                            <div className="edit-input-contain">
                                                <h4>Current Password</h4>
                                                <input
                                                    placeholder="Enter your current password"
                                                    id="currentPass"
                                                    className="user-pass"
                                                    type="password"
                                                    value={currentPass}
                                                    onChange={(e) => setCurrentPass(e.target.value)}
                                                />
                                            </div>
                                            <div className="edit-input-contain">
                                                <h4>New Password</h4>
                                                <input
                                                    placeholder="Enter your new password"
                                                    id="newPass"
                                                    className="user-new-pass"
                                                    type="password"
                                                    value={newPass}
                                                    onChange={(e) => setNewPass(e.target.value)}
                                                />
                                            </div>
                                            <div className="edit-input-contain">
                                                <h4>Confirm New Password</h4>
                                                <input
                                                    placeholder="Confirm your new password"
                                                    id="confirmPass"
                                                    type="password"
                                                    value={confirmPass}
                                                    onChange={(e) => setConfirmPass(e.target.value)}
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <span className='admin-edit-security' onClick={handleChangePass}>
                                                Change Account Password
                                            </span><br />
                                            <span className='admin-edit-security' onClick={handleOpenModal('remove')}>
                                                Remove Admin to User
                                            </span><br />
                                            <span className='admin-edit-security' onClick={handleOpenModal('disable')}>
                                                Disable Account
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className='admin-profile-info'>
                            <div className='admin-info-welcome'>
                                <h3>Hi, {adminInfo.fullname}!</h3>
                                <p>This is admin profile page, you can change your information or your security here</p>
                            </div>
                            <div className='admin-info-form'>
                                <div className='admin-info-title'>
                                    <h3>Account Information</h3>
                                    <div className='change-user-info admin-edit-btn'>
                                        {editStatus ? (
                                            <>
                                                <div className='admin-submit-btn'>
                                                    <button className='edit-list-btn save-list-btn' onClick={handleSaveInfoClick}>Save</button>
                                                    <button className='edit-list-btn cancel-list-btn' onClick={handleCancelClick}>Cancel</button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <button className='change-info-btn' onClick={handleChangeInfo}>Change</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className='admin-info-area'>
                                    {!editStatus ? (<>
                                        <span>Name: {adminInfo.fullname}</span>
                                        <span>Email: {adminInfo.email}</span>
                                        <span>Phone: {adminInfo.phone_number}</span>
                                        <span>Birthday: {adminInfo.birthday}</span>
                                    </>) : (
                                        <>
                                            <input
                                                type='text'
                                                placeholder='Full name'
                                                id='fullname'
                                                value={userData.fullname}
                                                onChange={handleAddChange}
                                            />
                                            <input
                                                type="date"
                                                placeholder="Birthday"
                                                id="birthday"
                                                value={userData.birthday.split('T')[0]} // Ensures only the date part (yyyy-mm-dd)
                                                onChange={(e) => handleAddChange({ target: { id: 'birthday', value: e.target.value } })}
                                            />
                                            <input
                                                type='phone'
                                                placeholder='Phone Number'
                                                id='phone_number'
                                                value={userData.phone_number}
                                                onChange={handleAddChange}
                                            />
                                            <input
                                                type='text'
                                                placeholder='Email'
                                                id='email'
                                                value={userData.email}
                                                onChange={handleAddChange}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* modal confirm */}
            <div className={`modal-add ${isModalVisible ? 'modal-visible' : 'modal-hidden'}`}>
                <div className='modal-container'>
                    <div className='modal-header'>
                        <h3>Confirm your Action</h3>
                    </div>
                    <div className='modal-content'>
                        <div className='modal-input-area'>
                            <span className='noti-modal-content'>
                                {notiContent}
                            </span>
                        </div>
                        <div className='access-modal-button'>
                            <button className='submit-modal-btn' onClick={handleConfirmClick(adminInfo.user_id, notiOption)}>Confirm</button>
                        </div>
                        <div className='cancel-modal-button'>
                            <button className='submit-modal-btn modal-cancel' onClick={handleCancelModal}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default AdminProfile;