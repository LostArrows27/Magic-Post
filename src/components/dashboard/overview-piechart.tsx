"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Group A', value: 500 },
  { name: 'Group B', value: 500 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function OverviewPieChart() {
    return (
        <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
            <PieChart>
                <Pie
                data={data}
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={0}
                dataKey="value"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
        </div>
    )
}
