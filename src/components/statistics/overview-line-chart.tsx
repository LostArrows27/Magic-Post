"use client"
import { LineChartItem } from '@/types/line-chart-item';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OverviewLineChartProps {
  items: LineChartItem[];
  className?: string;
}

export function OverviewLineChart({ items, className }: OverviewLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={450}>
        <LineChart
          width={500}
          height={300}
          data={items}
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