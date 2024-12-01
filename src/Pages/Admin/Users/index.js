import React, { useState, useEffect } from 'react';
import './User.css';
import { FaPowerOff } from "react-icons/fa6";
import { IoAdd } from 'react-icons/io5';
import axios from '../../../api/axios';
const BASEURL = 'http://localhost:3001'

function Users() {

  const [userList, setUserList] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowLicense, setIsShowLicense] = useState(false);
  const [userData, setUserData] = useState({
    fullname: '',
    birthday: '',
    email: '',
    phone_number: '',
    address: '',
    driving_license: ''
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/user/get-all');
        if (Array.isArray(response.data)) {
          const mergedDataPromises = response.data.map(async (user) => {
            const licenseData = await axios.post('/licenses/get-by-id', { userId: user.id });
            return { id: user.id, ...user, license: licenseData.data };
          });
          const mergedData = await Promise.all(mergedDataPromises);
          //console.log('merged data: ', mergedData);
          setUserList(mergedData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSaveClick = () => {

  };

  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  const handleEditClick = (userId, user) => {
    setEditingUserId(userId);
    setUserData({
      fullname: user.fullname,
      birthday: user.birthday,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
      driving_license: user.driving_license,
    });
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  }

  const handleToggleUserStatus = (userId, user) => {

  };

  const handleAddChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  };


  const handleAddClick = () => {

  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className='user-list-container'>
      <div className='row-item'>
        <div className='user-list-item'>
          <div className='user-list-header'>
            <div className='user-list-title'>
              <h3>Users list</h3>
            </div>
          </div>
          <div className='user-list-content'>
            <div className='add-product-btn' onClick={handleOpenModal}>
              <IoAdd />Add more user
            </div>
            <div className={`modal-add ${isModalVisible ? 'modal-visible' : 'modal-hidden'}`}>
              <div className='modal-container'>
                <div className='modal-header'>
                  <h3>ADD USER</h3>
                </div>
                <div className='modal-content'>
                  <div className='modal-input-area'>
                    <input
                      type='text'
                      placeholder='Full name'
                      id='fullname'
                      onChange={handleAddChange}
                    />
                    <input
                      type='text'
                      placeholder='Birthday'
                      id='birthday'
                      onChange={handleAddChange}
                    />
                    <input
                      type='password'
                      placeholder='Phone Number'
                      id='phone_number'
                      onChange={handleAddChange}
                    />
                    <input
                      type='text'
                      placeholder='Email'
                      id='email'
                      onChange={handleAddChange}
                    />
                    <input
                      type='text'
                      placeholder='Address'
                      id='address'
                      onChange={handleAddChange}
                    />
                  </div>
                  <div className='access-modal-button'>
                    <button className='submit-modal-btn' onClick={handleAddClick}>ADD</button>
                  </div>
                  <div className='cancel-modal-button'>
                    <button className='submit-modal-btn modal-cancel' onClick={handleCancelModal}>CANCEL</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='list-table-container'>
              <table className='table user-list-table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Birthday</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    {/* <th>Address</th>
                    <th>Driving License</th> */}
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over user list then display them */}
                  {userList.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <span>{user.id}</span>
                      </td>
                      <td style={{ minWidth: '18rem' }}>
                        <div className='td-contain-info'>
                          <div className='user-img-list admin-img-list'>
                            <img src={`${BASEURL}${user.avatar}`} alt='user-img' />
                          </div>
                          <div className='user-info-list'>
                            {editingUserId === user.id ? (
                              // Nếu đang chỉnh sửa, hiển thị các input để nhập thông tin mới
                              <>
                                <input
                                  type='text'
                                  value={userData.fullname}
                                  id='fullname'
                                  onChange={handleInputChange}
                                /><br />
                              </>
                            ) : (<>
                              <span>{user.fullname}</span>
                            </>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        {editingUserId === user.id ? (
                          <>
                            <input
                              type='text'
                              value={userData.birthday}
                              id='birthday'
                              onChange={handleInputChange} />
                          </>
                        ) : (
                          <>
                            <span>{user.birthday}</span>
                          </>
                        )}
                      </td>
                      <td>
                        {editingUserId === user.id ? (
                          <>
                            <input
                              type='text'
                              value={userData.email}
                              id='email'
                              onChange={handleInputChange} />
                          </>
                        ) : (
                          <>
                            <span>{user.email}</span>
                          </>
                        )}
                      </td>

                      <td>
                        {editingUserId === user.id ? (
                          <>
                            <input
                              type='text'
                              value={userData.phone_number}
                              id=''
                              onChange={handleInputChange} />
                          </>
                        ) : (
                          <>
                            <span>{user.phone_number}</span>
                          </>
                        )}
                      </td>

                      <td>
                        <button
                          onClick={() => setIsShowLicense(!isShowLicense)}
                          style={{ width: '8rem', height: '2.5rem' }}
                          className={'edit-list-btn'}
                        >
                          View License
                        </button>
                      </td>

                      <td>
                        <span>{user.deleted}</span>
                      </td>
                      <td>
                        {editingUserId === user.id ? (
                          // Nếu đang chỉnh sửa, hiển thị nút "Save" và "Cancel"
                          <>
                            <button className='edit-list-btn save-list-btn' onClick={handleSaveClick}>Save</button>
                            <button className='edit-list-btn cancel-list-btn' onClick={handleCancelClick}>Cancel</button>
                          </>
                        ) : (
                          // Nếu không phải đang chỉnh sửa, hiển thị nút "Edit"
                          <button className='edit-list-btn' onClick={() => handleEditClick(user.id, user)}>Edit</button>
                        )}
                      </td>
                      <td>
                        <div
                          className={`switch-icon ${parseInt(String.fromCharCode(user.deleted), 10) === 1 ? 'disable-check' : ''}`}
                          onClick={() => handleToggleUserStatus(user.id, user)}
                        >
                          <FaPowerOff />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                // Wrap the modal component in a React Fragment or a div to avoid adjacent JSX elements
                <React.Fragment>
                  <div className={`modal-add ${isShowLicense ? 'modal-visible' : 'modal-hidden'}`}>
                    <div className='modal-container'>
                      <div className='modal-header'>
                        <h3>Driver's License</h3>
                      </div>
                      <div className='modal-content'>
                        <div className='cancel-modal-button'>
                          <button className='submit-modal-btn modal-cancel' onClick={handleCancelModal}>CANCEL</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
