import React, { useState, useEffect } from 'react';
import './VehicleAdmin.css'
import { FaPowerOff } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { MdOutlineFileUpload } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from '../../../api/axios';


function VehicleAdmin() {
  const [vehicleImg, setVehicleImg] = useState('/assets/Images/car.png');
  const GGMap_API = process.env.GGMap_API
  const [isModalVisible, setModalVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [vehicleData, setVehicleData] = useState({
    id: '',
    user_id: '',
    user_name: '',
    vehicle_brand: '',
    license_plate: '',
    vehicle_line: '',
    location: '',
    parked_time: '',
    km_per_day: '',
    deleted: '',
  });

  const [vehicleList, setVehicleList] = useState([]);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Fetch all vehicles
        const vehicleResponse = await axios.get('/vehicles/get-all', config);
        const vehicles = vehicleResponse.data;

        //Fetch device data for each vehicle
        const mergedDataPromises = vehicles.map(async (vehicle) => {
          const deviceResponse = await axios.post('/device/get-latest', {
            device_id: vehicle.device_id,
          });
          const deviceData = deviceResponse.data;

          // Combine data, ensuring vehicle id is preserved
          const { id: deviceId, ...restDeviceData } = deviceData; // Rename device id if needed
          return { id: vehicle.id, ...vehicle, ...restDeviceData }; // Use vehicle.id
        });

        //Wait for all promises to resolve
        const mergedData = await Promise.all(mergedDataPromises);

        // Update state
        setVehicleList(mergedData);
        console.log('Merged List:', mergedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLocateClick = async (latitude, longitude) => {
    try {
      setCurrentLocation({ latitude: latitude, longitude: longitude });
      setMapVisible(true);
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
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

  const handleEditClick = (id, vehicle) => {
    setEditingVehicleId(id);
    setVehicleData(vehicle);
  };

  const handleToggleProStatus = async (id, vehicle) => {
    try {
      if (vehicle.deleted === 0) {
        await axios.put('/vehicles/disable', { id });
      } else {
        await axios.put('/vehicles/enable', { id });
      }
  
      // Reload the vehicle list after toggling status
      const vehicleResponse = await axios.get('/vehicles/get-all', config);
      const vehicles = vehicleResponse.data;
  
      const mergedDataPromises = vehicles.map(async (vehicle) => {
        const deviceResponse = await axios.post('/device/get-latest', {
          device_id: vehicle.device_id,
        });
        const deviceData = deviceResponse.data;
  
        return { id: vehicle.id, ...vehicle, ...deviceData };
      });
  
      const mergedData = await Promise.all(mergedDataPromises);
      setVehicleList(mergedData);
  
      console.log('Vehicle status updated and list reloaded.');
    } catch (error) {
      console.error('Error toggling status or refreshing data:', error);
    }
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

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  });


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
                      <th>GPS Device ID</th>
                      <th>Driver ID</th>
                      {/* <th>User Name</th> */}
                      <th>Brand</th>
                      <th>License Plate</th>
                      <th>Line</th>
                      <th>Location</th>
                      <th>Speed (Km/h)</th>
                      <th>Parked Time</th>
                      <th>KM/Day</th>
                      <th>Update At</th>
                      <th>Status</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleList.map((vehicle) => (
                      <tr key={vehicle.id}>
                        {/* <td>{vehicle.id}</td>
                        <td>{vehicle.user_id}</td>
                        <td>{vehicle.user_name}</td>
                        <td>{vehicle.vehicle_brand}</td>
                        <td>{vehicle.license_plate}</td>
                        <td>{vehicle.vehicle_line}</td>
                        <td>
                          {vehicle.location}
                          <button onClick={() => handleLocateClick(vehicle.location)}>Locate</button>
                        </td>
                        <td>{vehicle.parked_time}</td>
                        <td>{vehicle.km_per_day}</td>
                        <td>{vehicle.status}</td> */}
                        <td className='info-long-text'>
                          <div className='td-contain-info'>
                            <div className='user-info-list'>
                              {editingVehicleId === vehicle.id ? (
                                <>
                                  <input
                                    type='text'
                                    value={vehicleData.id}
                                    id='title'
                                    onChange={handleInputChange}
                                  /><br />
                                </>
                              ) : (
                                <>
                                  <span>{vehicle.id}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className='info-long-text'>
                          <div className='td-contain-info'>
                            <div className='user-info-list'>
                              {editingVehicleId === vehicle.id ? (
                                <>
                                  <input
                                    type='text'
                                    value={vehicleData.device_id}
                                    id='title'
                                    onChange={handleInputChange}
                                  /><br />
                                </>
                              ) : (
                                <>
                                  <span>{vehicle.device_id}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className='long-text-container'>
                          {editingVehicleId === vehicle.id ? (
                            <input
                              type='text'
                              value={vehicleData.user_id}
                              id='user_id'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{vehicle.user_id}</span>
                          )}
                        </td>
                        {/* <td className='long-text-container'>
                          {editingVehicleId === vehicle.id ? (
                            <input
                              type='text'
                              value={vehicleData.user_name}
                              id='user_name'
                              onChange={handleInputChange}
                            />
                          ) : (
                            <span>{vehicle.user_name}</span>
                          )}
                        </td> */}
                        <td className='long-text-container'>
                          {editingVehicleId === vehicle.id ? (
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
                          {editingVehicleId === vehicle.id ? (
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
                          {editingVehicleId === vehicle.id ? (
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
                          <button className='current-location-btn' onClick={() => handleLocateClick(vehicle.latitude, vehicle.longitude)}>Current Location</button>
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <span>{vehicle.speed}</span>
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <span>{vehicle.parked_time}</span>
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <span>{vehicle.km_per_day}</span>
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <span>{vehicle.date}  {vehicle.time}</span>
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <span>{vehicle.deleted}</span>
                        </td>

                        <td>
                          {editingVehicleId === vehicle.id ? (
                            <>
                              <button className='edit-list-btn save-list-btn' onClick={handleSaveClick}>Save</button>
                              <button className='edit-list-btn cancel-list-btn' onClick={handleCancelClick}>Cancel</button>
                            </>
                          ) : (
                            <button className='edit-list-btn' onClick={() => handleEditClick(vehicle.id, vehicle)}>Edit</button>
                          )}
                        </td>
                        <td>
                          <div
                            className={`switch-icon ${vehicle.deleted === 1 ? 'disable-check' : ''}`}
                            onClick={() => handleToggleProStatus(vehicle.id, vehicle)}
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
            <MapContainer
              center={[latitude, longitude]}
              zoom={15}
              style={{ height: "600px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[latitude, longitude]}>
                <Popup>
                  {vehicleData.vehicle_brand} {vehicleData.vehicle_line}
                  <br />
                  License Plate: {vehicleData.license_plate}
                  <br />
                  Latitude: {latitude}
                  <br />
                  Longitude: {longitude}
                </Popup>
              </Marker>
            </MapContainer>
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
                  <img src={vehicleImg} alt='default-vehicle-img' />
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
                value={vehicleData.id !== null ? vehicleData.id : 'null'}
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




