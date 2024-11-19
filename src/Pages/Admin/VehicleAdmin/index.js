import React, { useState, useEffect } from 'react';
import './VehicleAdmin.css'
import { FaPowerOff } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";

function VehicleAdmin() {
  const [productImg, setProductImg] = useState('public/assets/images/default_pro_img.jpeg');
  const [isModalVisible, setModalVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false); 
  const [currentLocation, setCurrentLocation] = useState(null); 
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [vehicleData, setVehicleData] = useState({
    vehicle_ID: '',
    user_ID: '',
    user_name: '',
    vehicle_brand: '',
    license_plate: '',
    vehicle_line: '',
    location: '',
    parked_time: '',
    KM_per_day: '',
    deleted: '',
  });

  const [vehicleList, setVehicleList] = useState([
    {
      vehicle_ID: 'VEH001',
      user_ID: 'U001',
      user_name: 'John Doe',
      vehicle_brand: 'Toyota',
      license_plate: 'ABC-1234',
      vehicle_line: 'Corolla',
      location: { lat: 34.0522, lng: -118.2437 }, 
      parked_time: '10:00 AM',
      KM_per_day: 50,
      deleted: 0,
    },
    {
      vehicle_ID: 'VEH002',
      user_ID: 'U002',
      user_name: 'Jane Smith',
      vehicle_brand: 'Honda',
      license_plate: 'XYZ-5678',
      vehicle_line: 'Civic',
      location: { lat: 34.0522, lng: -118.2437 }, 
      parked_time: '11:00 AM',
      KM_per_day: 30,
      deleted: 0,
    },
    {
      vehicle_ID: 'VEH003',
      user_ID: 'U003',
      user_name: 'Alice Johnson',
      vehicle_brand: 'Ford',
      license_plate: 'LMN-9101',
      vehicle_line: 'Focus',
      location: { lat: 34.0522, lng: -118.2437 }, 
      parked_time: '12:00 PM',
      KM_per_day: 40,
      deleted: 0,
    },
    {
      vehicle_ID: 'VEH004',
      user_ID: 'U004',
      user_name: 'Bob Brown',
      vehicle_brand: 'Chevrolet',
      license_plate: 'OPQ-2345',
      vehicle_line: 'Malibu',
      location: { lat: 34.0522, lng: -118.2437 }, 
      parked_time: '1:00 PM',
      KM_per_day: 20,
      deleted: 0,
    },
    {
      vehicle_ID: 'VEH005',
      user_ID: 'U005',
      user_name: 'Charlie Davis',
      vehicle_brand: 'Nissan',
      license_plate: 'RST-6789',
      vehicle_line: 'Altima',
      location: { lat: 34.0522, lng: -118.2437 }, 
      parked_time: '2:00 PM',
      KM_per_day: 25,
      deleted: 0,
    },
  ]);

  const handleLocateClick = (location) => {
    setCurrentLocation(location); 
    setMapVisible(true); 
  };

  const handleCloseMap = () => {
    setMapVisible(false); 
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVehicleData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSaveClick = () => {
    // Logic to save the edited product
  };

  const handleCancelClick = () => {
    setEditingVehicleId(null);
  };

  const handleEditClick = (vehicle_ID, vehicle) => {
    setEditingVehicleId(vehicle_ID);
    setVehicleData(vehicle);
  };

  const handleToggleProStatus = (vehicle_ID, vehicle) => {

  };

  const handleAddChange = (e) => {
    const { id, value } = e.target;
    setVehicleData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCatChange = (e) => {
    // Logic to handle category change
  };

  const handleAddClick = () => {
 
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
                <h3>Vehicle List</h3>
              </div>
            </div>
            <div className='user-list-content'>
              <div className='add-product-btn' onClick={handleOpenModal}>
                <IoAdd /> Add more vehicle
              </div>
              <div className='list-table-container'>
                <table className='table user-list-table'>
                  <thead>
                    <tr>
                      <th>Vehicle ID</th>
                      <th>User ID</th>
                      <th>User Name</th>
                      <th>Brand</th>
                      <th>License Plate</th>
                      <th>Line</th>
                      <th>Location</th>
                      <th>Parked Time</th>
                      <th>KM/Day</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleList.map((vehicle) => (
                      <tr key={vehicle.vehicle_ID}>
                        {/* <td>{vehicle.vehicle_ID}</td>
                        <td>{vehicle.user_ID}</td>
                        <td>{vehicle.user_name}</td>
                        <td>{vehicle.vehicle_brand}</td>
                        <td>{vehicle.license_plate}</td>
                        <td>{vehicle.vehicle_line}</td>
                        <td>
                          {vehicle.location}
                          <button onClick={() => handleLocateClick(vehicle.location)}>Locate</button>
                        </td>
                        <td>{vehicle.parked_time}</td>
                        <td>{vehicle.KM_per_day}</td>
                        <td>{vehicle.status}</td> */}
                        <td className='info-long-text'>
                          <div className='td-contain-info'>
                            {/* <div className='user-img-list pro-img-list'>
                              <img src={pro.thumbnail} alt='pro-img' />
                            </div> */}
                            <div className='user-info-list'>
                              {editingVehicleId === vehicle.vehicle_ID ? (
                                <>
                                  <input
                                    type='text'
                                    value={vehicleData.vehicle_ID}
                                    id='title'
                                    onChange={handleInputChange}
                                  /><br />
                                </>
                              ) : (
                                <>
                                  <span>{vehicle.vehicle_ID}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className='long-text-container'>
                          {editingVehicleId === vehicle.vehicle_ID ? (
                            <input
                              type='text'
                              value={vehicleData.user_ID}
                              id='user_ID'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{vehicle.user_ID}</span>
                          )}
                        </td>
                        <td className='long-text-container'>
                          {editingVehicleId === vehicle.vehicle_ID ? (
                            <input
                              type='text'
                              value={vehicleData.user_name}
                              id='user_name'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{vehicle.user_name}</span>
                          )}
                        </td>
                        <td className='long-text-container'>
                          {editingVehicleId === vehicle.vehicle_ID ? (
                            <input
                              type='text'
                              value={vehicleData.vehicle_brand}
                              id='vehicle_brand'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{vehicle.vehicle_brand}</span>
                          )}
                        </td>
                        <td>
                          {editingVehicleId === vehicle.vehicle_ID ? (
                            <input
                              type='text'
                              value={vehicleData.license_plate}
                              id='license_plate'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{vehicle.license_plate}</span>
                          )}
                        </td>
                        <td>
                          {editingVehicleId === vehicle.vehicle_ID ? (
                            <input
                              type='text'
                              value={vehicleData.vehicle_line}
                              id='vehicle_line'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{vehicle.vehicle_line}</span>
                          )}
                        </td>

                        <td>
                          {editingVehicleId === vehicle.vehicle_ID ? (
                            <input
                              type='text'
                              value={vehicleData.location}
                              id='location'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <td><button className='current-location-btn' onClick={() => handleLocateClick(vehicle.location)}>Current Location</button>
                            </td>
                           )}
                        </td>

                        <td>
                          {editingVehicleId === vehicle.vehicle_ID ? (
                            <input
                              type='text'
                              value={vehicleData.parked_time}
                              id='parked_time'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{vehicle.parked_time}</span>
                          )}
                        </td>

                        <td>
                          {editingVehicleId === vehicle.vehicle_ID ? (
                            <input
                              type='text'
                              value={vehicleData.KM_per_day}
                              id='KM_per_day'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{vehicle.KM_per_day}</span>
                          )}
                        </td>

                        <td>
                          <span>{vehicle.deleted}</span>
                        </td>

                        <td>
                          {editingVehicleId === vehicle.vehicle_ID ? (
                            <>
                              <button className='edit-list-btn save-list-btn' onClick={handleSaveClick}>Save</button>
                              <button className='edit-list-btn cancel-list-btn' onClick={handleCancelClick}>Cancel</button>
                            </>
                          ) : (
                            <button className='edit-list-btn' onClick={() => handleEditClick(vehicle.vehicle_ID, vehicle)}>Edit</button>
                          )}
                        </td>
                        <td>
                          <div
                            className={`switch-icon ${vehicle.deleted === 1 ? 'disable-check' : ''}`}
                            onClick={() => handleToggleProStatus(vehicle.vehicle_ID, vehicle)}
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
      {/* Map Popup */}
      {mapVisible && currentLocation && (
        <div className='map-popup'>
          <div className='map-header'>
            <h3>Vehicle Location</h3>
            <button onClick={handleCloseMap}>Close</button>
          </div>
          <div className='map-content'>
            {/* Google Maps Embed or Component */}
            <iframe
              width="600"
              height="450"
              src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${currentLocation.lat},${currentLocation.lng}&zoom=15`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* modal add */}
      <div className={`modal-add ${isModalVisible ? 'modal-visible' : 'modal-hidden'}`}>
        <div className='modal-container'>
          <div className='modal-header'>
            <h3>ADD VEHICLE</h3>
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
                value={vehicleData.vehicle_ID !== null ? vehicleData.vehicle_ID : 'null'}
                onChange={(e) => {
                  handleCatChange(e);
                  handleInputChange(e);
                }}
              >
                <option value='null'>Select Category</option>
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
