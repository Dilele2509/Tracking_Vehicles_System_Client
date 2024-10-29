import React, { useState } from 'react';
import './Information.css';
import { FaAngleRight } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

function Information() {
  const [openModalIndex, setOpenModalIndex] = useState(null);
  const [infoList, setInfoList] = useState([
    {
      index: 1,
      title: 'Contact Information',
      content: [
        {
          title: 'Email',
          content: 'levy3443@gmail.com',
          type: 'email'
        },
        {
          title: 'Phone number',
          content: "0966480829",
          type: 'number'
        }
      ]
    },
    {
      index: 2,
      title: 'Day of Birth',
      content: [{
        title: 'Day of Birth',
        content: '2003-09-25',
        type: 'date'
      }]
    },
    {
      index: 3,
      title: 'Account Information',
      content: [{
        title: 'Username',
        content: 'Vy Le',
        type: 'text'
      }]
    }
  ]);

  const [editContent, setEditContent] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenModal = (index) => {
    setOpenModalIndex(openModalIndex === index ? null : index);
  };

  const handleEdit = (index, idx) => {
    setEditContent({
      ...editContent,
      [`${index}-${idx}`]: infoList[index - 1].content[idx].content
    });
    setIsEditing(`${index}-${idx}`);
  };

  const handleCloseEdit = ()=>{
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e, index, idx) => {
    setEditContent({
      ...editContent,
      [`${index}-${idx}`]: e.target.value
    });
  };

  const handleSave = (index, idx) => {
    const updatedInfoList = infoList.map((infoItem) => {
      if (infoItem.index === index) {
        const updatedContent = infoItem.content.map((item, contentIdx) => {
          if (contentIdx === idx) {
            return { ...item, content: editContent[`${index}-${idx}`] };
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

  return (
    <div className='information-container'>
      <label className='information-title'>Personal Information</label>
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
                          type={content.type}
                          value={editContent[`${infoItem.index}-${idx}`] || ''}
                          onChange={(e) => handleInputChange(e, infoItem.index, idx)}
                          className='edit-input'
                        />
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
                          {content.content} <RiEdit2Fill className='edit-icon-btn' />
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

export default Information;
