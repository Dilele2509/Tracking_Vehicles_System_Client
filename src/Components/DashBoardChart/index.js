import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart
} from 'recharts';
import { 
  Clock, AlertTriangle, Wrench, Battery, MapPin, 
  TrendingUp, Award, ThermometerSun 
} from 'lucide-react';

// import RevenueChart from '../RevenueChart';

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
          className="px-3 py-2 border rounded-md"
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
          className="px-3 py-2 border rounded-md"
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

// Driver Performance Component
const DriverPerformance = () => {
  const data = [
    { subject: 'Trips', A: 120, B: 110, fullMark: 150 },
    { subject: 'Rating', A: 98, B: 130, fullMark: 150 },
    { subject: 'Income', A: 86, B: 130, fullMark: 150 },
    { subject: 'Time', A: 99, B: 100, fullMark: 150 },
    { subject: 'Efficiency', A: 85, B: 90, fullMark: 150 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Driver Performance</h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar name="Driver A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Radar name="Driver B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Realtime Tracking Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <DriverIncomeSummary />
        <VehicleUtilization />
        <DriverPerformance />
        <div className="lg:col-span-2">
          <FleetStatus />
        </div>
      </div>
    </div>
  );
};

export default DashBoardChart;