'use client'
import React, { useState } from 'react';
import Layout from '@/components/Layout';

const Home = () => {
  const [xAxisMetric, setXAxisMetric] = useState('CatalogSpends');
  const [yAxisMetric, setYAxisMetric] = useState('BlendedROAS');
  const [xAxisValue, setXAxisValue] = useState(0);
  const [yAxisValue, setYAxisValue] = useState(0);

  const quadrantData = [
    { label: 'High Potential Products', value: '13.18%', count: '78,449' },
    { label: 'Top Performing Products', value: '10.75%', count: '64,006' },
    { label: 'Low Discovery Products', value: '14.64%', count: '87,161' },
    { label: 'Non Performing Products', value: '61.43%', count: '365,680' }
  ];

  const summaryData = {
    title: "Stop Loss",
    description: "Potential Wasted Ad Spend",
    details: "RS: 104,238/-"
  };

  return (
    <Layout>
      <div className="border-b border-gray-200 pb-5">
        <h3 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '20px 0'
        }} className=" leading-6 text-gray-900">Dashboard</h3>
      </div>

      {/* Quadrants Section */}
      <div style={{
        // This will ensure 2x2 grid layout
        // maxWidth: 'calc(50% - 20px)', // Adjusting for margin
        margin: '10px',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: '#fff',
      }}>
        <div style={{
          fontSize: '20px',
          fontWeight: 'bold',

        }}>
          Quandrant View
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {quadrantData.map((data, index) => (
            <div key={index} style={{
              flex: '1 1 50%', // This will ensure 2x2 grid layout
              maxWidth: 'calc(50% - 20px)', // Adjusting for margin
              margin: '10px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: '#fff',
            }}>
              <div style={{ width: '10px', height: '70px', backgroundColor: COLORS[index % 4] }}></div>
              <div style={{ marginLeft: '20px', width: '100%' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{data.value}</div>
                <div>{data.label}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {data.count}
                  <div style={{ color: '#007bff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                    View Products
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-b border-gray-200 pb-5"></div>
      <div
      style={{
        margin: '10px',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        padding: '10px',
        borderRadius: '10px',
        backgroundColor: '#fff',
        marginTop: '20px',
      }}
      >
        <div style={{
          fontSize: '20px',
          fontWeight: 'bold',
        }}>
          Stop Loss
        </div>
        {/* Stop Loss Summary Card */}
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: '50%',
          margin: '20px auto',
          textAlign: 'left'
        }}>
          <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>{summaryData.title}</h3>
          <p style={{ fontSize: '18px' }}>{summaryData.description}</p>
          <p style={{ fontSize: '16px', color: '#666' }}>{summaryData.details}</p>
        </div>
      </div>
    </Layout>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default Home;
