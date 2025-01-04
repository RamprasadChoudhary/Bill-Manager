import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

function Chart() {
  const bills = useSelector(state => state.bills.bills);

  const chartData = bills.map(bill => ({
    date: new Date(bill.date).toLocaleDateString(),
    amount: parseFloat(bill.amount),
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="mt-8 bg-white p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Monthly Billing Cycle</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="date" 
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            tick={{fontSize: 12}}
          >
            <Label value="Date" offset={-20} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Amount ($)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" height={36}/>
          <Line type="monotone" dataKey="amount" name="Bill Amount" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;

