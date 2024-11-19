// import React from 'react';
import React, { useState } from 'react';
import './HomePageAdmin.css';
import { FaUsers, FaCube, FaClipboardList, FaPowerOff } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';

function HomePage() {

  // Define state variables
  const [userLength, setUserLength] = useState(0);
  const [proLength, setProLength] = useState(0);
  const [orderLength, setOrderLength] = useState(0);
  const [userList, setUserList] = useState([
    {
      user_id: 1,
      full_name: 'Vy Le',
      email: 'vyle2509@gmail.com',
      phone_num: '0966480829',
      address: '68 Lý Tự Trọng',
      deleted: 0,
      role_id: 1,
      avatar: require('../../../assets/avatar/images.jpg'),
    },

  ]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userData, setUserData] = useState({ full_name: '', email: '', phone_num: '', address: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Define functions
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSaveClick = () => {
    // Save logic here
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  const handleEditClick = (userId, user) => {
    setEditingUserId(userId);
    setUserData({ full_name: user.full_name, email: user.email, phone_num: user.phone_num, address: user.address });
  };

  const handleToggleUserStatus = (id, user) => {
    // Toggle user status logic here
  };
  const handleOpenModal = () => {
    setIsModalVisible(true);
  }


  const handleAddChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  };

  
  const handleAddClick = () => {
    // Add admin logic here
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <div className="admin-home-container">
        <div className="dashboard-admin-container">
          <div className="dashboard-col-3">
            <div className="dashboard-item">
              <div className='user-list-title'>
                <h3>Users</h3>
              </div>
              <div className='user-list-content dashboard-admin-content'>
                <FaUsers />
                <span>{userLength}</span>
              </div>
            </div>
            <div className="dashboard-item">
              <div className='user-list-title'>
                <h3>Products</h3>
              </div>
              <div className='user-list-content dashboard-admin-content'>
                <FaCube />
                <span>{proLength}</span>
              </div>
            </div>
            <div className="dashboard-item">
              <div className='user-list-title'>
                <h3>Orders</h3>
              </div>
              <div className='user-list-content dashboard-admin-content'>
                <FaClipboardList />
                <span>{orderLength}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-list-container">
          <div className='user-list-item'>
            <div className='user-list-header'>
              <div className='user-list-title'>
                <h3>Admins list</h3>
              </div>
            </div>
            <div className='user-list-content'>
              <div className='add-product-btn' onClick={handleOpenModal}>
                <IoAdd />Add more admin
              </div>
              <div className='list-table-container'>
                <table className='table user-list-table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Admin</th>
                      <th>Phone Number</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map over user list then display them */}
                    {userList.map((user) => (
                      user.role_id === 1 ? (
                        <tr key={user.user_id}>
                          <td>
                            <span>{user.user_id}</span>
                          </td>
                          <td>
                            <div className='td-contain-info'>
                              <div className='user-img-list'>
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
                              onClick={() => handleToggleUserStatus(user.id, user)}
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
      {/* modal add */}
      <div className={`modal-add ${isModalVisible ? 'modal-visible' : 'modal-hidden'}`}>
        <div className='modal-container'>
          <div className='modal-header'>
            <h3>ADD ADMIN</h3>
          </div>
          <div className='modal-content'>
            <div className='modal-input-area'>
              <input
                type='text'
                placeholder='Admin full name'
                id='full_name'
                onChange={handleAddChange}
              />
              <input
                type='text'
                placeholder='Admin email'
                id='email'
                onChange={handleAddChange}
              />
              <input
                type='password'
                placeholder='Initialization password'
                id='password'
                onChange={handleAddChange}
              />
              <input
                type='text'
                placeholder='Address'
                id='address'
                onChange={handleAddChange}
              />
              <input
                type='text'
                placeholder='Phone number'
                id='phone_num'
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
    </>
  );
}

export default HomePage