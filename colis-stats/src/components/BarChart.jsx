import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
        
        
        <YAxis 
          yAxisId="left"
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
          tickFormatter={(value) => `${value} MAD`} 
        />

        <YAxis 
          yAxisId="right" 
          orientation="right" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />

        <Tooltip 
          formatter={(value, name) => {
            const formattedValue = parseFloat(value).toFixed(2);
            return name === "Total CRBT" ? [`${formattedValue} MAD`, name] : [value, name];
          }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0px 4px 10px rgba(0,0,0,0.1)' }}
        />
        
        <Legend verticalAlign="top" align="center" iconType="plainline" iconSize={15} />

       
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="crbt" 
          stroke="#FF0000" 
          strokeWidth={3} 
          dot={{ r: 4, fill: '#FF0000' }} 
          activeDot={{ r: 6 }} 
          name="Total CRBT" 
        />

        
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="envois" 
          stroke="#0066FF" 
          strokeWidth={3} 
          dot={{ r: 4, fill: '#0066FF' }} 
          activeDot={{ r: 6 }} 
          name="Total Envois" 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BarChart;