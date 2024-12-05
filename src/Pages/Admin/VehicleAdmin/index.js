import React, { useState, useEffect } from 'react';
import './VehicleAdmin.css'
import { FaPowerOff } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { MdOutlineFileUpload, MdCameraAlt } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from '../../../api/axios';
const baseIP = '103.77.209.110'


function VehicleAdmin() {
  const notify = (message, type = "info") => {
    toast(message, { type });
  };
  const BASEURL = "http://103.77.209.110:3001";
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [modalThumbnail, setModalThumbnail] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [vehicleData, setVehicleData] = useState({
    id: '',
    device_id: '',
    user_id: '',
    vehicle_brand: '',
    license_plate: '',
    vehicle_line: '',
  });

  const [addData, setAddData] = useState({
    device_id: '',
    vehicle_brand: '',
    license_plate: '',
    vehicle_line: '',
  })

  const [vehicleList, setVehicleList] = useState([]);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  }

  // Kết nối WebSocket
  useEffect(() => {
    const ws = new WebSocket(`ws://${baseIP}:3002`);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.event === 'newData') {
        //console.log('websocket: ', data.data);
        // Cập nhật tọa độ mới từ WebSocket
        if (vehicleList.length > 0) {
          const updatedVehicles = vehicleList.map((vehicle) => {
            if (data.data.device_id === vehicle.device_id) {
              return {
                ...vehicle,
                latitude: parseFloat(data.data.latitude),
                longitude: parseFloat(data.data.longitude),
                speed: data.data.speed,
                time: data.data.time,
                date: data.data.date,
              };
            }
            return vehicle;
          });
          setVehicleList(updatedVehicles);
        }
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  },[]); 

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
    if (!latitude || !longitude) {
      /* alert("Location data is not available for this vehicle."); */
      notify('Location data is not available for this vehicle', 'warning');
      return;
    }

    try {
      setCurrentLocation({ latitude, longitude });
      setMapVisible(true);
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const handleCloseMap = () => {
    setMapVisible(false);
  };

  const handleModalFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      setModalThumbnail(file);
    }
  };


  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVehicleData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleFileInput = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    if (file) setSelectedThumbnail(file);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();

      // Check if a new thumbnail is selected
      if (selectedThumbnail) {
        //console.log(selectedThumbnail, vehicleData.id);
        formData.append("thumbnail", selectedThumbnail);
        formData.append("id", vehicleData.id);

        //console.log(formData);
        // Call the API to upload the new thumbnail
        const thumbnailResponse = await axios.post(
          "/vehicles/update-thumbnail",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            },
            withCredentials: true
          }
        );

        //console.log('response: ',thumbnailResponse);

        if (thumbnailResponse.data.status === 200) {
          notify("Thumbnail updated successfully!", "success");

          // Prepare the data to update vehicle details
          const updatedVehicleData = {
            id: vehicleData.id,
            device_id: vehicleData.device_id,
            user_id: vehicleData.user_id,
            vehicle_brand: vehicleData.vehicle_brand,
            license_plate: vehicleData.license_plate,
            vehicle_line: vehicleData.vehicle_line,
          };

          // Call the API to update vehicle details
          const vehicleResponse = await axios.put(
            "/vehicles/update",
            updatedVehicleData,
            config
          );

          console.log(vehicleResponse.data);
          if (vehicleResponse.data.status === 200) {
            notify("Vehicle details updated successfully!", "success");

            // Refresh the vehicle list
            const vehicleListResponse = await axios.get("/vehicles/get-all", config);
            setVehicleList(vehicleListResponse.data);

            // Exit editing mode
            setEditingVehicleId(null);
          } else {
            throw new Error("Failed to update vehicle details");
          }
        } else {
          notify('Failed to update vehicle details', "error");
          throw new Error("Failed to update");
        }
      }
    } catch (error) {
      console.error("Error saving vehicle data:", error);
      notify("Failed to save vehicle data. Please try again.", "error");
    }
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
    setAddData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleAddClick = async () => {
    try {
      const formData = new FormData();

      // Add modal-specific thumbnail
      if (modalThumbnail) {
        formData.append("thumbnail", modalThumbnail);
      }

      // Add the additional data as a JSON string
      formData.append("data", JSON.stringify(addData));
      console.log('addData', addData);
      // Send the request to the server
      const response = await axios.post('/vehicles/add', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      // Check response status
      if (response.data.status === 200) {
        notify("Vehicle added successfully!", "success");

        // Refresh the vehicle list
        const vehicleListResponse = await axios.get("/vehicles/get-all", config);
        setVehicleList(vehicleListResponse.data);

        // Reset the form and close the modal
        setAddData({
          device_id: '',
          vehicle_brand: '',
          license_plate: '',
          vehicle_line: '',
        });
        setModalThumbnail(null); // Clear modal-specific thumbnail state
        setModalVisible(false);
      } else {
        notify("Failed to add vehicle. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      notify("Failed to add vehicle. Please check your inputs and try again.", "error");
    }
  };

  const handleCancelModal = () => {
    setModalThumbnail(null); // Clear modal-specific thumbnail state
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
                      <th>Image</th>
                      <th>Vehicle Brand</th>
                      <th>Vehicle Line</th>
                      <th>License Plate</th>
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
                        <td className='info-long-text'>
                          <div className='td-contain-info'>
                            <div className='user-info-list'>
                              <span>{vehicle.id}</span>
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
                                    id='device_id'
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

                        <td style={{ minWidth: '10rem' }}>
                          {editingVehicleId === vehicle.id ? (
                            <div style={{ position: 'relative', textAlign: 'center' }}>
                              <button
                                style={{ borderRadius: '5px', overflow: 'hidden', position: 'relative' }}
                                disabled
                              >
                                <img
                                  className="thumbnail"
                                  src={selectedThumbnail ? URL.createObjectURL(selectedThumbnail) : `${BASEURL}${vehicle.thumbnail}`}
                                  alt="Vehicle Thumbnail"
                                />
                                <div className="change-photo">
                                  <MdCameraAlt style={{ color: 'white' }} />
                                  <p>change photo</p>
                                </div>
                              </button>
                              <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  width: '100%',
                                  height: '100%',
                                  opacity: 0,
                                  cursor: 'pointer',
                                }}
                                onChange={(e) => handleFileInput(e)}
                              />
                            </div>
                          ) : (
                            <img
                              className="thumbnail"
                              src={`${BASEURL}${vehicle.thumbnail}`}
                              alt="Vehicle Thumbnail"
                            />
                          )}
                        </td>

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

                        <td style={{ minWidth: '10rem' }}>
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
                          <button className='current-location-btn' onClick={() => handleLocateClick(vehicle.latitude, vehicle.longitude)}>Current Location</button>
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <span>{vehicle.speed ? vehicle.speed : 'No data yet'}</span>
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <span>{vehicle.parked_time}</span>
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <span>{vehicle.km_per_day}</span>
                        </td>

                        <td style={{ textAlign: 'center' }}>
                          <span>{vehicle.date && vehicle.time ? `${vehicle.date} ${vehicle.time}` : 'No data yet'}</span>
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
                  <img
                    src={modalThumbnail ? URL.createObjectURL(modalThumbnail) : `${BASEURL}/public/assets/Images/car.png`}
                    alt='default-vehicle-img'
                  />
                </div>
                <div className='upload-file-container'>
                  <label htmlFor='modal-file-upload'>Input File <MdOutlineFileUpload className='upload-icon' /></label>
                  <input id='modal-file-upload' type="file" accept=".png, .jpg, .jpeg" onChange={handleModalFileInput} />
                </div>
              </div>
              <input
                type='text'
                placeholder='Vehicle Brand'
                id='vehicle_brand'
                onChange={handleAddChange}
              />
              <input
                type='text'
                placeholder='Vehicle Line'
                id='vehicle_line'
                onChange={handleAddChange}
              />
              <input
                type='text'
                placeholder='License Plate'
                id='license_plate'
                onChange={handleAddChange}
              />
              <input
                type='text'
                placeholder='GPS Device ID'
                id='device_id'
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

      <ToastContainer />
    </>
  );
}

export default VehicleAdmin;




