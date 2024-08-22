"use client";
import React, { useEffect, useState } from "react";
import AnalyticsTable from "@/components/Table";
import FilterComponent from "@/components/FilterComponent";
import Layout from "@/components/Layout";
import { parse } from "papaparse";
import { saveAs } from "file-saver";
import { Stack, Chip, CircularProgress, Box } from "@mui/material";
import { creatProductSetApi, productApi } from "@/utils/api"; // Ensure you import the API function
import { toast } from "react-toastify";
import moment from "moment";

const ProductAnalyticsPage = () => {
  const [filterText, setFilterText] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [appliedMetricConditions, setAppliedMetricConditions] = useState([]);
  const [appliedAttributeConditions, setAppliedAttributeConditions] = useState(
    []
  );
  const [loading, setLoading] = useState(false); // Loader state
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  const handleDeleteMetricCondition = (indexToDelete) => {
    setAppliedMetricConditions((conditions) => {
      const updatedConditions = conditions.filter(
        (_, index) => index !== indexToDelete
      );
      fetchProductsApiCallWithConditions(
        updatedConditions,
        appliedAttributeConditions
      ); // Call API after deletion
      return updatedConditions;
    });
  };

  const handleDeleteAttributeCondition = (indexToDelete) => {
    setAppliedAttributeConditions((conditions) => {
      const updatedConditions = conditions.filter(
        (_, index) => index !== indexToDelete
      );
      fetchProductsApiCallWithConditions(
        appliedMetricConditions,
        updatedConditions
      ); // Call API after deletion
      return updatedConditions;
    });
  };

  useEffect(() => {
    fetchProductsApiCall(); // Call the API on mount
  }, []);

  useEffect(() => {
    if (dates?.startDate && dates?.endDate) {
      handleDateRangeChange();
    }
  }, [dates]);

  const fetchProductsApiCall = async (inputData = {}) => {
    setLoading(true); // Start loading
    try {
      await productApi(
        inputData,
        (response) => {
          setProductsData(response.data.data || []);
          setLoading(false); // Stop loading
        },
        (error) => {
          console.error("API Error:", error);
          setLoading(false); // Stop loading
        }
      );
    } catch (error) {
      console.error("Failed to call API:", error);
      setLoading(false); // Stop loading
    }
  };

  const fetchProductsApiCallWithConditions = (
    metricConditions,
    attributeConditions
  ) => {
    const prepareConditions = (conditions) => {
      return conditions.map((item, index) => {
        if (index === 0) {
          let newCondition = { ...item };
          delete newCondition.conjunction;
          return newCondition;
        } else {
          let newCondition = { ...item };
          newCondition.conjunction = newCondition.conjunction.toLowerCase();
          return newCondition;
        }
      });
    };

    const postData = {
      metrics_filter: prepareConditions(metricConditions),
      attribute_filter: prepareConditions(attributeConditions),
      from_date: dates.endDate || "2024-07-13",
      to_date: dates.startDate || "2024-08-13",
      sorting_column: "price",
      sorting_order: "asc",
    };

    fetchProductsApiCall(postData);
  };

  const createProductSetCall = async (inputData = {}) => {
    try {
      await creatProductSetApi(
        inputData,
        (response) => {
          toast.success("Product set created successfully");
        },
        (error) => {
          console.error("API Error:", error);
          toast.error("Failed to create product set");
        }
      );
    } catch (error) {
      console.error("Failed to call API:", error);
    }
  };

  const handleDownload = () => {
    const filteredData = productsData.filter(
      (product) =>
        product.ProductName.toLowerCase().includes(filterText.toLowerCase()) ||
        product.ProductSku.toLowerCase().includes(filterText.toLowerCase())
    );
    const csv = filteredData
      .map((row) => Object.values(row).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "filtered_data.csv");
  };

  const handleDateRangeChange = () => {
    fetchProductsApiCallWithConditions(
      appliedMetricConditions,
      appliedAttributeConditions
    );
  };

  const handleApplyConditions = (metricConditions, attributeConditions) => {
    setAppliedMetricConditions(metricConditions);
    setAppliedAttributeConditions(attributeConditions);

    fetchProductsApiCallWithConditions(metricConditions, attributeConditions);
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="border-b border-gray-200 pb-2 mb-2">
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              margin: "20px 0",
            }}
            className=" leading-6 text-gray-900"
          >
            Product Insights
          </h3>
        </div>

        <FilterComponent
          onFilterChange={(event) => setFilterText(event.target.value)}
          onDownload={handleDownload}
          onApplyConditions={handleApplyConditions}
          handleClickOpenFunction={(data) => {
            const postData = {
              metrics_filter: appliedMetricConditions.map((item, index) => {
                if (index === 0) {
                  let newCondition = { ...item };
                  delete newCondition.conjunction;
                  return newCondition;
                } else {
                  let newCondition = { ...item };
                  newCondition.conjunction =
                    newCondition.conjunction.toLowerCase();
                  return newCondition;
                }
              }),
              attribute_filter: appliedAttributeConditions.map(
                (item, index) => {
                  if (index === 0) {
                    let newCondition = { ...item };
                    delete newCondition.conjunction;
                    return newCondition;
                  } else {
                    let newCondition = { ...item };
                    newCondition.conjunction =
                      newCondition.conjunction.toLowerCase();
                    return newCondition;
                  }
                }
              ),
              from_date: "2024-08-13",
              to_date: "2024-07-13",
            };
            if (data === "productSet") {
              createProductSetCall(postData);
            }
          }}
          onDateRangeChange={(e) => {
            const { count, type } = JSON.parse(e.target.value);
            const startDate = moment().format("YYYY-MM-DD");
            const endDate = moment().subtract(count, type).format("YYYY-MM-DD");
            setDates({ startDate, endDate });
          }}
          setDates={setDates}
        />
        <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
          {appliedMetricConditions.map((condition, index) => (
            <Chip
              key={index}
              label={`${condition.field} ${condition.operator} ${condition.value}`}
              color="primary"
              variant="outlined"
              onDelete={() => handleDeleteMetricCondition(index)}
              sx={{
                fontSize: 14,
              }}
            />
          ))}
          {appliedAttributeConditions.map((condition, index) => (
            <Chip
              key={index}
              label={`${condition.field} ${condition.operator} ${condition.value}`}
              color="primary"
              variant="outlined"
              onDelete={() => handleDeleteAttributeCondition(index)}
              sx={{
                fontSize: 14,
              }}
            />
          ))}
        </Stack>
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="300px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <AnalyticsTable productsData={productsData} />
        )}
      </div>
    </Layout>
  );
};

export default ProductAnalyticsPage;
