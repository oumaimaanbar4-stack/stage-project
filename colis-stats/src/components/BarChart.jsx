import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChart = ({ data }) => {
  return (
    // ResponsiveContainer allows the chart to fill its parent Paper box
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Legend verticalAlign="top" align="center" iconType="plainline" iconSize={15} />
        <Line type="monotone" dataKey="crbt" stroke="#FF0000" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Total CRBT" />
        <Line type="monotone" dataKey="envois" stroke="#0066FF" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Total Envois" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default BarChart;