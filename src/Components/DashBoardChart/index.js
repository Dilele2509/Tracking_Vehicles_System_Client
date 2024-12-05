import React, { useEffect, useState } from 'react';
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
import axios from '../../api/axios';
import MoneyFormat from '../MoneyFormat';
const BASEURL = 'http://103.77.209.110:3001'

// Revenue Chart Component
const RevenueChart = () => {
  const [timeFilter, setTimeFilter] = useState('date');
  const [revenueIncome, setRevenueIncome] = useState([]);
  const format = (data) => {
    return new Intl.NumberFormat('vi-VN').format(data);
  };

  useEffect(() => {
    axios.get('/income/company-income')
      .then((response) => {
        //console.log(processRevenueIncome(response.data));
        setRevenueIncome(response.data);
      }).catch((err) => {
        console.error(err);
      })
  }, []);  // Add empty dependency array to avoid infinite loop

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Revenue Overview</h2>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-3 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="date">Daily</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>
      <div className="h-72 overflow-x-auto">
        {revenueIncome[timeFilter]?.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueIncome[timeFilter]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={format} />
              <Tooltip formatter={(value) => format(value)} />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-500 text-center">No data available</p>
        )}
      </div>
    </div>
  );
};

// Driver Income Summary Component
const DriverIncomeSummary = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('/income/driver-income-total')
      .then((response) => {
        setData(response.data);
      }).catch((err) => {
        console.error(err);
      })
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Driver Income Summary</h2>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fullname" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="total" fill="#3b82f6" />
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
    { name: 'Driving', value: 55 },
    { name: 'Parked', value: 30 },
    { name: 'Not used', value: 15 },
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
  const [tripData, setTripData] = useState([])

  useEffect(() => {
    axios.get('/income/driver-income-total')
      .then((response) => {
        setTripData(response.data);
      }).catch((err) => {
        console.error(err);
      })
  }, [])

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
            <XAxis dataKey="fullname" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="total" name="Income ($)" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="distance" name="Distance (km)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Updated Driver Rankings Component with more details
const EnhancedDriverRankings = () => {
  const [rankings, setRankings] = useState([])

  useEffect(() => {
    axios.get('/income/statistic-drive')
      .then((response) => {
        //console.log('rankings', response.data);
        setRankings(response.data);
      }).catch((err) => {
        console.error(err);
      })
  }, [])

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-800">Top Performing Drivers</h2>
      </div>
      <div className="space-y-4">
        {rankings.map((driver, index) => (
          <div key={driver.driver || index}
            className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-100">
            <div className="flex items-center gap-4">
              <img className='w-12' style={{ borderRadius: '50%' }} src={`${BASEURL}${driver.avatar}`} alt="Driver Avatar" />
              <div>
                <p className="font-semibold text-gray-800">{driver.fullname}</p>
                <p className="text-sm text-gray-500">
                  {driver.trips} trips completed
                </p>
                <p className="text-sm text-gray-500">
                  {driver.success_rate_percentage}% completion rate
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="font-bold text-green-600"><MoneyFormat value={driver.total} isShowing={true} />Đ</p>
                <p className="text-sm text-gray-500">earnings</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">{driver.average_rate}⭐</p>
                <p className="text-sm text-gray-500">rating</p>
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
  const [ratings, setRatings] = useState([])

  useEffect(() => {
    axios.get('/income/statistic-rate')
      .then((response) => {
        setRatings(response.data);
      }).catch((err) => {
        console.error(err);
      })
  }, [])

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
            <Line yAxisId="left" type="monotone" dataKey="rate" name="Average Rating" stroke="#8884d8" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Enhanced Alerts Component
const Alerts = () => {
  const [isShowAll, setIsShowAll] = useState(false)
  const [showAllBtn, setShowAllBtn] = useState(false)
  const [alerts, setAlerts] = useState([])
/*   const violate = [
    {
      id: 1,
      fullname: 'John Doe',
      data: 'Detect drowsy state',
      severity: 'high',
      time: '2 mins ago',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'red'
    },
    {
      id: 2,
      fullname: 'Jane Smith',
      data: 'Detect drowsy state',
      severity: 'medium',
      time: '15 mins ago',
      icon: <Wrench className="h-5 w-5" />,
      color: 'yellow'
    },
    {
      id: 3,
      type: 'battery',
      fullname: 'Mike Johnson',
      data: 'Detect drowsy state',
      severity: 'medium',
      time: '1 hour ago',
      icon: <Battery className="h-5 w-5" />,
      color: 'orange'
    },
    {
      id: 4,
      type: 'location',
      fullname: 'Sarah Wilson',
      data: 'Detect drowsy state',
      severity: 'low',
      time: '2 hours ago',
      icon: <MapPin className="h-5 w-5" />,
      color: 'blue'
    },
    {
      id: 5,
      type: 'location',
      fullname: 'Sarah Wilson',
      data: 'Detect drowsy state',
      severity: 'low',
      time: '2 hours ago',
      icon: <MapPin className="h-5 w-5" />,
      color: 'blue'
    }
  ]; */
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  };

  const toggleShowAll = () => {
    setIsShowAll(!isShowAll);
  };

  useEffect(() => {
    if (alerts.length > 4) {
      setShowAllBtn(true);
    }
  }, [alerts]);

  useEffect(() => {
    axios.get('/violate/get-all', config)
      .then((response) => {
        const violateData = response.data;

        // Create an array of promises for fetching user info
        const violationPromises = violateData.map((violation) => {
          const userId = violation.user_id;

          return axios.post('/user/get-user-id', { userId }) // Return the promise
            .then((res) => {
              // Merge user info into the violation object
              return {
                ...violation,
                userInfo: res.data
              };
            });
        });

        // Wait for all promises to resolve and update the state
        Promise.all(violationPromises)
          .then((allViolationData) => {
            console.log('violate data:', allViolationData);
            setAlerts(allViolationData); // Merge and set the violations
          })
          .catch((error) => {
            console.error("Error fetching additional data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching violations:", error);
      });
  }, []);

  const getSeverityStyles = (severity) => {
    console.log(severity);
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

      {/* Smooth height transition */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden transition-all duration-500 ${isShowAll ? 'max-h-[1000px]' : 'max-h-64'
          }`}
      >
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-start gap-4 p-4 rounded-lg border ${getSeverityStyles('high')} transition-all duration-200 hover:shadow-md`}
          >
            <div className={`p-2 rounded-full bg-red-100`}><AlertTriangle className="h-5 w-5" /></div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-1 text-black">{alert.userInfo.fullname}</h3>
                  <p className="text-sm text-black">{'Cảnh báo ngủ gật'}</p>
                </div>
                <span className="text-xs text-gray-500">{alert.date}<br/>{alert.time}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${'high'
                    ? 'bg-red-100 text-red-700'
                    : 'high' === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                    }`}
                >
                  {'high'.toUpperCase()}
                </span>
                <button className="text-sm text-gray-500 hover:text-gray-700">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`mt-6 flex justify-center ${!showAllBtn ? `hidden` : ``}`}>
        <button
          onClick={toggleShowAll}
          className="px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
        >
          {!isShowAll ? 'View All Alerts' : 'Show Less'}
          <svg
            className={`w-4 h-4 transform transition-transform duration-300 ${isShowAll ? 'rotate-180' : 'rotate-0'
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Fleet Status Component
/* const FleetStatus = () => {
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
}; */

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
        {/* <div className="lg:col-span-2">
          <p className="text-center text-gray-700 text-sm">Copyright © 2024 - owned by HALEE. All Rights Reserved</p>
        </div> */}
      </div>
    </div>
  );
};

export default DashBoardChart;