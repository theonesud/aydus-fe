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

const ProductAnalyticsPage = () => {
  const [filterText, setFilterText] = useState("");
  const [productsData, setProductsData] = useState([]);
  const [appliedMetricConditions, setAppliedMetricConditions] = useState([]);
  const [appliedAttributeConditions, setAppliedAttributeConditions] = useState([]);
  const [loading, setLoading] = useState(false); // Loader state

  // Fetch and parse CSV on mount
  useEffect(() => {
    fetchProductsApiCall(); // Call the API on mount
  }, []);

  const fetchProductsApiCall = async (inputData = {}) => {
    setLoading(true); // Start loading
    try {
      // Call the API
      await productApi(
        inputData,
        (response) => {
          console.log("API Response:", response.data); // Log the response
          // Optionally update productsData with the API response
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

  const createProductSetCall = async (inputData = {}) => {
    try {
      // Call the API
      await creatProductSetApi(
        inputData,
        (response) => {
          console.log("API Response:", response.data); // Log the response
          // Optionally update productsData with the API response
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

  const handleApplyConditions = (metricConditions, attributeConditions) => {
    console.log("Metric Conditions:", metricConditions);
    console.log("Attribute Conditions:", attributeConditions);
    setAppliedMetricConditions(metricConditions);
    setAppliedAttributeConditions(attributeConditions);

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

    // Define your post data structure
    const postData = {
      metrics_filter: prepareConditions(metricConditions), // assuming these are the conditions
      attribute_filter: prepareConditions(attributeConditions), // modify according to your needs
      from_date: "2024-08-13", // example date, update with actual
      to_date: "2024-07-13", // example date, update with actual
      sorting_column: "price", // update with actual column
      sorting_order: "asc", // update with actual order
    };
    fetchProductsApiCall(postData);
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
          onApplyConditions={handleApplyConditions} // pass the handler
          handleClickOpenFunction={(data) => {
            const postData = {
              metrics_filter: appliedMetricConditions.map((item, index) => {
                if (index === 0) {
                  let newCondition = { ...item };
                  delete newCondition.conjunction;
                  return newCondition;
                } else {
                  let newCondition = { ...item };
                  newCondition.conjunction = newCondition.conjunction.toLowerCase();
                  return newCondition;
                }
              }),
              attribute_filter: appliedAttributeConditions.map((item, index) => {
                if (index === 0) {
                  let newCondition = { ...item };
                  delete newCondition.conjunction;
                  return newCondition;
                } else {
                  let newCondition = { ...item };
                  newCondition.conjunction = newCondition.conjunction.toLowerCase();
                  return newCondition;
                }
              }),
              from_date: "2024-08-13", // example date, update with actual
              to_date: "2024-07-13", // example date, update with actual
            };
            if (data === 'productSet') {
              createProductSetCall(postData);
            }
          }}
        />
        {/* Display applied conditions as chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
          {[...appliedMetricConditions, ...appliedAttributeConditions].map(
            (condition, index) => (
              <Chip
                key={index}
                label={`${condition.field} ${condition.operator} ${condition.value}`}
                color="primary"
                variant="outlined"
                sx={{
                  fontSize: 14,
                }}
              />
            )
          )}
        </Stack>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
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
