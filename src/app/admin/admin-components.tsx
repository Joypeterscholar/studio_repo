'use client';

import {
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from 'recharts';
import { userActivityData, userDemographicsData } from './data';

export const ActivityChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsLineChart data={userActivityData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="newUsers"
        stroke="hsl(var(--primary))"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="activeUsers" stroke="hsl(var(--accent))" />
    </RechartsLineChart>
  </ResponsiveContainer>
);

export const BarChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsBarChart data={userDemographicsData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="hsl(var(--primary))" />
    </RechartsBarChart>
  </ResponsiveContainer>
);

export { RechartsLineChart, RechartsBarChart as LineChart };
