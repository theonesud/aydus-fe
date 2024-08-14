"use client";
import React, { useEffect, useState } from "react";
import AnalyticsTable from "@/components/Table";
import FilterComponent from "@/components/FilterComponent";
import Layout from "@/components/Layout";
import { parse } from "papaparse";
import { saveAs } from "file-saver";
import { Stack, Chip } from "@mui/material";
import AddStopLossRuleModal from "@/components/AddStopLossRuleModal";
import ApplyRule from "@/components/ApplyRuleModal";
import StopLossFilterComponent from "@/components/StopLossFilterComponent";
import { fetchStopLossData } from "@/utils/api";

const AddRule = () => {
  const [filterText, setFilterText] = useState("");
  const [productsData, setProductsData] = useState([]);
  // console.log(productsData, "productsData");
  const [appliedConditions, setAppliedConditions] = useState([]); // State to hold applied conditions
  const [applyRuleOpen, setApplyRuleOpen] = useState(false);

  // Fetch and parse CSV on mount
  useEffect(() => {
    fetchProductsApiCall(); // Call the API on mount
  }, []);

  const fetchProductsApiCall = async (inputData = {}) => {
    try {
      // Call the API
      await fetchStopLossData(
        inputData,
        (response) => {
          console.log("API Response:", response.data); // Log the response
          // Optionally update productsData with the API response
          setProductsData(response.data.data || []);
        },
        (error) => {
          console.error("API Error:", error);
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

  const handleApplyConditions = (conditions) => {
    setAppliedConditions(conditions);
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Layout>
        <div className="p-4 pt-20">
          {/* <h1 className="text-3xl font-semibold leading-16 text-gray-900 pb-10 pt-16">
          Product Insights
        </h1> */}
          {/* <FilterComponent
            onFilterChange={(event) => setFilterText(event.target.value)}
            onDownload={handleDownload}
            onApplyConditions={handleApplyConditions} // pass the handler
            handleOpen={() => setOpen(true)}
            onApplyClick={() => setApplyRuleOpen(true)}
          /> */}
          <StopLossFilterComponent
            onFilterChange={(event) => setFilterText(event.target.value)}
            onDownload={handleDownload}
            onApplyConditions={handleApplyConditions} // pass the handler
            handleOpen={() => setOpen(true)}
            onApplyClick={() => setApplyRuleOpen(true)}
          />
          {/* Display applied conditions as chips */}
          <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
            {appliedConditions.map((condition, index) => (
              <Chip
                key={index}
                label={`${condition.field} ${condition.operator} ${condition.value}`}
                color="primary"
                variant="outlined"
                sx={{
                  fontSize: 14,
                }}
              />
            ))}
          </Stack>
          <AnalyticsTable productsData={productsData} />
          {/* <AddStopLossRuleModal open={open} setOpen={setOpen} /> */}
          <ApplyRule open={applyRuleOpen} setOpen={setApplyRuleOpen} />
        </div>
      </Layout>
    </div>
  );
};

export default AddRule;
