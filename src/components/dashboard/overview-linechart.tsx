"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    delivered: 4000,
    failed: 2400,
    amt: 2400,
  },
  {
    name: 'Feb',
    delivered: 3000,
    failed: 1398,
    amt: 2210,
  },
  {
    name: 'Mar',
    delivered: 9800,
    failed: 2000,
    amt: 2290,
  },
  {
    name: 'Apr',
    delivered: 3908,
    failed: 2780,
    amt: 2000,
  },
  {
    name: 'May',
    delivered: 4800,
    failed: 1890,
    amt: 2181,
  },
  {
    name: 'Jun',
    delivered: 3800,
    failed: 2390,
    amt: 2500,
  },
  {
    name: 'Jul',
    delivered: 4300,
    failed: 2490,
    amt: 2100,
  },
];

export function OverviewLineChart() {
  return (
    <ResponsiveContainer width="100%" height={450}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="delivered" stroke="#22c35e" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="failed" stroke="#ec4547" />
        </LineChart>
    </ResponsiveContainer>
  )
}