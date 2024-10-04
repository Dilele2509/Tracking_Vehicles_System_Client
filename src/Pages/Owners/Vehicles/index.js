import './Vehicles.css'
import React from 'react';
import { Link } from 'react-router-dom'
const porsche = '/assets/Images/porsche.jpg'


function Vehicles() {
    return (
        <div className='vehicle-menu-container'>
            <div className='list-title'>Vehicle List</div>
            <div className='main-contain-menu'>
                <div className='menu-vehicles'>
                    <div role='list' className='_2-col-grid'>
                        <div role="listItem" className="menu-item transform-shift">
                            <Link to={`/vehicle/detail/`} className="item-vehicle">
                                <div className='img-wrap'>
                                    <img className='img-item' src={porsche} alt={'hachi'} />
                                </div>
                                <div className='title-name-type'>
                                    <div>
                                        <h2 className='name-title'>65B2-54558</h2>
                                        <h3 className='name-title'>Porsche 911</h3>
                                    </div>
                                    <div>
                                        <div className='title-info status'>
                                            <span>Status: </span>
                                            <p>not rented</p>
                                        </div>
                                        <div className='title-info parked'>
                                            <span>Parked Time: </span>
                                            <p>00:30:25</p>
                                        </div>
                                        <div className='title-info kilometer'>
                                            <span>Km Today: </span>
                                            <p>25km</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div role="listItem" className="menu-item transform-shift">
                            <Link to={`/vehicle/detail/`} className="item-vehicle">
                                <div className='img-wrap'>
                                    <img className='img-item' src={porsche} alt={'hachi'} />
                                </div>
                                <div className='title-name-type'>
                                    <div>
                                        <h2 className='name-title'>65B2-54558</h2>
                                        <h3 className='name-title'>Porsche 911</h3>
                                    </div>
                                    <div>
                                        <div className='title-info status'>
                                            <span>Status: </span>
                                            <p>not rented</p>
                                        </div>
                                        <div className='title-info parked'>
                                            <span>Parked Time: </span>
                                            <p>00:30:25</p>
                                        </div>
                                        <div className='title-info kilometer'>
                                            <span>Km Today: </span>
                                            <p>25km</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div role="listItem" className="menu-item transform-shift">
                            <Link to={`/vehicle/detail/`} className="item-vehicle">
                                <div className='img-wrap'>
                                    <img className='img-item' src={porsche} alt={'hachi'} />
                                </div>
                                <div className='title-name-type'>
                                    <div>
                                        <h2 className='name-title'>65B2-54558</h2>
                                        <h3 className='name-title'>Porsche 911</h3>
                                    </div>
                                    <div>
                                        <div className='title-info status'>
                                            <span>Status: </span>
                                            <p>not rented</p>
                                        </div>
                                        <div className='title-info parked'>
                                            <span>Parked Time: </span>
                                            <p>00:30:25</p>
                                        </div>
                                        <div className='title-info kilometer'>
                                            <span>Km Today: </span>
                                            <p>25km</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div role="listItem" className="menu-item transform-shift">
                            <Link to={`/vehicle/detail/`} className="item-vehicle">
                                <div className='img-wrap'>
                                    <img className='img-item' src={porsche} alt={'hachi'} />
                                </div>
                                <div className='title-name-type'>
                                    <div>
                                        <h2 className='name-title'>65B2-54558</h2>
                                        <h3 className='name-title'>Porsche 911</h3>
                                    </div>
                                    <div>
                                        <div className='title-info status'>
                                            <span>Status: </span>
                                            <p>not rented</p>
                                        </div>
                                        <div className='title-info parked'>
                                            <span>Parked Time: </span>
                                            <p>00:30:25</p>
                                        </div>
                                        <div className='title-info kilometer'>
                                            <span>Km Today: </span>
                                            <p>25km</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        <div role="listItem" className="menu-item transform-shift">
                            <Link to={`/vehicle/detail/`} className="item-vehicle">
                                <div className='img-wrap'>
                                    <img className='img-item' src={porsche} alt={'hachi'} />
                                </div>
                                <div className='title-name-type'>
                                    <div>
                                        <h2 className='name-title'>65B2-54558</h2>
                                        <h3 className='name-title'>Porsche 911</h3>
                                    </div>
                                    <div>
                                        <div className='title-info status'>
                                            <span>Status: </span>
                                            <p>not rented</p>
                                        </div>
                                        <div className='title-info parked'>
                                            <span>Parked Time: </span>
                                            <p>00:30:25</p>
                                        </div>
                                        <div className='title-info kilometer'>
                                            <span>Km Today: </span>
                                            <p>25km</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vehicles