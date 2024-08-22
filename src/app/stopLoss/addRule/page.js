"use client";
import React, { useEffect, useState } from "react";
import AnalyticsTable from "@/components/Table";
import FilterComponent from "@/components/FilterComponent";
import Layout from "@/components/Layout";
import { parse } from "papaparse";
import { saveAs } from "file-saver";
import { Stack, Chip, Box, CircularProgress } from "@mui/material";
import AddStopLossRuleModal from "@/components/AddStopLossRuleModal";
import ApplyRule from "@/components/ApplyRuleModal";
import StopLossFilterComponent from "@/components/StopLossFilterComponent";
import { createStopLoss, fetchStopLossData } from "@/utils/api";
import moment from "moment";
import { Bounce, toast } from "react-toastify";

const AddRule = () => {
  const [filterText, setFilterText] = useState("");
  const [productsData, setProductsData] = useState([]);
  // console.log(productsData, "productsData");
  const [appliedConditions, setAppliedConditions] = useState({
    inclusionDetails: [],
    exclusionDetails: [],
  }); // State to hold applied conditions
  console.log(appliedConditions, "appliedConditions");
  const [applyRuleOpen, setApplyRuleOpen] = useState(false);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [filtersData, setFiltersData] = useState({
    inclusion_details: {
      metrics_filter: [],
      attribute_filter: [],
    },
    exclusion_details: {
      metrics_filter: [],
      attribute_filter: [],
    },
  });
  console.log(dates, "dates");

  // Fetch and parse CSV on mount
  useEffect(() => {
    handleApplyConditions(); // Call the API on mount
  }, [dates]);

  // const fetchProductsApiCall = async (inputData = {}) => {
  //   try {
  //     // Call the API
  //     await fetchStopLossData(
  //       inputData,
  //       (response) => {
  //         console.log("API Response:", response.data); // Log the response
  //         // Optionally update productsData with the API response
  //         setProductsData(response.data.data || []);
  //       },
  //       (error) => {
  //         console.error("API Error:", error);
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Failed to call API:", error);
  //   }
  // };

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

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApplyConditions = (
    metricConditions = null,
    attributeConditions = null
  ) => {
    setLoading(true);
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

    const conditions = {
      inclusionDetails: [],
      exclusionDetails: [],
    };
    if (metricConditions?.inclusionDetails) {
      conditions.inclusionDetails = [
        ...conditions.inclusionDetails,
        ...metricConditions.inclusionDetails,
      ];
      // conditions.inclusionDetails.push(metricConditions.inclusionDetails);
    }
    if (attributeConditions?.inclusionDetails) {
      conditions.inclusionDetails = [
        ...conditions.inclusionDetails,
        ...attributeConditions.inclusionDetails,
      ];
      // conditions.inclusionDetails.push(attributeConditions.inclusionDetails);
    }
    if (metricConditions?.exclusionDetails) {
      conditions.exclusionDetails = [
        ...conditions.exclusionDetails,
        ...metricConditions.exclusionDetails,
      ];
      // conditions.exclusionDetails.push(metricConditions.exclusionDetails);
    }
    if (attributeConditions?.exclusionDetails) {
      conditions.exclusionDetails = [
        ...conditions.exclusionDetails,
        ...attributeConditions.exclusionDetails,
      ];
      // conditions.exclusionDetails.push(metricConditions.exclusionDetails);
    }
    console.log(conditions, metricConditions, attributeConditions, "sdkfjslf");
    // Define your post data structure
    const postData = {
      inclusion_details: {
        metrics_filter: metricConditions?.inclusionDetails
          ? prepareConditions(metricConditions.inclusionDetails)
          : [],
        attribute_filter: attributeConditions?.inclusionDetails
          ? prepareConditions(attributeConditions.inclusionDetails)
          : [],
      },
      exclusion_details: {
        metrics_filter: metricConditions?.exclusionDetails
          ? prepareConditions(metricConditions.exclusionDetails)
          : [],
        attribute_filter: attributeConditions?.exclusionDetails
          ? prepareConditions(attributeConditions.exclusionDetails)
          : [],
      },
      from_date: dates.endDate || "2024-07-13", // example date, update with actual
      to_date: dates.startDate || "2024-08-13", // example date, update with actual
      sorting_column: "price", // update with actual column
      sorting_order: "asc", // update with actual order
    };
    setFiltersData({
      inclusion_details: postData.inclusion_details,
      exclusion_details: postData.exclusion_details,
    });
    // console.log(postData, ());
    fetchStopLossData(
      postData,
      (response) => {
        console.log("API Response:", response.data); // Log the response
        // Optionally update productsData with the API response
        setProductsData(response.data.data || []);
        setLoading(false);
        setAppliedConditions(conditions);
      },
      (error) => {
        setLoading(false);
        console.error("API Error:", error);
      }
    );
    // fetchProductsApiCall(postData);
  };

  const onDateRangeChange = (e) => {
    console.log(e.target.value, "skjffjlsjl");
    const { count, type } = JSON.parse(e.target.value);
    const startDate = moment().format("YYYY-MM-DD");
    const endDate = moment().subtract(count, type).format("YYYY-MM-DD");
    setDates({ startDate, endDate });
  };

  const handleApply = (ruleData) => {
    // setLoading(true)
    if (!ruleData.rule_name) {
      toast.warn("Please enter a rule name");
      return;
    }
    const inputData = {
      inclusion_details: filtersData.inclusion_details,
      exclusion_details: filtersData.exclusion_details,
      from_date: dates.endDate || "2024-07-13", // example date, update with actual
      to_date: dates.startDate || "2024-08-13", // example date, update with actual
      rule_name: ruleData.rule_name,
      exclusion_limit: ruleData.exclusion_limit,
      exclude_google: ruleData.exclude_google,
      exclude_fb: ruleData.exclude_fb,
      repeats_on: ruleData.repeats_on
        .filter((item) => item.isSelected)
        .map((item) => item.day),
    };
    createStopLoss(
      inputData,
      () => {
        setApplyRuleOpen(false);
        // alert("stop loss created successfully");
        toast.success("Stop Loss created successfully");
      },
      (err) => {
        console.log(err, "jfdsljfldsf");
        // alert("failed to create stop loss");
        toast.error("Failed to create stop loss");
      }
    );
  };

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
            onDateRangeChange={onDateRangeChange}
            setDates={setDates}
          />
          {/* Display applied conditions as chips */}
          <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
            {/* <div>Inclusion Details Filters</div> */}
            {[
              ...appliedConditions.inclusionDetails,
              ...appliedConditions.exclusionDetails,
            ].map((condition, index) => (
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
          {/* <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
            <div>Exclusion Details </div>
            {appliedConditions.exclusionDetails.map((condition, index) => (
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
          </Stack> */}
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
          {/* <AddStopLossRuleModal open={open} setOpen={setOpen} /> */}
          <ApplyRule
            open={applyRuleOpen}
            setOpen={setApplyRuleOpen}
            handleApply={handleApply}
          />
        </div>
      </Layout>
    </div>
  );
};

export default AddRule;
