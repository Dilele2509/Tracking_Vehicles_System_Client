import './Vehicles.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../../api/axios';

function Vehicles() {
    const src = 'http://103.77.209.93:3001/';
    const owner_id = 'USER001';
    const [vehicles, getVehicles] = useState([]);

    // Helper function to convert 0/1 to false/true
    const convertToBoolean = (value) => {
        return value === 1 ? true : false;
    };

    const convertStatusValue = (value) => {
        return value === 1 ? 'Rented' : 'Not Rented';
    };

    useEffect(() => {
        console.log(owner_id);
        axios.post('/vehicle-id', { id: owner_id })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    getVehicles(response.data);
                } else {
                    console.error('API response does not contain an array:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching vehicle data:', error);
            });
    }, []);

    return (
        <div className='vehicle-menu-container'>
            <div className='list-title'>Vehicle List</div>
            <div className='main-contain-menu'>
                <div className='menu-vehicles'>
                    <div role='list' className='_2-col-grid'>
                        {vehicles.map((vehicle) => (
                            <div key={vehicle.id} role="listItem" className="menu-item transform-shift">
                                <Link to={`/vehicle/detail/`} className="item-vehicle">
                                    <div className='img-wrap'>
                                        <img className='img-item' src={vehicle.thumbnail} alt={'vehicle thumbnail'} />
                                    </div>
                                    <div className='title-name-type'>
                                        <div>
                                            <h2 className='name-title'>{vehicle.license_plate}</h2>
                                            <h3 className='name-title'>{vehicle.vehicle_brand} {vehicle.vehicle_line}</h3>
                                        </div>
                                        <div>
                                            <div className='title-info status'>
                                                <span>Status: </span>
                                                {/* Convert status value to boolean */}
                                                <p>{convertStatusValue(vehicle.status).toString()}</p>
                                            </div>
                                            <div className='title-info parked'>
                                                <span>Parked Time: </span>
                                                <p>{vehicle.parked_time}</p>
                                            </div>
                                            <div className='title-info kilometer'>
                                                <span>Km Today: </span>
                                                <p>{vehicle.km_per_day}Km</p>
                                            </div>
                                            <div className='title-info deleted'>
                                                <span>Deleted: </span>
                                                {/* Convert deleted value to boolean */}
                                                <p>{convertToBoolean(vehicle.deleted).toString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Vehicles;
