// import React from 'react';
import React, { useEffect, useState } from 'react';
import './HomePageAdmin.css';
import { FaUsers, FaCube, FaClipboardList, FaPowerOff } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import axios from '../../../api/axios';
const BASEURL = 'http://103.77.209.110:3001'


function HomePage() {
  // Define state variables
  const [driverLength, setDriverLength] = useState(0);
  const [tripLength, setTripLength] = useState(0);
  const [vehicleLength, setVehicleLength] = useState(0);
  const [userList, setUserList] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [userData, setUserData] = useState({ fullname: '', email: '', phone_number: '', birthday: '' });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [admins, vehicles, trips, users] = await Promise.all([
          axios.get('/user/get-all'),
          axios.get('/vehicles/get-all'),
          axios.get('/trip/get-all'),
          axios.get('/user/get-all-admin')
        ]);
        if (Array.isArray(admins.data)) setDriverLength(admins.data.length);
        if (Array.isArray(vehicles.data)) setVehicleLength(vehicles.data.length);
        if (Array.isArray(trips.data)) setTripLength(trips.data.length);
        if (Array.isArray(users.data)) {
          const mergedDataPromises = users.data.map(async (user) => {
            //console.log('user data: ', user);
            const licenseData = await axios.post('licenses/get-by-id', { userId: user.id })
            //console.log('license: ', licenseData.data);
            return { id: user.id, ...user, license: licenseData.data };
          })

          const mergedData = await Promise.all(mergedDataPromises);
          //console.log(mergedData);
          setUserList(mergedData);
        };
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  // Define functions
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSaveClick = () => {
    axios.put('/user/update-info', { userData })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  const handleEditClick = (userId, user) => {
    setEditingUserId(userId);
    setUserData({ fullname: user.fullname, email: user.email, phone_number: user.phone_number, birthday: user.birthday });
  };

  const handleToggleUserStatus = async (id, user) => {
    try {
      // Toggle the user status based on whether they are enabled or disabled
      if (user.deleted === 0) {
        await axios.put('/user/disable', { id });
      } else {
        await axios.put('/user/enable', { id });
      }

      // Reload the user list after toggling status
      const userResponse = await axios.get('/user/get-all-admin', config);
      const users = userResponse.data;
      setUserList(users);  // Set the updated user list here

      //console.log('User status updated and list reloaded.');
    } catch (error) {
      console.error('Error toggling status or refreshing data:', error);
    }
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
                <h3>Drivers</h3>
              </div>
              <div className='user-list-content dashboard-admin-content'>
                <FaUsers />
                <span>{driverLength}</span>
              </div>
            </div>
            <div className="dashboard-item">
              <div className='user-list-title'>
                <h3>Trips</h3>
              </div>
              <div className='user-list-content dashboard-admin-content'>
                <FaCube />
                <span>{tripLength}</span>
              </div>
            </div>
            <div className="dashboard-item">
              <div className='user-list-title'>
                <h3>Vehicles</h3>
              </div>
              <div className='user-list-content dashboard-admin-content'>
                <FaClipboardList />
                <span>{vehicleLength}</span>
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
                      <th>birthday</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map over user list then display them */}
                    {userList.length > 0 ? (userList.map((user, index) => {
                      console.log(user);
                      return (
                        <tr key={index}>
                          <td>
                            <span>{user.id}</span>
                          </td>
                          <td style={{ minWidth: '15rem' }}>
                            <div className='td-contain-info'>
                              <div className='user-img-list'>
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
                                    <h4>{user.fullname}</h4>
                                    <span>{user.email}</span>
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
                                  value={userData.phone_number}
                                  id='phone_number'
                                  onChange={handleInputChange} />
                              </>
                            ) : (
                              <>
                                <span>{user.phone_number}</span>
                              </>
                            )}
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
                              className={`switch-icon ${user.deleted === 1 ? 'disable-check' : ''}`}
                              onClick={() => handleToggleUserStatus(user.id, user)}
                            >
                              <FaPowerOff />
                            </div>
                          </td>
                        </tr>);
                    })) : (<p>No users found</p>)}
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
                id='fullname'
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
                placeholder='birthday'
                id='birthday'
                onChange={handleAddChange}
              />
              <input
                type='text'
                placeholder='Phone number'
                id='phone_number'
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