import React, { useState } from 'react';
import { AlertCircle, Clock, User, AlertTriangle, X, MapPin, AlertOctagon, ArrowLeft } from 'lucide-react';

const Card = ({ children, className = '', onClick }) => (
  <div className={`rounded-lg shadow-lg p-6 transition-all duration-300 
    ${onClick ? 'cursor-pointer hover:shadow-2xl hover:scale-[1.01]' : ''} 
    ${className}`} onClick={onClick}>
    {children}
  </div>
);

const Alert = ({ children, className = '' }) => (
  <div className={`rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-lg ${className}`}>
    {children}
  </div>
);

const DriverViolations = () => {
  const [selectedViolation, setSelectedViolation] = useState(null);

  // Fake data for development
  const violations = [
    {
      id: 1,
      driverName: "John Smith",
      violationType: "Fatigue Detection",
      timestamp: "2024-11-22 08:45:23",
      severity: "High",
      imageUrl: require('../../../assets/avatar/fatigue.png'),
      location: "Highway 101, Mile 45",
      description: "Driver showing signs of fatigue - multiple eye closure events detected",
      vehicleId: "VH-001",
      driverAge: 35,
      driverLicense: "DL12345678",
      speedAtIncident: "65 mph",
      weatherConditions: "Clear",
      incidentDuration: "45 seconds",
      actionsTaken: [
        "Alert sent to dispatch",
        "Driver warned via in-cabin alert",
        "Mandatory rest break scheduled"
      ]
    },
    {
      id: 2,
      driverName: "Sarah Johnson",
      violationType: "Speed Limit Exceeded",
      timestamp: "2024-11-22 09:30:15",
      severity: "Medium",
      imageUrl: require('../../../assets/avatar/speed_limit.jpg'),
      location: "Interstate 5, Mile 120",
      description: "Vehicle speed: 75mph in 55mph zone",
      vehicleId: "VH-002",
      driverAge: 42,
      driverLicense: "DL98765432",
      speedAtIncident: "75 mph",
      weatherConditions: "Rainy",
      incidentDuration: "2 minutes",
      actionsTaken: [
        "Speed warning issued",
        "Incident logged to driver record",
        "Supervisor notified"
      ]
    },
    {
      id: 3,
      driverName: "Mike Wilson",
      violationType: "Fatigue Detection",
      timestamp: "2024-11-22 10:15:00",
      severity: "Critical",
      imageUrl: require('../../../assets/avatar/fatigue.png'),
      location: "Route 66, Mile 89",
      description: "Extended period of drowsiness detected - immediate attention required",
      vehicleId: "VH-003",
      driverAge: 28,
      driverLicense: "DL45678901",
      speedAtIncident: "60 mph",
      weatherConditions: "Night/Clear",
      incidentDuration: "90 seconds",
      actionsTaken: [
        "Emergency response team notified",
        "Immediate stop mandated",
        "Backup driver dispatched"
      ]
    }
  ];

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
          <span className={`px-3 py-1 rounded-full text-white text-sm ${getSeverityColor(violation.severity)}`}>
            {violation.severity}
          </span>
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#3B3B3B' }}>
                {violation.violationType}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                  <User className="h-4 w-4" />
                  <span className="font-medium">{violation.driverName}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                  <Clock className="h-4 w-4" />
                  <span>{violation.timestamp}</span>
                </div>
                <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                  <MapPin className="h-4 w-4" />
                  <span>{violation.location}</span>
                </div>
                
                <div className="mt-4 p-4 rounded-lg transition-all duration-300 hover:shadow-md" 
                  style={{ backgroundColor: '#E9BD20', transform: 'translateZ(0)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#3B3B3B' }}>Driver Information</h3>
                  <div className="space-y-2" >
                  <p>Age: {violation.driverAge}</p>
                    <p>License: {violation.driverLicense}</p>
                    <p>Vehicle ID: {violation.vehicleId}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 rounded-lg transition-all duration-300 hover:shadow-md" 
                  style={{ backgroundColor: '#E9BD20', transform: 'translateZ(0)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#3B3B3B' }}>Incident Details</h3>
                  <div className="space-y-2">
                    <p>Speed: {violation.speedAtIncident}</p>
                    <p>Weather: {violation.weatherConditions}</p>
                    <p>Duration: {violation.incidentDuration}</p>
                  </div>
                </div>
                
                <div className="mt-4 p-4 rounded-lg transition-all duration-300 hover:shadow-md" 
                  style={{ backgroundColor: '#E9BD20', transform: 'translateZ(0)' }}>
                  <h3 className="font-semibold mb-2" style={{ color: '#3B3B3B' }}>Actions Taken</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {violation.actionsTaken.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="h-64 md:h-96 relative">
                <img
                  src={violation.imageUrl}
                  alt={`Violation evidence for ${violation.driverName}`}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              <div className="p-4 rounded-lg transition-all duration-300 hover:shadow-md" 
                style={{ backgroundColor: '#E9BD20', transform: 'translateZ(0)' }}>
                <h3 className="font-semibold mb-2" style={{ color: '#3B3B3B' }}>Incident Description</h3>
                <p className="text-red-500">{violation.description}</p>
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
                <h2 className="text-xl font-bold" style={{ color: '#3B3B3B' }}>
                  {violation.violationType}
                </h2>
                <span 
                  className={`px-3 py-1 rounded-full text-white text-sm ${getSeverityColor(violation.severity)}`}
                >
                  {violation.severity}
                </span>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                    <User className="h-4 w-4" />
                    <span className="font-medium">{violation.driverName}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                    <Clock className="h-4 w-4" />
                    <span>{violation.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: '#484A40' }}>
                    <AlertTriangle className="h-4 w-4" />
                    <span>{violation.location}</span>
                  </div>
                  <p style={{ color: '#3B3B3B' }} className="mt-2">
                    {violation.description}
                  </p>
                </div>
                <div className="relative h-48 md:h-full">
                  <img
                    src={violation.imageUrl}
                    alt={`Violation evidence for ${violation.driverName}`}
                    className="rounded-lg object-cover w-full h-full"
                  />
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