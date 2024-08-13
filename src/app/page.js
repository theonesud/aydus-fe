'use client';
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { getStopLoss, quadrantDataApi } from '@/utils/api'; // Adjust the path as needed

const Home = () => {
  const [xAxisMetric, setXAxisMetric] = useState('price');
  const [yAxisMetric, setYAxisMetric] = useState('price');
  const [xAxisValue, setXAxisValue] = useState('100');
  const [yAxisValue, setYAxisValue] = useState('200');
  const [quadrantData, setQuadrantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stopLossData, setStopLossData] = useState([]);

  const summaryData = {
    title: "Stop Loss",
    description: "Potential Wasted Ad Spend",
    details: "RS: 104,238/-"
  };

  const handleXAxisMetricChange = (event) => {
    setXAxisMetric(event.target.value);
  };

  const handleYAxisMetricChange = (event) => {
    setYAxisMetric(event.target.value);
  };

  const handleXAxisValueChange = (event) => {
    setXAxisValue(event.target.value);
  };

  const handleYAxisValueChange = (event) => {
    setYAxisValue(event.target.value);
  };

  const fetchStopLoss = () => {
    setLoading(true);
    setError(null);
    const data = {
      from_date: "2024-01-01",  // Assuming these dates are constant; adjust as necessary
      to_date: "2024-12-31",
    }
    getStopLoss(data,
      (response) => {
        setStopLossData(response.data);
        console.log(response.data,'stoploss');
        setLoading(false);
      },
      (error) => {
        console.error('Failed to fetch stop loss data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    );
  }

  const fetchQuadrantData = () => {
    setLoading(true);
    setError(null);

    const postData = {
      from_date: "2022-01-01",  // Assuming these dates are constant; adjust as necessary
      to_date: "2022-12-31",
      x_col: xAxisMetric,
      x_val: xAxisValue,
      y_col: yAxisMetric,
      y_val: yAxisValue,
    };

    quadrantDataApi(
      postData,
      (response) => {
        const formattedData = [
          { label: 'High Potential Products', value: `${response.data.high_potential.percent}%`, count: response.data.high_potential.number },
          { label: 'Top Performing Products', value: `${response.data.top_performing.percent}%`, count: response.data.top_performing.number },
          { label: 'Low Discovery Products', value: `${response.data.low_discovery.percent}%`, count: response.data.low_discovery.number },
          { label: 'Non Performing Products', value: `${response.data.non_performing.percent}%`, count: response.data.non_performing.number },
        ];
        setQuadrantData(formattedData);
        setLoading(false);
      },
      (error) => {
        console.error('Failed to fetch quadrant data:', error);
        setError('Failed to load data');
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    fetchQuadrantData();
    fetchStopLoss()
  }, [xAxisMetric, yAxisMetric, xAxisValue, yAxisValue]); // Fetch when inputs change

  return (
    <Layout>
      <div className="border-b border-gray-200 pb-5">
        <h3 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '20px 0'
        }} className=" leading-6 text-gray-900">Dashboard</h3>
      </div>

      {/* Dropdowns Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', marginTop: '20px' }}>
        <FormControl variant="outlined" style={{ minWidth: 250 }}>
          <InputLabel id="x-axis-metric-label">X-Axis Metric</InputLabel>
          <Select
            labelId="x-axis-metric-label"
            value={xAxisMetric}
            onChange={handleXAxisMetricChange}
            label="X-Axis Metric"
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="CatalogSpends">Catalog Spends</MenuItem>
            <MenuItem value="BlendedROAS">Blended ROAS</MenuItem>
            <MenuItem value="Views">Views</MenuItem>
            <MenuItem value="GoogleSpends">Google Spends</MenuItem>
            <MenuItem value="FBSpends">FB Spends</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="X-Axis Value"
          variant="outlined"
          value={xAxisValue}
          onChange={handleXAxisValueChange}
          style={{ minWidth: 200 }}
        />

        <FormControl variant="outlined" style={{ minWidth: 250 }}>
          <InputLabel id="y-axis-metric-label">Y-Axis Metric</InputLabel>
          <Select
            labelId="y-axis-metric-label"
            value={yAxisMetric}
            onChange={handleYAxisMetricChange}
            label="Y-Axis Metric"
          >
            <MenuItem value="price">Price</MenuItem>
            <MenuItem value="CatalogSpends">Catalog Spends</MenuItem>
            <MenuItem value="BlendedROAS">Blended ROAS</MenuItem>
            <MenuItem value="Views">Views</MenuItem>
            <MenuItem value="GoogleSpends">Google Spends</MenuItem>
            <MenuItem value="FBSpends">FB Spends</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Y-Axis Value"
          variant="outlined"
          value={yAxisValue}
          onChange={handleYAxisValueChange}
          style={{ minWidth: 200 }}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          {/* Quadrants Section */}
          <div style={{
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
              Quadrant View
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
                  flex: '1 1 50%',
                  maxWidth: 'calc(50% - 20px)',
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
                      ({data.count})
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
              <p style={{ fontSize: '16px', color: '#666' }}>{stopLossData.cash_saved}/-</p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default Home;
