import React, { useState, useEffect } from 'react';
// import axios from '../../../API/axios';
import './User.css'; // Import CSS file
import { FaPowerOff } from "react-icons/fa6";


function Users() {
  // Define state variables
  const [userList, setUserList] = useState([]); // Assuming you will fetch this data
  const [editingUserId, setEditingUserId] = useState(null);
  const [userData, setUserData] = useState({
    full_name: '',
    email: '',
    phone_num: '',
    address: ''
  });

  // Define event handlers
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSaveClick = () => {
    // Logic to save user data
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  const handleEditClick = (userId, user) => {
    setEditingUserId(userId);
    setUserData({
      full_name: user.full_name,
      email: user.email,
      phone_num: user.phone_num,
      address: user.address
    });
  };

  const handleToggleUserStatus = (userId, user) => {
    // Logic to toggle user status
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
            <div className='list-table-container'>
              <table className='table user-list-table'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Phone-number</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* Map over user list then display them */}
                  {userList.map((user) => (
                    user.role_id !== 2 ? (
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
                                  <input
                                    type='text'
                                    id='email'
                                    value={userData.email}
                                    onChange={handleInputChange}
                                  />
                                </>
                              ) : (
                                // Nếu không phải đang chỉnh sửa, hiển thị thông tin người dùng
                                <>
                                  <h4>{user.full_name}</h4>
                                  <span>{user.email}</span>
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
                                value={userData.phone_num}
                                id='phone_num'
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
