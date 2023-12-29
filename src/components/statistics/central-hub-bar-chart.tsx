import { BarChartItem } from '@/types/bar-chart-item';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartProps {
    items: BarChartItem[];
    className?: string;
}

export function CentralHubBarChart({ items, className }: BarChartProps) {
    return (
      <ResponsiveContainer width="100%" height={450}>
        <BarChart
          width={500}
          height={300}
          data={items}
          margin={{
            top: 20,
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
          <Bar dataKey="delivered" stackId="a" fill="#8884d8" />
          <Bar dataKey="total" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
}
