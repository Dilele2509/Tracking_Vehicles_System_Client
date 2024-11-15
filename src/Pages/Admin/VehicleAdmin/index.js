import React, { useState, useEffect } from 'react';
import './VehicleAdmin.css'
import { FaPowerOff } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

function VehicleAdmin() {
  const [productImg, setProductImg] = useState('public/assets/images/default_pro_img.jpeg');
  const [isModalVisible, setModalVisible] = useState(false);
  const [proList, setProList] = useState([]);
  const [catList, setCatList] = useState([]);
  const [editingProId, setEditingProId] = useState(null);
  const [addData, setAddData] = useState({
    category_id: '',
    title: '',
    price: '',
    ingredients: '',
    thumbnail: '',
    description: '',
    quantity: '',
  })
  const [proData, setProData] = useState({
    product_id: '',
    category_id: '',
    title: '',
    price: '',
    ingredients: '',
    thumbnail: '',
    description: '',
    quantity: '',
    deleted: '',
    sold: ''
  });
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSaveClick = () => {
    // Logic to save the edited product
  };

  const handleCancelClick = () => {
    setEditingProId(null);
  };

  const handleEditClick = (productId, product) => {
    setEditingProId(productId);
    setProData(product);
  };

  const handleToggleProStatus = (productId, product) => {
    // Logic to toggle product status
  };

  const handleAddChange = (e) => {
    const { id, value } = e.target;
    setAddData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCatChange = (e) => {
    // Logic to handle category change
  };

  const handleAddClick = () => {
    // Logic to add a new product
  };

  const handleCancelModal = () => {
    setModalVisible(false);
  };


  return (
    <>
      <div className='user-list-container'>
        <div className='row-item'>
          <div className='user-list-item'>
            <div className='user-list-header'>
              <div className='user-list-title'>
                <h3>Product list</h3>
              </div>
            </div>
            <div className='user-list-content'>
              <div className='add-product-btn' onClick={handleOpenModal}>
                <IoAdd /> Add more product
              </div>
              <div className='list-table-container'>
                <table className='table user-list-table'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Information</th>
                      <th>Description</th>
                      <th>Ingredients</th>
                      <th>Thumbnail</th>
                      <th>Quantity</th>
                      <th className='large-space'>Sold</th>
                      <th className='large-space'>Deleted</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {proList.map((pro) => (
                      <tr key={pro.product_id}>
                        <td>
                          <span>{pro.product_id}</span>
                        </td>
                        <td className='info-long-text'>
                          <div className='td-contain-info'>
                            <div className='user-img-list pro-img-list'>
                              <img src={pro.thumbnail} alt='pro-img' />
                            </div>
                            <div className='user-info-list'>
                              {editingProId === pro.product_id ? (
                                <>
                                  <input
                                    type='text'
                                    value={proData.title}
                                    id='title'
                                    onChange={handleInputChange}
                                  /><br />
                                  <input
                                    type='text'
                                    value={proData.category_id}
                                    id='category_id'
                                    onChange={handleInputChange}
                                  /><br />
                                  <input
                                    type='text'
                                    id='price'
                                    value={proData.price}
                                    onChange={handleInputChange}
                                  />
                                </>
                              ) : (
                                <>
                                  <h4>{pro.title}</h4>
                                  <span>Category_id: {pro.category_id}</span><br />
                                  <span>{pro.price} VND</span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className='long-text-container'>
                          {editingProId === pro.product_id ? (
                            <input
                              type='text'
                              value={proData.description}
                              id='description'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{pro.description}</span>
                          )}
                        </td>
                        <td className='long-text-container'>
                          {editingProId === pro.product_id ? (
                            <input
                              type='text'
                              value={proData.ingredients}
                              id='ingredients'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{pro.ingredients}</span>
                          )}
                        </td>
                        <td className='long-text-container'>
                          {editingProId === pro.product_id ? (
                            <input
                              type='text'
                              value={proData.thumbnail}
                              id='thumbnail'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{pro.thumbnail}</span>
                          )}
                        </td>
                        <td>
                          {editingProId === pro.product_id ? (
                            <input
                              type='text'
                              value={proData.quantity}
                              id='quantity'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{pro.quantity}</span>
                          )}
                        </td>
                        <td >
                          <span>{pro.sold}</span>
                        </td>
                        <td>
                          <span>{pro.deleted}</span>
                        </td>
                        <td>
                          {editingProId === pro.product_id ? (
                            <>
                              <button className='edit-list-btn save-list-btn' onClick={handleSaveClick}>Save</button>
                              <button className='edit-list-btn cancel-list-btn' onClick={handleCancelClick}>Cancel</button>
                            </>
                          ) : (
                            <button className='edit-list-btn' onClick={() => handleEditClick(pro.product_id, pro)}>Edit</button>
                          )}
                        </td>
                        <td>
                          <div
                            className={`switch-icon ${pro.deleted === 1 ? 'disable-check' : ''}`}
                            onClick={() => handleToggleProStatus(pro.product_id, pro)}
                          >
                            <FaPowerOff />
                          </div>
                        </td>
                      </tr>
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
            <h3>ADD PRODUCT</h3>
          </div>
          <div className='modal-content'>
            <div className='modal-input-area'>
              <div className='upload-product-img change-ava-area'>
                <div className='default-img'>
                  <img src={productImg} alt='default-product-img' />
                </div>
                <div className='upload-file-container'>
                  <label htmlFor='file-upload'>Input File <MdOutlineFileUpload className='upload-icon' /></label>
                  <input id='thumbnail' type="file" accept=".png, .jpg, .jpeg" onChange={handleAddChange} />
                </div>
              </div>
              <input
                type='text'
                placeholder='Product title'
                id='title'
                onChange={handleAddChange}
              />
              <select
                value={proData.category_id !== null ? proData.category_id : 'null'}
                onChange={(e) => {
                  handleCatChange(e);
                  handleInputChange(e);
                }}
              >
                <option value='null'>Select Category</option>
                {catList.map((cat) => (
                  cat.deleted != 1 && (
                    <>
                      <option value={cat.category_id}>{cat.category_name}</option>
                    </>
                  )
                ))}
              </select>
              <input
                type='text'
                placeholder='Price'
                id='price'
                onChange={handleAddChange}
              />
              <input
                type='text'
                placeholder='Description'
                id='description'
                onChange={handleAddChange}
              />
              <input
                type='text'
                placeholder='Ingredients'
                id='ingredients'
                onChange={handleAddChange}
              />
              <input
                type='text'
                placeholder='Quantity in stock'
                id='quantity'
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

export default VehicleAdmin;
