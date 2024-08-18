"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // Import the appropriate adapter
import { getStopLoss, quadrantDataApi } from "@/utils/api"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const Home = () => {
  const [xAxisMetric, setXAxisMetric] = useState("price");
  const [yAxisMetric, setYAxisMetric] = useState("price");
  const [xAxisValue, setXAxisValue] = useState("100");
  const [yAxisValue, setYAxisValue] = useState("200");
  const [quadrantData, setQuadrantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stopLossData, setStopLossData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [datesObj, setDatesObj] = useState({
    startDate: null,
    endDate: null,
  });
  const router = useRouter();

  const summaryData = {
    title: "Stop Loss",
    description: "Potential Wasted Ad Spend",
    details: "RS: 104,238/-",
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
      from_date: datesObj.startDate,
      to_date: datesObj.endDate,
    };
    getStopLoss(
      data,
      (response) => {
        setStopLossData(response.data);
        console.log(response.data, "stoploss");
        setLoading(false);
      },
      (error) => {
        console.error("Failed to fetch stop loss data:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    );
  };

  const fetchQuadrantData = () => {
    setLoading(true);
    setError(null);

    const postData = {
      from_date: datesObj.startDate,
      to_date: datesObj.endDate,
      x_col: xAxisMetric,
      x_val: xAxisValue,
      y_col: yAxisMetric,
      y_val: yAxisValue,
    };

    quadrantDataApi(
      postData,
      (response) => {
        const formattedData = [
          {
            label: "High Potential Products",
            value: `${response.data.high_potential.percent}%`,
            count: response.data.high_potential.number,
          },
          {
            label: "Top Performing Products",
            value: `${response.data.top_performing.percent}%`,
            count: response.data.top_performing.number,
          },
          {
            label: "Low Discovery Products",
            value: `${response.data.low_discovery.percent}%`,
            count: response.data.low_discovery.number,
          },
          {
            label: "Non Performing Products",
            value: `${response.data.non_performing.percent}%`,
            count: response.data.non_performing.number,
          },
        ];
        setQuadrantData(formattedData);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to fetch quadrant data:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (datesObj?.startDate && datesObj?.endDate) {
      fetchQuadrantData();
      fetchStopLoss();
    }
  }, [xAxisMetric, yAxisMetric, xAxisValue, yAxisValue, dateRange, datesObj]);

  const onDateRangeChange = (e) => {
    const { count, type } = JSON.parse(e.target.value);
    const startDate = moment().format("YYYY-MM-DD");
    const endDate = moment().subtract(count, type).format("YYYY-MM-DD");
    setDatesObj({ startDate, endDate });
  };

  return (
    <Layout>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <div className="border-b border-gray-200 pb-5 justify-between flex items-center">
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              margin: "20px 0",
            }}
            className=" leading-6 text-gray-900"
          >
            Dashboard
          </h3>
          <Box
            sx={{
              width: 450,
              marginTop: 3,
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 5,
            }}
          >
            {/* <DateRangePicker
              startText="Start Date"
              endText="End Date"
              value={dateRange}
              onChange={(newValue) => {
                setDateRange(newValue);
              }}
              textField={(startProps, endProps) => (
                <>
                  <TextField {...startProps} style={{ marginRight: 8 }} />
                  <TextField {...endProps} />
                </>
              )}
            /> */}
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel id="date-range-label">Date Range</InputLabel>
              <Select
                labelId="date-range-label"
                id="date-range-select"
                value={dateRange}
                label="Date Range"
                onChange={(e) => {
                  setDateRange(e.target.value);
                  if (JSON.parse(e.target.value).type !== "custom") {
                    onDateRangeChange(e);
                  } else {
                    setDatesObj({ startDate: null, endDate: null });
                  }
                }}
                sx={{
                  backgroundColor: "white",
                  boxShadow: "10px 10px 100px 0px rgba(16, 28, 45, 0.08)",
                }}
              >
                <MenuItem value={JSON.stringify({ count: 3, type: "days" })}>
                  Last 3 Days
                </MenuItem>
                <MenuItem value={JSON.stringify({ count: 7, type: "days" })}>
                  Last 7 Days
                </MenuItem>
                <MenuItem value={JSON.stringify({ count: 1, type: "months" })}>
                  Last Month
                </MenuItem>
                <MenuItem value={JSON.stringify({ count: 6, type: "months" })}>
                  Last 6 Months
                </MenuItem>
                <MenuItem value={JSON.stringify({ count: 1, type: "year" })}>
                  Last Year
                </MenuItem>
                <MenuItem value={JSON.stringify({ count: 1, type: "custom" })}>
                  Custom
                </MenuItem>
              </Select>
            </FormControl>
            {dateRange && JSON.parse(dateRange)?.type == "custom" && (
              <>
                <DesktopDatePicker
                  label="Start Date"
                  value={datesObj.startDate ? moment(datesObj.startDate) : null}
                  onChange={(e) => {
                    setDatesObj({
                      startDate: moment(e).format("YYYY-MM-DD"),
                      endDate: null,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="End Date"
                  value={datesObj.endDate ? moment(datesObj.endDate) : null}
                  onChange={(e) => {
                    setDatesObj({
                      ...datesObj,
                      endDate: moment(e).format("YYYY-MM-DD"),
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </>
            )}
          </Box>
        </div>

        {/* Date Range Picker Section */}

        {/* Dropdowns Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
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
            <div
              style={{
                margin: "10px",
                alignItems: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Quadrant View
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  maxWidth: "800px",
                  margin: "0 auto",
                }}
              >
                {quadrantData.map((data, index) => (
                  <div
                    key={index}
                    style={{
                      flex: "1 1 50%",
                      maxWidth: "calc(50% - 20px)",
                      margin: "10px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      padding: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "70px",
                        backgroundColor: COLORS[index % 4],
                      }}
                    ></div>
                    <div style={{ marginLeft: "20px", width: "100%" }}>
                      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                        {data.value}
                      </div>
                      <div>{data.label}</div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        ({data.count})
                        <div
                          style={{
                            color: "#007bff",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                          }}
                        >
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
                margin: "10px",
                alignItems: "center",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#fff",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Stop Loss
              </div>
              {/* Stop Loss Summary Card */}
              <div
                style={{
                  marginTop: "20px",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  width: "50%",
                  margin: "20px auto",
                  textAlign: "left",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h3 style={{ fontSize: "22px", fontWeight: "bold" }}>
                    {summaryData.title}
                  </h3>
                  <div
                    style={{
                      color: "#007bff",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push("/productAnalytics");
                    }}
                  >
                    View Products
                  </div>
                </div>

                <p style={{ fontSize: "18px" }}>{summaryData.description}</p>
                <p style={{ fontSize: "16px", color: "#666" }}>
                  {stopLossData.cash_saved}/-
                </p>
              </div>
            </div>
          </div>
        )}
      </LocalizationProvider>
    </Layout>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default Home;
