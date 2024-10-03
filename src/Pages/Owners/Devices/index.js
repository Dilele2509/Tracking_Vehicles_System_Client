import React, { useState } from 'react';
import './Devices.css';

export default function Devices() {
    // State for quantity
    const [quantity, setQuantity] = useState(1);
    const [inStock, setInStock] = useState(10)
    // Handle quantity increment and decrement
    const incrementQuantity = () => {
        setQuantity(parseInt(quantity, 10) + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(parseInt(quantity, 10) - 1);
        }
    };

    const handleQuantChange = (e) => {
        const value = e.target.value;
        // Ensure the input is a valid number
        if (!isNaN(value) && value > 0) {
            setQuantity(parseInt(value, 10));
        } else if (value === '' || value === 0) {
            setQuantity(1); // Reset to 1 if the input is cleared
        }
    };

    return (
        <div className='device-container'>
            <h1 className='device-title'>HL-STM4G</h1>
            <div className='device-content'>
                <div className='device-img'>
                    <img src='/assets/Images/device.png' />
                </div>
                <div className='content-device'>
                    <div className='content-box'>
                        <div className='content-item'>
                            <h1>Description</h1>
                            <p>The device uses 4G connectivity technology to transmit its current location. This way we can extend the range of the connection and at the same time not be limited by the operating system or software platform. The device is installed directly into the vehicle so it can ensure the power source without having to remove it to charge the battery frequently.</p>
                        </div>

                        <div className='content-item'>
                            <h1 className='device-price'>1.559.000vnd</h1>
                            <div className='in-stock'>
                                <h3>In Stock: </h3>
                                <p className={inStock < 5 ? 'red' : null}>{inStock}</p>
                            </div>
                            <div className='func-choosing'>
                                <form id='device-form' action='' method='get' className='quant-num-cart'>
                                    <button
                                        className='quant-minus'
                                        onClick={(e) => {
                                            e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút
                                            decrementQuantity();
                                        }}
                                    >
                                        <span>-</span>
                                    </button>

                                    <input type='text' value={quantity} name='quantity' onChange={handleQuantChange} className='quantity'></input>

                                    <button
                                        className='quant-plus'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            incrementQuantity();
                                        }}
                                    >
                                        <span>+</span>
                                    </button>
                                </form>
                            </div>
                            <div className='buy-func' >
                                <button className='buy-btn'>
                                    <span>Buy Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
