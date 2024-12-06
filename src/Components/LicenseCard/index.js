import React from 'react';
import './LicenseCard.css';
const BASEURL = 'http://103.77.209.110:3001'

function LicenseCard({ licenseData, onClose }) {
    return (
        <div className="license-card-container">
            <div className="license-card-header">
                <h3>Driver's License</h3>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
            <div className="license-card-content">
                <div className="license-card-info">
                    <p><strong>License ID:</strong> {licenseData.license.license_identity}</p>
                    <p><strong>Driver's Fullname:</strong> {licenseData.fullname}</p>
                    <p><strong>License Class:</strong> {licenseData.license.license_class}</p>
                    <p><strong>Issued Date:</strong> {new Date(licenseData.license.license_date).toISOString().split('T')[0]}</p>
                    <p><strong>Expiration Date:</strong> {new Date(licenseData.license.expiration_date).toISOString().split('T')[0]}</p>
                </div>
                <div>
                    <div className="license-card-image">
                        <img style={{width: '5.5rem'}} src={`${BASEURL}${licenseData.license.id_card_photo}`} alt="License Image" />
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default LicenseCard;
