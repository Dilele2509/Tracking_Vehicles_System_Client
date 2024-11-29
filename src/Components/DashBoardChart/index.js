import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart
} from 'recharts';
import { 
  Clock, AlertTriangle, Wrench, Battery, MapPin, 
  TrendingUp, Award, ThermometerSun, Star, Trophy, Bell 
} from 'lucide-react';

// Revenue Chart Component
const RevenueChart = () => {
  const [timeFilter, setTimeFilter] = useState('days');
  
  const data = {
    days: [
      { name: 'Mon', revenue: 4500 },
      { name: 'Tue', revenue: 5200 },
      { name: 'Wed', revenue: 4800 },
      { name: 'Thu', revenue: 6300 },
      { name: 'Fri', revenue: 7100 },
      { name: 'Sat', revenue: 8200 },
      { name: 'Sun', revenue: 7400 }
    ],
    months: [
      { name: 'Jan', revenue: 45000 },
      { name: 'Feb', revenue: 52000 },
      { name: 'Mar', revenue: 48000 },
      { name: 'Apr', revenue: 63000 },
      { name: 'May', revenue: 71000 },
      { name: 'Jun', revenue: 82000 }
    ],
    years: [
      { name: '2019', revenue: 450000 },
      { name: '2020', revenue: 520000 },
      { name: '2021', revenue: 680000 },
      { name: '2022', revenue: 730000 },
      { name: '2023', revenue: 810000 }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Revenue Overview</h2>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-3 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="days">Daily</option>
          <option value="months">Monthly</option>
          <option value="years">Yearly</option>
        </select>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data[timeFilter]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Driver Income Summary Component
const DriverIncomeSummary = () => {
  const [timeFilter, setTimeFilter] = useState('daily');
  
  const data = {
    daily: [
      { name: 'John', income: 280, trips: 12 },
      { name: 'Sarah', income: 320, trips: 15 },
      { name: 'Mike', income: 250, trips: 10 },
      { name: 'Anna', income: 290, trips: 13 }
    ],
    weekly: [
      { name: 'John', income: 1800, trips: 85 },
      { name: 'Sarah', income: 2100, trips: 95 },
      { name: 'Mike', income: 1750, trips: 80 },
      { name: 'Anna', income: 1950, trips: 90 }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Driver Income Summary</h2>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-3 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data[timeFilter]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="income" fill="#3b82f6" />
            <Line yAxisId="right" dataKey="trips" stroke="#10b981" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Vehicle Utilization Component
const VehicleUtilization = () => {
  const data = [
    { name: 'Active', value: 45 },
    { name: 'Idle', value: 30 },
    { name: 'Maintenance', value: 15 },
    { name: 'Offline', value: 10 }
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Vehicle Utilization</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Trip Analysis Component
const TripAnalysis = () => {
  const tripData = [
    { driver: 'John Doe', income: 1250, distance: 450, trips: 48 },
    { driver: 'Jane Smith', income: 1100, distance: 380, trips: 42 },
    { driver: 'Mike Johnson', income: 980, distance: 320, trips: 38 },
    { driver: 'Sarah Wilson', income: 1300, distance: 470, trips: 52 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-semibold text-gray-800">Trip Analysis</h2>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={tripData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="driver" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="income" name="Income ($)" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="distance" name="Distance (km)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Updated Driver Rankings Component with more details
const EnhancedDriverRankings = () => {
  const rankings = [
    { 
      driver: 'John Doe', 
      earnings: 1200, 
      trips: 45, 
      rating: 4.8, 
      safetyScore: 95,
      completionRate: 98,
      avatar: '👨‍✈️'
    },
    { 
      driver: 'Jane Smith', 
      earnings: 1100, 
      trips: 42, 
      rating: 4.7, 
      safetyScore: 92,
      completionRate: 96,
      avatar: '👩‍✈️'
    },
    { 
      driver: 'Mike Johnson', 
      earnings: 950, 
      trips: 38, 
      rating: 4.6, 
      safetyScore: 90,
      completionRate: 95,
      avatar: '👨‍✈️'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-800">Top Performing Drivers</h2>
      </div>
      <div className="space-y-4">
        {rankings.map((driver, index) => (
          <div key={driver.driver} 
               className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-100">
            <div className="flex items-center gap-4">
              <span className="text-2xl">{driver.avatar}</span>
              <div>
                <p className="font-semibold text-gray-800">{driver.driver}</p>
                <p className="text-sm text-gray-500">
                  {driver.trips} trips completed • {driver.completionRate}% completion rate
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="font-bold text-green-600">${driver.earnings}</p>
                <p className="text-sm text-gray-500">earnings</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">{driver.rating}⭐</p>
                <p className="text-sm text-gray-500">rating</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-purple-600">{driver.safetyScore}%</p>
                <p className="text-sm text-gray-500">safety</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Customer Ratings Component
const CustomerRatings = () => {
  const ratings = [
    { driver: 'John Doe', rating: 4.8, count: 156, feedback: 'Excellent' },
    { driver: 'Jane Smith', rating: 4.7, count: 142, feedback: 'Great' },
    { driver: 'Mike Johnson', rating: 4.6, count: 128, feedback: 'Good' },
    { driver: 'Sarah Wilson', rating: 4.9, count: 98, feedback: 'Outstanding' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-800">Customer Ratings</h2>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={ratings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="driver" />
            <YAxis yAxisId="left" domain={[0, 5]} />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="right" dataKey="count" name="Number of Ratings" fill="#82ca9d" />
            <Line yAxisId="left" type="monotone" dataKey="rating" name="Average Rating" stroke="#8884d8" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Enhanced Alerts Component
const Alerts = () => {
  const alerts = [
    { 
      id: 1, 
      type: 'speed', 
      driver: 'John Doe', 
      message: 'Exceeded speed limit on Main Street',
      severity: 'high',
      time: '2 mins ago',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'red'
    },
    { 
      id: 2, 
      type: 'maintenance', 
      driver: 'Jane Smith', 
      message: 'Vehicle maintenance due in 2 days',
      severity: 'medium',
      time: '15 mins ago',
      icon: <Wrench className="h-5 w-5" />,
      color: 'yellow'
    },
    { 
      id: 3, 
      type: 'battery', 
      driver: 'Mike Johnson', 
      message: 'Vehicle battery at 15%',
      severity: 'medium',
      time: '1 hour ago',
      icon: <Battery className="h-5 w-5" />,
      color: 'orange'
    },
    {
      id: 4,
      type: 'location',
      driver: 'Sarah Wilson',
      message: 'Vehicle outside designated zone',
      severity: 'low',
      time: '2 hours ago',
      icon: <MapPin className="h-5 w-5" />,
      color: 'blue'
    },
    { 
      id: 5, 
      type: 'speed', 
      driver: 'Vy Le', 
      message: 'Exceeded speed limit on Main Street',
      severity: 'high',
      time: '1 mins ago',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'red'
    },
  ];

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-indigo-500" />
          <h2 className="text-xl font-semibold text-gray-800">Violation Alerts</h2>
        </div>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
          {alerts.length} Active Alerts
        </span>
      </div>
      
      {/* Adjust to grid layout for better full-width presentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alerts.map(alert => (
          <div 
            key={alert.id}
            className={`flex items-start gap-4 p-4 rounded-lg border ${getSeverityStyles(alert.severity)} transition-all duration-200 hover:shadow-md`}
          >
            <div className={`p-2 rounded-full bg-${alert.color}-100`}>
              {alert.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-black">{alert.driver}</h3>
                  <p className="text-sm text-black">{alert.message}</p>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.severity === 'high' ? 'bg-red-100 text-red-700' :
                  alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {alert.severity.toUpperCase()}
                </span>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center">
        <button className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
          View All Alerts
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Fleet Status Component
const FleetStatus = () => {
  const stats = [
    { icon: <Clock className="h-6 w-6" />, label: 'Active Vehicles', value: 12, color: 'text-green-500' },
    { icon: <AlertTriangle className="h-6 w-6" />, label: 'Inactive', value: 3, color: 'text-red-500' },
    { icon: <Wrench className="h-6 w-6" />, label: 'Maintenance', value: 2, color: 'text-yellow-500' },
    { icon: <MapPin className="h-6 w-6" />, label: 'Trips Today', value: 45, color: 'text-blue-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className={`${stat.color}`}>{stat.icon}</div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Dashboard Component
const DashBoardChart = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Fleet Management Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <DriverIncomeSummary />
        <VehicleUtilization />
        <TripAnalysis />
        <EnhancedDriverRankings />
        <CustomerRatings />
        <div className="lg:col-span-2">
          <Alerts />
        </div>
        <div className="lg:col-span-2">
          <FleetStatus />
        </div>
      </div>
    </div>
  );
};

export default DashBoardChart;