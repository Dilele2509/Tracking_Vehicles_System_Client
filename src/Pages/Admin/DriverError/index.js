import React, { useEffect, useState } from 'react';
import { AlertCircle, Clock, User, ArrowLeft, InfoIcon } from 'lucide-react';
import axios from '../../../api/axios';

const BASEURL = 'http://103.77.209.93:3001';

// Card component
const Card = ({ children, className = '', onClick }) => (
  <div className={`rounded-lg shadow-lg p-6 transition-all duration-300 
    ${onClick ? 'cursor-pointer hover:shadow-2xl hover:scale-[1.01]' : ''} 
    ${className}`} onClick={onClick}>
    {children}
  </div>
);

// Alert component
const Alert = ({ children, className = '' }) => (
  <div className={`rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg ${className}`}>
    {children}
  </div>
);

const DriverViolations = () => {
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [violations, setViolations] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  };

  useEffect(() => {
    // Fetch violations from /violate/get-all
    axios.get('/violate/get-all', config)
      .then((response) => {
        const violationData = response.data;

        // Fetch additional data for each violation
        const violationPromises = violationData.map(violation => {
          const userId = violation.user_id;

          // Fetch user info using /user/get-user-id
          const userPromise = axios.post('/user/get-user-id', { userId });

          // Fetch vehicle data using /vehicles/get-driver
          const vehiclePromise = axios.post('/vehicles/get-driver', { userId });

          // Fetch violation details using /licenses/get-by-id
          const licensePromise = axios.post('/licenses/get-by-id', { userId });

          // Return a combined promise for each violation
          return Promise.all([userPromise, vehiclePromise, licensePromise])
            .then(([userResponse, vehicleResponse, licenseResponse]) => {
              // Merge the data for each violation
              return {
                ...violation,
                userData: userResponse.data,
                vehicle: vehicleResponse.data,
                license: licenseResponse.data,
              };
            });
        });

        // Wait for all promises to resolve and update the state
        Promise.all(violationPromises)
          .then((allViolationData) => {
            setViolations(allViolationData); // Merge and set the violations
          })
          .catch((error) => {
            console.error("Error fetching additional data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching violations:", error);
      });
  }, []);

  // Severity badge color mapping
  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return 'bg-orange-500';
      case 'critical':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  const DetailView = ({ violation, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 
      backdrop-blur-sm transition-all duration-300">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl 
        transform transition-all duration-300 scale-100 animate-fadeIn"
        style={{ backgroundColor: '#fffefd' }}>
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <button
            onClick={onClose}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to List
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#3B3B3B' }}>
                Warning
              </h2>

              <div className="space-y-4 flex-col justify-between flex-1">
                <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                  <User className="h-4 w-4" />
                  <span className="font-medium">{violation.userData.id}</span>
                  <span className="font-medium">{violation.userData.fullname}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                  <Clock className="h-4 w-4" />
                  <span>{violation.date} . {violation.time}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                  <InfoIcon className="h-4 w-4" />
                  <span>Có hành vi ngủ gật trong lúc điều khiển phương tiện</span>
                </div>

                <div className="mt-4 p-4 rounded-lg transition-all duration-300 hover:shadow-md"
                  style={{ backgroundColor: '#E9BD20', transform: 'translateZ(0)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#3B3B3B' }}>Driver Information</h3>
                  <div className="flex flex-row space-x-4 justify-between items-center">
                    <div className="space-y-2 max-w-[30%] mx-auto">
                      <img className="w-16 mx-auto" src={`${BASEURL}${violation.license.id_card_photo}`} alt="ID Card" />
                    </div>
                    <div className="space-y-2">
                      <p style={{ color: 'var(--primary-gray)' }}>Date of Birth: <span style={{ color: 'white' }}>{violation.userData.birthday}</span></p>
                      <p style={{ color: 'var(--primary-gray)' }}>License: <span style={{ color: 'white' }}>{violation.license.license_identity}</span></p>
                      <p style={{ color: 'var(--primary-gray)' }}>Vehicle's license plate: <span style={{ color: 'white' }}>{violation.vehicle.license_plate}</span></p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="h-64 md:h-96 relative">
                <img
                  src={`${BASEURL}${violation.information}`}
                  alt={`Violation evidence for ${violation.userData.fullname}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FEF6E9] to-[#fff5e6]"
      style={{ padding: '1.5rem' }}>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>
        <h1 style={{ color: '#3B3B3B' }}
          className="text-3xl font-bold mb-6 text-center 
          hover:scale-105 transition-transform duration-300">
          Driver Violations Dashboard
        </h1>

        <Alert
          className="mb-6 flex items-center gap-3"
          style={{ backgroundColor: '#E9BD20', color: '#484A40' }}
        >
          <AlertCircle className="h-4 w-4 " style={{ color: 'red' }} />
          <div>
            <div className="font-semibold text-black">Active Monitoring</div>
            <div className="text-sm text-black">
              System is actively monitoring for driver violations and safety concerns.
              Click on any incident to view detailed information.
            </div>
          </div>
        </Alert>

        <div className="space-y-6">
          {violations.map((violation) => (
            <Card
              key={violation.id}
              className="bg-white"
              style={{ backgroundColor: '#fffefd' }}
              onClick={() => setSelectedViolation(violation)}
            >
              <div className="flex justify-between items-center mb-4">
                {/* You can also map any information like violation severity, etc. */}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                    <User className="h-4 w-4" />
                    <span className="font-medium">{violation.userData.fullname}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                    <Clock className="h-4 w-4" />
                    <span>{violation.date} . {violation.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {selectedViolation && (
        <DetailView
          violation={selectedViolation}
          onClose={() => setSelectedViolation(null)}
        />
      )}
    </div>
  );
};

export default DriverViolations;
