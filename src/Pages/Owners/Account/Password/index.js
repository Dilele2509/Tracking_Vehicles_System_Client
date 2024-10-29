import React, { useState } from 'react';
import './Password.css';
import { FaAngleRight } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

function Password() {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [infoList, setInfoList] = useState([
    {
      index: 1,
      title: 'Password Management',
      content: [
        {
          title: 'Change Password',
          content: '123456789',
          type: 'password'
        }
      ]
    }
  ]);

  const [editContent, setEditContent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleOpenModal = (index) => {
    setOpenModalIndex(openModalIndex === index ? null : index);
  };

  const handleEdit = (index, idx) => {
    setEditContent({
      ...editContent,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setIsEditing(`${index}-${idx}`);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e, field) => {
    setEditContent({
      ...editContent,
      [field]: e.target.value
    });
  };

  const handleSave = (index, idx) => {
    // Add password validation logic if needed
    if (editContent.newPassword !== editContent.confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    const updatedInfoList = infoList.map((infoItem) => {
      if (infoItem.index === index) {
        const updatedContent = infoItem.content.map((item, contentIdx) => {
          if (contentIdx === idx) {
            return { ...item, content: editContent.newPassword };
          }
          return item;
        });
        return { ...infoItem, content: updatedContent };
      }
      return infoItem;
    });

    setInfoList(updatedInfoList);
    setIsEditing(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='information-container'>
      <label className='information-title'>Personal Password</label>
      <div className='edit-information-box'>
        {infoList.map((infoItem) => (
          <React.Fragment key={infoItem.index}>
            <button onClick={() => handleOpenModal(infoItem.index)} className='edit-box-item'>
              {infoItem.title}
              <FaAngleRight className='btn-icon' />
            </button>
            {openModalIndex === infoItem.index && (
              <div className='modal-edit-info'>
                {infoItem.content.map((content, idx) => (
                  <div key={idx} className='content-item'>
                    <label>{content.title}</label>
                    {isEditing === `${infoItem.index}-${idx}` ? (
                      <div className='edit-info-area'>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={editContent.currentPassword}
                          onChange={(e) => handleInputChange(e, 'currentPassword')}
                          placeholder="Current Password"
                          className='edit-input'
                        />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={editContent.newPassword}
                          onChange={(e) => handleInputChange(e, 'newPassword')}
                          placeholder="New Password"
                          className='edit-input'
                        />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={editContent.confirmPassword}
                          onChange={(e) => handleInputChange(e, 'confirmPassword')}
                          placeholder="Confirm Password"
                          className='edit-input'
                        />
                        <button
                          onClick={toggleShowPassword}
                          className="toggle-password-btn"
                        >
                          {showPassword ? 'Hide Password' : 'Show Password'}
                        </button>

                        <div>
                          <button
                            onClick={() => handleSave(infoItem.index, idx)}
                            className="mr-2 bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCloseEdit}
                            className="bg-gray-400 text-sm hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button className='edit-btn' onClick={() => handleEdit(infoItem.index, idx)}>
                          {'*****'} <RiEdit2Fill className='edit-icon-btn' />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Password;
