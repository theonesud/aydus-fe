'use client';
import React, { useState } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Layout from '@/components/Layout';
import { Height } from '@mui/icons-material';

const Home = () => {
  // State for controlling the selected metrics and their numerical inputs
  const [xAxisMetric, setXAxisMetric] = useState('CatalogSpends');
  const [yAxisMetric, setYAxisMetric] = useState('BlendedROAS');
  const [xAxisValue, setXAxisValue] = useState(0);  // State for X-axis numerical input
  const [yAxisValue, setYAxisValue] = useState(0);  // State for Y-axis numerical input

  // Data for the pie chart
  const pieData = [
    { name: 'High Potential Products', value: 78449 },
    { name: 'Top Performing Products', value: 64006 },
    { name: 'Low Discovery Products', value: 87161 },
    { name: 'Non Performing Products', value: 365680 }
  ];

  // Colors for the pie chart segments
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Data for the line chart
  const lineData = [
    { date: '26-07-2024', CatalogSpends: 20000, BlendedROAS: 2 },
    { date: '27-07-2024', CatalogSpends: 40000, BlendedROAS: 3 },
    { date: '28-07-2024', CatalogSpends: 30000, BlendedROAS: 5 },
    { date: '29-07-2024', CatalogSpends: 50000, BlendedROAS: 4 }
  ];
  const quadrantData = [
    { label: 'High Potential Products', value: '13.18%', count: '78,449' },
    { label: 'Top Performing Products', value: '10.75%', count: '64,006' },
    { label: 'Low Discovery Products', value: '14.64%', count: '87,161' },
    { label: 'Non Performing Products', value: '61.43%', count: '365,680' }
  ];

  const quadrantStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '10px 0',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '5px',
    height: '60px'
  };
  const summaryData = {
    title: "Stop Loss",
    description: "Potential Wasted Ad Spend",
    details: "RS: 104,238/-"
  };

  return (
    <Layout>
      <h2 style={{
        padding: 20,
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold'
      }}>Dashboard</h2>

      {/* Metric Selectors with Number Inputs */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20,
        padding: 20,
        gap: 20
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20
        }}>
          <label style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div>
              Select X-Axis Metric:
            </div>
            <div>
              <select value={xAxisMetric} onChange={e => setXAxisMetric(e.target.value)} style={{ padding: 8 }}>
                <option value="CatalogSpends">Catalog Spends</option>
                <option value="BlendedROAS">Blended ROAS</option>
              </select>
              <input
                type="number"
                value={xAxisValue}
                onChange={e => setXAxisValue(e.target.value)}
                placeholder="Enter value"
                style={{ padding: 5, borderWidth: '1px', borderColor: 'black', marginLeft: 5 }}
              />
            </div>
          </label>
        </div>
        <label style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div>
            Select Y-Axis Metric:
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <select style={{ padding: 8 }} value={yAxisMetric} onChange={e => setYAxisMetric(e.target.value)}>
              <option value="CatalogSpends">Catalog Spends</option>
              <option value="BlendedROAS">Blended ROAS</option>
            </select>
            <input
              type="number"
              value={yAxisValue}
              onChange={e => setYAxisValue(e.target.value)}
              placeholder="Enter value"
              style={{ padding: 5, borderWidth: '1px', borderColor: 'black', marginLeft: 5 }}
            />
          </div>
        </label>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {quadrantData.map((data, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center' ,width:'250px',gap:10}}>
            <div style={{ ...quadrantStyle, backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4] }}></div>
            <div style={{display:'flex',flexDirection:'column',width:'180px'}}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#000' }}>{data.value}</div>
              <div style={{ fontSize: '12px', fontWeight: 'normal', color: '#000' }}>{data.label}</div>
              <div style={{ fontSize: '12px', fontWeight: 'normal', color: '#000',display:'flex',flexDirection:'row',gap:10 }}>{data.count}
              <div style={{fontStyle:'10px', border: 'none', cursor: 'pointer', backgroundColor: '#fff', color: 'blue' }}>
                View Products
              </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        // textAlign: 'center',
        width: '40%',
        margin: '20px auto'
      }}>
        <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>{summaryData.title}</h3>
        <p style={{ fontSize: '18px' }}>{summaryData.description}</p>
        <p style={{ fontSize: '20px', color: '#000' }}>{summaryData.details}</p>
      </div>
      {/* Pie Chart and Line Chart are commented out */}
      {/*
      <div style={{display:'flex',flexDirection:'row'}}>
        <PieChart width={400} height={400}>
          <Pie dataKey="value" isAnimationActive={false} data={pieData} cx={200} cy={200} outerRadius={80} fill="#8884d8" label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <LineChart width={600} height={300} data={lineData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={xAxisMetric} stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey={yAxisMetric} stroke="#82ca9d" />
        </LineChart>
      </div>
      */}
    </Layout>
  );
};

export default Home;
