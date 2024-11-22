import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './RevenueChart.css';

const RevenueChart = () => {
  const [timeFilter, setTimeFilter] = useState('days');

  // Fake data for different time periods
  const daysData = [
    { name: 'Mon', revenue: 4500 },
    { name: 'Tue', revenue: 5200 },
    { name: 'Wed', revenue: 4800 },
    { name: 'Thu', revenue: 6300 },
    { name: 'Fri', revenue: 7100 },
    { name: 'Sat', revenue: 8200 },
    { name: 'Sun', revenue: 7400 }
  ];

  const monthsData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 63000 },
    { name: 'May', revenue: 71000 },
    { name: 'Jun', revenue: 82000 }
  ];

  const yearsData = [
    { name: '2019', revenue: 450000 },
    { name: '2020', revenue: 520000 },
    { name: '2021', revenue: 680000 },
    { name: '2022', revenue: 730000 },
    { name: '2023', revenue: 810000 },
    { name: '2024', revenue: 920000 }
  ];

  const getDataByTimeFilter = () => {
    switch (timeFilter) {
      case 'days':
        return daysData;
      case 'months':
        return monthsData;
      case 'years':
        return yearsData;
      default:
        return daysData;
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="custom-tooltip-label">{label}</p>
          <p className="custom-tooltip-value">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="revenue-chart-container">
      <div className="chart-header">
        <h2 className="chart-title">Revenue Statistics</h2>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="time-filter-select"
        >
          <option value="days">Daily</option>
          <option value="months">Monthly</option>
          <option value="years">Yearly</option>
        </select>
      </div>
      
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getDataByTimeFilter()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="revenue" 
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;