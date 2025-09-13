// AnalyticsDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from 'recharts';
import CountUp from 'react-countup';
import './AnalyticsDashboard.css';

export default function AnalyticsDashboard() {
  const [revenueData, setRevenueData] = useState([]);
  const [planBreakdown, setPlanBreakdown] = useState([]);
  const [stats, setStats] = useState({ revenue: 0, users: 0, subscriptions: 0 });

  useEffect(() => {
    setTimeout(() => {
      setRevenueData([
        { month: 'Apr', revenue: 1200 },
        { month: 'May', revenue: 2400 },
        { month: 'Jun', revenue: 1800 },
        { month: 'Jul', revenue: 3000 },
        { month: 'Aug', revenue: 4200 },
        { month: 'Sep', revenue: 3900 },
      ]);

      setPlanBreakdown([
        { name: 'Basic', value: 120 },
        { name: 'Standard', value: 340 },
        { name: 'Premium', value: 95 },
      ]);

      setStats({ revenue: 15000, users: 555, subscriptions: 450 });
    }, 500);
  }, []);

  const COLORS = ['#4F46E5', '#06B6D4', '#F97316'];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title animated-title"> Analytics Dashboard</h1>

      {/* Animated counters */}
      <div className="stats-grid fade-in">
        <div className="stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">
            $<CountUp end={stats.revenue} duration={2} separator="," />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Active Users</div>
          <div className="stat-value">
            <CountUp end={stats.users} duration={2} separator="," />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Subscriptions</div>
          <div className="stat-value">
            <CountUp end={stats.subscriptions} duration={2} separator="," />
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card fade-in">
          <h2 className="chart-title">Revenue Over Time</h2>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="month" stroke="#555" />
                <YAxis stroke="#555" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4F46E5"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  isAnimationActive={true}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card fade-in delay">
          <h2 className="chart-title">Plan Distribution</h2>
          <div className="pie-wrapper">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={planBreakdown}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                  isAnimationActive={true}
                  animationDuration={1500}
                >
                  {planBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
            <ul className="plan-list">
              {planBreakdown.map(p => (
                <li key={p.name}>{p.name}: {p.value} users</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
