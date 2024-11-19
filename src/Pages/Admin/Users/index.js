import React, { useState, useEffect } from 'react';
import './User.css'; 
import { FaPowerOff } from "react-icons/fa6";
import { IoAdd } from 'react-icons/io5';


function Users() {

  const [userList, setUserList] = useState([
    {
      user_id: 'USER001',
      full_name: 'Vy Le',
      birthday: '1990-01-01',
      email: 'vyle2509@gmail.com',
      phone_num: '0966480829',
      address: '68 Lý Tự Trọng',
      deleted: 0,
      role_id: 2,
      avatar: require('../../../assets/avatar/images.jpg'),
      driving_license: require('../../../assets/avatar/license.png')
      
    },
    {
      user_id: 'USER002',
      full_name: 'John Doe',
      birthday: '1985-05-15',
      email: 'johndoe@example.com',
      phone_num: '0123456789',
      address: '123 Main St',
      deleted: 0,
      role_id: 2,
      avatar: require('../../../assets/avatar/images.jpg'),
      driving_license: require('../../../assets/avatar/license.png')
    },
    {
      user_id: 'USER003',
      full_name: 'Jane Smith',
      birthday: '1992-03-22',
      email: 'janesmith@example.com',
      phone_num: '9876543210',
      address: '456 Elm St',
      deleted: 0,
      role_id: 2,
      avatar: require('../../../assets/avatar/images.jpg'),
      driving_license: require('../../../assets/avatar/license.png')
    },
    {
      user_id: 'USER004',
      full_name: 'Alice Johnson',
      birthday: '1988-07-30',
      email: 'alice.johnson@example.com',
      phone_num: '1234567890',
      address: '789 Maple Ave',
      deleted: 0,
      role_id: 2,
      avatar: require('../../../assets/avatar/images.jpg'),
      driving_license: require('../../../assets/avatar/license.png')
    },
    {
      user_id: 'USER005',
      full_name: 'Bob Brown',
      birthday: '1995-11-11',
      email: 'bob.brown@example.com',
      phone_num: '0987654321',
      address: '321 Oak St',
      deleted: 0,
      role_id: 2,
      avatar: require('../../../assets/avatar/images.jpg'),
      driving_license: require('../../../assets/avatar/license.png')
    },
  ]); 
  const [editingUserId, setEditingUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState({
    full_name: '',
    birthday: '',
    email: '',
    phone_num: '',
    address: '',
    driving_license:''
  });


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
      full_name: user.full_name,
      birthday:user.birthday,
      email: user.email,
      phone_num: user.phone_num,
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
                      id='full_name'
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
                      id='phone_num'
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
                  <th>Address</th>
                  <th>Driving License</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over user list then display them */}
                  {userList.map((user) => (
                    user.role_id === 2 ? (
                      <tr key={user.user_id}>
                        <td>
                          <span>{user.user_id}</span>
                        </td>
                        <td>
                          <div className='td-contain-info'>
                            <div className='user-img-list admin-img-list'>
                              <img src={user.avatar} alt='user-img' />
                            </div>
                            <div className='user-info-list'>
                              {editingUserId === user.user_id ? (
                                // Nếu đang chỉnh sửa, hiển thị các input để nhập thông tin mới
                                <>
                                  <input
                                    type='text'
                                    value={userData.full_name}
                                    id='full_name'
                                    onChange={handleInputChange}
                                  /><br />
                                  {/* <input
                                    type='text'
                                    id='email'
                                    value={userData.email}
                                    onChange={handleInputChange}
                                  /> */}
                                </>
                              ) : (
                                // Nếu không phải đang chỉnh sửa, hiển thị thông tin người dùng
                                <>
                                  <span>{user.full_name}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          {editingUserId === user.user_id ? (
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
                          {editingUserId === user.user_id ? (
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
                          {editingUserId === user.user_id ? (
                            <>
                              <input
                                type='text'
                                value={userData.phone_num}
                                id=''
                                onChange={handleInputChange} />
                            </>
                          ) : (
                            <>
                              <span>{user.phone_num}</span>
                            </>
                          )}
                        </td>

                        <td>
                          {editingUserId === user.user_id ? (
                            <>
                              <input
                                type='text'
                                value={userData.address}
                                id='address'
                                onChange={handleInputChange} />
                            </>
                          ) : (
                            <>
                              <span>{user.address}</span>
                            </>
                          )}
                        </td>

                        <td>
                          {editingUserId === user.user_id ? (
                            <>
                              <input
                                type='text'
                                value={userData.driving_license}
                                id='driving_license'
                                onChange={handleInputChange} />
                            </>
                          ) : (
                            <>
                            <img src={user.driving_license} alt='user-img' style={{ width: '50px', borderRadius: '50%' }} />
                            {/* <span>{user.driving_license}</span> */}
                            </>
                          )}
                        </td>
                        <td>
                          <span>{user.deleted}</span>
                        </td>
                        <td>
                          {editingUserId === user.user_id ? (
                            // Nếu đang chỉnh sửa, hiển thị nút "Save" và "Cancel"
                            <>
                              <button className='edit-list-btn save-list-btn' onClick={handleSaveClick}>Save</button>
                              <button className='edit-list-btn cancel-list-btn' onClick={handleCancelClick}>Cancel</button>
                            </>
                          ) : (
                            // Nếu không phải đang chỉnh sửa, hiển thị nút "Edit"
                            <button className='edit-list-btn' onClick={() => handleEditClick(user.user_id, user)}>Edit</button>
                          )}
                        </td>
                        <td>
                          <div
                            className={`switch-icon ${user.deleted === 1 ? 'disable-check' : ''}`}
                            onClick={() => handleToggleUserStatus(user.user_id, user)}
                          >
                            <FaPowerOff />
                          </div>
                        </td>
                      </tr>
                    ) : null
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Users;
