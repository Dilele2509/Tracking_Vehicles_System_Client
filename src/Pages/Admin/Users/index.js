import React, { useState, useEffect } from 'react';
import './User.css';
import { FaPowerOff } from "react-icons/fa6";
import { IoAdd } from 'react-icons/io5';
import axios from '../../../api/axios';
import LicenseCard from '../../../Components/LicenseCard';
const BASEURL = 'http://103.77.209.93:3001'

function Users() {

  const [userList, setUserList] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowLicense, setIsShowLicense] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState({});
  const [userData, setUserData] = useState({
    id: '',
    fullname: '',
    birthday: '',
    email: '',
    phone_number: '',
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
        const response = await axios.get('/user/get-all', config);
        if (Array.isArray(response.data)) {
          const mergedDataPromises = response.data.map(async (user) => {
            const licenseData = await axios.post('/licenses/get-by-id', { userId: user.id }, config);
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
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,  // This updates the corresponding field in userData
    }));
  };

  const handleSaveClick = () => {
    console.log(userData);

    // Sending PUT request to update the user
    axios.put('/user/admin-update-user', { userData })
      .then(response => {
        // On success, update the user list with the edited user
        const updatedUserList = userList.map((user) =>
          user.id === userData.id ? { ...user, ...userData } : user
        );
        setUserList(updatedUserList);

        // Reset the editing state
        setEditingUserId(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
  };

  const handleEditClick = (userId, user) => {
    console.log(userId, user);  // Log the user and its id
    setEditingUserId(userId);  // Set the user being edited
    setUserData({
      id: user.id,  // This should be user.id, not userId
      fullname: user.fullname,
      birthday: user.birthday,
      email: user.email,
      phone_number: user.phone_number,
    });
  };


  const handleOpenModal = () => {
    setIsModalVisible(true);
  }

  const handleToggleUserStatus = async (id, user) => {
    try {
      // Toggle the user status based on whether they are enabled or disabled
      if (user.deleted === 0) {
        await axios.put('/user/disable', { id });
      } else {
        await axios.put('/user/enable', { id });
      }
  
      // Reload the user list after toggling status
      const userResponse = await axios.get('/user/get-all', config);
      const users = userResponse.data;
  
      // Merge user data with license information
      const mergedDataPromises = users.map(async (user) => {
        const licenseResponse = await axios.post('/licenses/get-by-id', { userId: user.id });
        const licenseData = licenseResponse.data;
  
        return { ...user, license: licenseData };
      });
  
      // Wait for all the merged data to be fetched
      const mergedData = await Promise.all(mergedDataPromises);
  
      // Update the user list with the new merged data
      setUserList(mergedData);  // Set the updated user list here
  
      console.log('User status updated and list reloaded.');
    } catch (error) {
      console.error('Error toggling status or refreshing data:', error);
    }
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

  const handleShowLicense = (license) => {
    setSelectedLicense(license);
    setIsShowLicense(true);
  };

  const handleCloseLicense = () => {
    setIsShowLicense(false);
    setSelectedLicense(null);
  };

  return (
    <div className='user-list-container'>
      {isShowLicense && selectedLicense && (
        <LicenseCard
          licenseData={selectedLicense}
          onClose={handleCloseLicense}
        />
      )}
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
                      type='phone'
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
                    <>
                      <tr key={user.id}>
                        <td>
                          <span>{user?.id}</span>
                        </td>

                        <td style={{ minWidth: '18rem' }}>
                          <div className='td-contain-info'>
                            <div className='user-img-list admin-img-list'>
                              <img src={`${BASEURL}${user.avatar}`} alt='user-img' />
                            </div>
                            <div className='user-info-list'>
                              {editingUserId === user.id ? (
                                <>
                                  <input
                                    type='text'
                                    value={userData.fullname}  // Use userData for binding
                                    id='fullname'
                                    onChange={handleInputChange}  // Update userData state on input change
                                  />
                                  <br />
                                </>
                              ) : (
                                <>
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
                                value={userData.birthday}  // Use userData for binding
                                id='birthday'
                                onChange={handleInputChange}  // Update userData state on input change
                              />
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
                                value={userData.email}  // Use userData for binding
                                id='email'
                                onChange={handleInputChange}  // Update userData state on input change
                              />
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
                                value={userData.phone_number}  // Use userData for binding
                                id='phone_number'
                                onChange={handleInputChange}  // Update userData state on input change
                              />
                            </>
                          ) : (
                            <>
                              <span>{user.phone_number}</span>
                            </>
                          )}
                        </td>

                        <td>
                          <button
                            onClick={() => handleShowLicense(user)}
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
                            className={`switch-icon ${user.deleted === 1 ? 'disable-check' : ''}`}
                            onClick={() => handleToggleUserStatus(user.id, user)}
                          >
                            <FaPowerOff />
                          </div>
                        </td>
                      </tr>
                    </>
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
