"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Typography,
  Modal,
  Stack,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const StopLossFilterComponent = ({
  onFilterChange,
  onDateRangeChange,
  // dateRange,
  onApplyConditions,
  onDownload,
  handleOpen,
  onApplyClick,
  handleClickOpenFunction,
}) => {
  const [dateRange, setDateRange] = useState(null);
  console.log(dateRange, "skdlkfjl");
  const [exclusionDetails, setExclusionDetails] = useState({
    metrics_filter: [],
    attribute_filter: [],
  });
  const [inclusionDetails, setInclusionDetails] = useState({
    metrics_filter: [],
    attribute_filter: [],
  });
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    exclusionDetails: "metrics",
    inclusionDetails: "metrics",
  });
  const [selectedMetrics, setSelectedMetrics] = useState({
    exclusionDetails: false,
    inclusionDetails: false,
  });
  const [isMetApplied, setIsMetApplied] = useState({
    exclusionDetails: false,
    inclusionDetails: false,
  });
  const [isAtrApplied, setIsAtrApplied] = useState({
    exclusionDetails: false,
    inclusionDetails: false,
  });
  const [selectedAttributes, setSelectedAttributes] = useState({
    exclusionDetails: false,
    inclusionDetails: false,
  });
  const [metricsConditions, setMetricsConditions] = useState({
    exclusionDetails: [],
    inclusionDetails: [],
  });
  const [attributeConditions, setAttributeConditions] = useState({
    exclusionDetails: [],
    inclusionDetails: [],
  });
  console.log(selectedMetrics, selectedAttributes, "skfjdsljf");
  const [newMetricsCondition, setNewMetricsCondition] = useState({
    field: "",
    operator: "",
    value: "",
    conjunction: "AND", // Default conjunction
  });
  const [newAttributesCondition, setNewAttributesCondition] = useState({
    field: "",
    operator: "",
    value: "",
    conjunction: "AND", // Default conjunction
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // new state
  // const [dateRange, setDateRange] = useState({startDate: null, endDate: null});

  const handleClickOpen = () => {
    handleClickOpenFunction();
    // setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingIndex(null);
  };

  const handleOptionSelect = (type, option) => {
    setSelectedOption({ ...selectedOption, [type]: option });
  };

  const handleMetricOpen = (type) => {
    setSelectedMetrics({ ...selectedMetrics, [type]: true });
    setIsMetApplied({ ...isMetApplied, [type]: true });
  };

  const handleAtrOpen = (type) => {
    setSelectedAttributes({ ...selectedAttributes, [type]: true });
    setIsAtrApplied({
      ...isAtrApplied,
      [type]: true,
    });
  };

  // const addCondition = (type) => {
  //   setConditions({
  //     ...conditions,
  //     [type]: [...conditions[type], newCondition],
  //   });
  //   setNewCondition({ field: "", operator: "", value: "", conjunction: "AND" }); // Reset with default conjunction
  // };

  // const deleteCondition = (index, type) => {
  //   setConditions({
  //     ...conditions,
  //     [type]: conditions[type].filter((_, i) => i !== index),
  //   });
  // };

  // const handleChange = (prop, index, type) => (event) => {
  //   if (index !== undefined) {
  //     // Editing existing condition
  //     const updatedConditions = [...conditions[type]];
  //     updatedConditions[index][prop] = event.target.value;
  //     setConditions({ ...conditions, [type]: updatedConditions });
  //   } else {
  //     // Updating new condition form
  //     setNewCondition({ ...newCondition, [prop]: event.target.value });
  //   }
  // };

  const addMetricsCondition = (type) => {
    setMetricsConditions({
      ...metricsConditions,
      [type]: [...metricsConditions[type], newMetricsCondition],
    });
    setNewMetricsCondition({
      field: "",
      operator: "",
      value: "",
      conjunction: "AND",
    }); // Reset with default conjunction
  };

  const deleteMetricsCondition = (index, type) => {
    setMetricsConditions({
      ...metricsConditions,
      [type]: metricsConditions[type].filter((_, i) => i !== index),
    });
  };

  const handleMetricsChange = (prop, index, type) => (event) => {
    if (index !== undefined) {
      // Editing existing condition
      const updatedConditions = [...metricsConditions[type]];
      updatedConditions[index][prop] = event.target.value;
      setMetricsConditions({ ...metricsConditions, [type]: updatedConditions });
    } else {
      // Updating new condition form
      setNewMetricsCondition({
        ...newMetricsCondition,
        [prop]: event.target.value,
      });
    }
  };

  const addAttributesCondition = (type) => {
    setAttributeConditions({
      ...attributeConditions,
      [type]: [...attributeConditions[type], newAttributesCondition],
    });
    setNewAttributesCondition({
      field: "",
      operator: "",
      value: "",
      conjunction: "AND",
    }); // Reset with default conjunction
  };

  const deleteAttributesCondition = (index, type) => {
    setAttributeConditions({
      ...attributeConditions,
      [type]: attributeConditions[type].filter((_, i) => i !== index),
    });
  };

  const handleAttributesChange = (prop, index, type) => (event) => {
    if (index !== undefined) {
      // Editing existing condition
      const updatedConditions = [...attributeConditions[type]];
      updatedConditions[index][prop] = event.target.value;
      setAttributeConditions({
        ...attributeConditions,
        [type]: updatedConditions,
      });
    } else {
      // Updating new condition form
      setNewAttributesCondition({
        ...newAttributesCondition,
        [prop]: event.target.value,
      });
    }
  };

  const startEditingCondition = (index) => {
    setEditingIndex(index);
  };

  const stopEditingCondition = () => {
    setEditingIndex(null);
  };
  const handleApply = () => {
    onApplyConditions(metricsConditions, attributeConditions); // send conditions to parent
    handleClose();
  };
  const commonTypographyStyles = {
    padding: 1,
    cursor: "pointer",
    borderRadius: 2,
    marginBottom: 2,
    marginRight: 3,
  };

  const selectedStyles = {
    backgroundColor: "#f0f0f0",
    color: "#1B39CA",
  };

  const appliedBadgeStyles = {
    background: "white",
    fontSize: "12px",
    padding: "2px 4px",
    borderRadius: 10,
    color: "black",
    marginLeft: 8,
  };

  const fieldOptions = [
    "ActiveProductCount",
    "ActiveVariantCount",
    "AddToCartRate",
    "AddToCarts",
    "AverageSellingPrice",
    "BlendedCRRCatalogAds",
    "BlendedCRREstSpends",
    "BlendedROASCatalogAds",
    "BlendedROASEstSpends",
    "CPSCatalogSpends",
    "CPSEstSpends",
    "ConversionRate",
    "DiscountedProductCount",
    "FbCPC",
    "FbCTR",
    "FbClicks",
    "FbImpressions",
    "GABlendedCRRCatalogSpends",
    "GABlendedCRREstSpends",
    "GABlendedROASCatalogSpends",
    "GABlendedROASEstSpends",
    "GACPSCatalogSpends",
    "GACPSEstSpends",
    "GoogleCPC",
    "GoogleCTR",
    "GoogleClicks",
    "GoogleImpressions",
    "InStockProductCount",
    "InStockVariantCount",
    "OutOfStockProductCount",
    "OutofstockVariantsCount",
    "ProductName",
    "ProductPageViews",
    "ProductSku",
    "PurchaseValue",
    "Purchases",
    "PurchasesPmaxAds",
    "PurchasesValuePmaxAds",
    "Purchases_1",
    "ROASPmaxAds",
    "SpendsCatalogAds",
    "SpendsPMaxAds",
    "TotalCatalogSpendsFB+Google",
    "TotalProductCount",
    "TotalRevenue",
    "TotalSpendEstimated",
    "TransactionRate",
  ];

  const attributeFieldOptions = [
    "ProductSKU",
    "VariantSKU",
    "ProductName",
    "Category",
    "Collections",
    "DaysAdded",
    "PagePath",
  ];

  const operators = [
    { value: "==", label: "Equals" },
    { value: "!=", label: "Not Equals" },
    { value: ">", label: "Greater Than" },
    { value: "<", label: "Less Than" },
    { value: ">=", label: "Greater Than or Equals" },
    { value: "<=", label: "Less Than or Equals" },
  ];

  // console.log(selectedMetrics, "selectedMetrics");

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <TextField
        size="small"
        label="Search"
        variant="outlined"
        onChange={onFilterChange}
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
        sx={{
          flexGrow: 1,
          boxShadow: "10px 10px 100px 0px rgba(16, 28, 45, 0.08)",
        }}
      />
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid #e0e0e0",
          boxShadow: "10px 10px 100px 0px rgba(16, 28, 45, 0.08)",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          width: "100px",
          height: "40px",
        }}
      >
        Filters
      </Button>
      <FormControl size="small" sx={{ minWidth: 130 }}>
        <InputLabel id="date-range-label">Date Range</InputLabel>
        <Select
          labelId="date-range-label"
          id="date-range-select"
          value={dateRange}
          label="Date Range"
          onChange={(e) => {
            onDateRangeChange(e);
            setDateRange(e.target.value);
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
        </Select>
      </FormControl>
      {onApplyClick && (
        <button
          onClick={onApplyClick}
          type="button"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Apply
        </button>
      )}
      <IconButton
        onClick={onDownload}
        sx={{
          color: "#79798C",
          "&:hover": {
            backgroundColor: "#C7C7C7",
          },
        }}
        aria-label="download"
      >
        <FileDownloadIcon />
      </IconButton>

      {/* Modal for additional filters */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 1100,
            height: 700,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            py: 7,
            borderRadius: 1,
            display: "flex",
            overflow: "auto",
            flexDirection: "column",
            // gap:
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Exclusion details */}
          <div
            style={{ marginBottom: "20px", fontSize: "24px", fontWeight: 500 }}
          >
            Exclusion Details
          </div>
          <div style={{ display: "flex", flex: 1 }}>
            {/* Sidebar */}

            <Box
              sx={{
                width: 200,
                borderRight: 1,
                borderColor: "divider",
                mr: 2,
              }}
            >
              <Typography
                variant="h6"
                onClick={() =>
                  handleOptionSelect("exclusionDetails", "metrics")
                }
                className={`font-sans `}
                sx={{
                  ...commonTypographyStyles,
                  ...(selectedOption.exclusionDetails === "metrics"
                    ? selectedStyles
                    : {}),
                }}
              >
                Metrics
                {isMetApplied.exclusionDetails && (
                  <span style={appliedBadgeStyles}>Applied</span>
                )}
              </Typography>

              <Typography
                variant="h6"
                onClick={() =>
                  handleOptionSelect("exclusionDetails", "attributes")
                }
                className={`font-sans `}
                sx={{
                  ...commonTypographyStyles,
                  ...(selectedOption.exclusionDetails === "attributes"
                    ? selectedStyles
                    : {}),
                  marginBottom: 0, // To remove margin-bottom from the last item
                }}
              >
                Attributes
                {isAtrApplied.exclusionDetails && (
                  <span style={appliedBadgeStyles}>Applied</span>
                )}
              </Typography>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 2 }}>
              {selectedOption.exclusionDetails === "metrics" && (
                <div>
                  <Typography variant="h5">Add a metric filter</Typography>
                  <div
                    style={{
                      fontSize: "14px",
                      marginBottom: 16,
                    }}
                  >
                    Common metrics include: Spend, Revenue, Clicks, CTR
                  </div>
                  {selectedMetrics.exclusionDetails ? (
                    <div>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          bgcolor: "background.paper",
                          boxShadow: 2,
                          p: 4,
                          borderRadius: 2,
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            setSelectedMetrics({
                              ...selectedAttributes,
                              exclusionDetails: false,
                            });
                            setIsMetApplied({
                              ...isMetApplied,
                              exclusionDetails: false,
                            });
                          }}
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        {metricsConditions.exclusionDetails.map(
                          (condition, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                gap: 10,
                                marginBottom: 10,
                              }}
                            >
                              <FormControl fullWidth>
                                <InputLabel>Select Field</InputLabel>
                                <Select
                                  value={condition.field}
                                  label="Select Field"
                                  onChange={handleMetricsChange(
                                    "field",
                                    index,
                                    "exclusionDetails"
                                  )}
                                >
                                  {fieldOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <FormControl fullWidth>
                                <InputLabel>Select Operator</InputLabel>
                                <Select
                                  value={condition.operator}
                                  label="Select Operator"
                                  onChange={handleMetricsChange(
                                    "operator",
                                    index,
                                    "exclusionDetails"
                                  )}
                                >
                                  {operators.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <TextField
                                fullWidth
                                label="Enter Value"
                                value={condition.value}
                                onChange={handleMetricsChange(
                                  "value",
                                  index,
                                  "exclusionDetails"
                                )}
                              />
                              <IconButton
                                onClick={() =>
                                  deleteMetricsCondition(
                                    index,
                                    "exclusionDetails"
                                  )
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          )
                        )}
                        <div sx={{ mb: 2 }}>Add Condition</div>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          {metricsConditions.exclusionDetails.length > 0 && (
                            <FormControl fullWidth>
                              <InputLabel>Select Conjunction</InputLabel>
                              <Select
                                value={newMetricsCondition.conjunction}
                                label="Select Conjunction"
                                onChange={handleMetricsChange("conjunction")}
                              >
                                <MenuItem value="AND">AND</MenuItem>
                                <MenuItem value="OR">OR</MenuItem>
                              </Select>
                            </FormControl>
                          )}

                          <FormControl fullWidth>
                            <InputLabel>Select Field</InputLabel>
                            <Select
                              value={newMetricsCondition.field}
                              label="Select Field"
                              onChange={handleMetricsChange("field")}
                            >
                              {fieldOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl fullWidth>
                            <InputLabel>Select Operator</InputLabel>
                            <Select
                              value={newMetricsCondition.operator}
                              label="Select Operator"
                              onChange={handleMetricsChange("operator")}
                            >
                              {operators.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            label="Enter Value"
                            value={newMetricsCondition.value}
                            onChange={handleMetricsChange("value")}
                          />
                        </Box>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() =>
                              addMetricsCondition("exclusionDetails")
                            }
                          >
                            Add Condition
                          </Button>
                        </div>
                      </Box>
                      <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
                        {metricsConditions.exclusionDetails.map(
                          (condition, index) => (
                            <React.Fragment key={index}>
                              {index > 0 && (
                                <Chip
                                  label={`${condition.conjunction}`}
                                  color="primary"
                                  variant="outlined"
                                  sx={{
                                    fontSize: 14,
                                  }}
                                />
                              )}

                              {editingIndex === index ? (
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <FormControl size="small" fullWidth>
                                    <InputLabel>Select Field</InputLabel>
                                    <Select
                                      value={condition.field}
                                      label="Select Field"
                                      onChange={handleMetricsChange(
                                        "field",
                                        index
                                      )}
                                    >
                                      {fieldOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                          {option}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <FormControl size="small" fullWidth>
                                    <InputLabel>Select Operator</InputLabel>
                                    <Select
                                      value={condition.operator}
                                      label="Select Operator"
                                      onChange={handleMetricsChange(
                                        "operator",
                                        index,
                                        "exclusionDetails"
                                      )}
                                    >
                                      {operators.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <TextField
                                    size="small"
                                    value={condition.value}
                                    onChange={handleMetricsChange(
                                      "value",
                                      index,
                                      "exclusionDetails"
                                    )}
                                  />
                                  <IconButton onClick={stopEditingCondition}>
                                    <CloseIcon />
                                  </IconButton>
                                </Box>
                              ) : (
                                <Chip
                                  label={`${condition.field} ${condition.operator} ${condition.value}`}
                                  onClick={() => startEditingCondition(index)}
                                  onDelete={() =>
                                    deleteMetricsCondition(
                                      index,
                                      "exclusionDetails"
                                    )
                                  }
                                  color="primary"
                                  variant="outlined"
                                  sx={{
                                    fontSize: 14,
                                  }}
                                />
                              )}
                            </React.Fragment>
                          )
                        )}
                      </Stack>
                    </div>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleMetricOpen("exclusionDetails")}
                      sx={{
                        backgroundColor: "white",
                        color: "gray.900",
                        border: "1px solid #e0e0e0",
                        fontSize: "0.875rem", // Equivalent to text-sm in Tailwind CSS
                        fontWeight: 600, // Equivalent to font-semibold
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // Equivalent to shadow-sm
                        paddingX: "0.875rem", // Equivalent to px-3.5 in Tailwind CSS
                        paddingY: "0.625rem", // Equivalent to py-2.5 in Tailwind CSS
                        borderRadius: "0.375rem", // Equivalent to rounded-md
                        "&:hover": {
                          backgroundColor: "#f5f5f5", // Equivalent to hover:bg-gray-50
                        },
                        width: "auto",
                        height: "40px",
                        ring: "1px solid #e0e0e0", // Equivalent to ring-1 ring-inset ring-gray-300
                      }}
                    >
                      + Add Metric Filter
                    </Button>
                  )}
                </div>
              )}
              {selectedOption.exclusionDetails === "attributes" && (
                <div>
                  <Typography variant="h5">Add an attribute filter</Typography>
                  <div
                    style={{
                      fontSize: "14px",
                      marginBottom: 16,
                    }}
                  >
                    Common attributes include: SKU id, MRP, Price
                  </div>
                  {selectedAttributes.exclusionDetails ? (
                    <div>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          bgcolor: "background.paper",
                          boxShadow: 2,
                          p: 4,
                          borderRadius: 2,
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            setSelectedAttributes({
                              ...selectedAttributes,
                              exclusionDetails: false,
                            });
                            setIsAtrApplied({
                              ...isAtrApplied,
                              exclusionDetails: false,
                            });
                          }}
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        {attributeConditions.exclusionDetails.map(
                          (condition, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                gap: 10,
                                marginBottom: 10,
                              }}
                            >
                              <FormControl fullWidth>
                                <InputLabel>Select Field</InputLabel>
                                <Select
                                  value={condition.field}
                                  label="Select Field"
                                  onChange={handleAttributesChange(
                                    "field",
                                    index,
                                    "exclusionDetails"
                                  )}
                                >
                                  {attributeFieldOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <FormControl fullWidth>
                                <InputLabel>Select Operator</InputLabel>
                                <Select
                                  value={condition.operator}
                                  label="Select Operator"
                                  onChange={handleAttributesChange(
                                    "operator",
                                    index,
                                    "exclusionDetails"
                                  )}
                                >
                                  {operators.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <TextField
                                fullWidth
                                label="Enter Value"
                                value={condition.value}
                                onChange={handleAttributesChange(
                                  "value",
                                  index,
                                  "exclusionDetails"
                                )}
                              />
                              <IconButton
                                onClick={() =>
                                  deleteAttributesCondition(
                                    index,
                                    "exclusionDetails"
                                  )
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          )
                        )}
                        <div sx={{ mb: 2 }}>Add Condition</div>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          {attributeConditions.exclusionDetails.length > 0 && (
                            <FormControl fullWidth>
                              <InputLabel>Select Conjunction</InputLabel>
                              <Select
                                value={newAttributesCondition.conjunction}
                                label="Select Conjunction"
                                onChange={handleMetricsChange("conjunction")}
                              >
                                <MenuItem value="AND">AND</MenuItem>
                                <MenuItem value="OR">OR</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                          <FormControl fullWidth>
                            <InputLabel>Select Field</InputLabel>
                            <Select
                              value={newAttributesCondition.field}
                              label="Select Field"
                              onChange={handleAttributesChange("field")}
                            >
                              {attributeFieldOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl fullWidth>
                            <InputLabel>Select Operator</InputLabel>
                            <Select
                              value={newAttributesCondition.operator}
                              label="Select Operator"
                              onChange={handleAttributesChange("operator")}
                            >
                              <MenuItem value="equals">Equals</MenuItem>
                              <MenuItem value="contains">Contains</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            label="Enter Value"
                            value={newAttributesCondition.value}
                            onChange={handleAttributesChange("value")}
                          />
                        </Box>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() =>
                              addAttributesCondition("exclusionDetails")
                            }
                          >
                            Add Condition
                          </Button>
                        </div>
                      </Box>
                      <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
                        {attributeConditions.exclusionDetails.map(
                          (condition, index) => (
                            <React.Fragment key={index}>
                              {index > 0 && (
                                <Chip
                                  label={`${condition.conjunction}`}
                                  color="primary"
                                  variant="outlined"
                                  sx={{
                                    fontSize: 14,
                                  }}
                                />
                              )}

                              {editingIndex === index ? (
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <FormControl size="small" fullWidth>
                                    <InputLabel>Select Field</InputLabel>
                                    <Select
                                      value={condition.field}
                                      label="Select Field"
                                      onChange={handleAttributesChange(
                                        "field",
                                        index,
                                        "exclusionDetails"
                                      )}
                                    >
                                      {fieldOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                          {option}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <FormControl size="small" fullWidth>
                                    <InputLabel>Select Operator</InputLabel>
                                    <Select
                                      value={condition.operator}
                                      label="Select Operator"
                                      onChange={handleAttributesChange(
                                        "operator",
                                        index
                                      )}
                                    >
                                      {operators.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <TextField
                                    size="small"
                                    value={condition.value}
                                    onChange={handleAttributesChange(
                                      "value",
                                      index,
                                      "exclusionDetails"
                                    )}
                                  />
                                  <IconButton onClick={stopEditingCondition}>
                                    <CloseIcon />
                                  </IconButton>
                                </Box>
                              ) : (
                                <Chip
                                  label={`${condition.field} ${condition.operator} ${condition.value}`}
                                  onClick={() => startEditingCondition(index)}
                                  onDelete={() =>
                                    deleteAttributesCondition(
                                      index,
                                      "exclusionDetails"
                                    )
                                  }
                                  color="primary"
                                  variant="outlined"
                                  sx={{
                                    fontSize: 14,
                                  }}
                                />
                              )}
                            </React.Fragment>
                          )
                        )}
                      </Stack>
                    </div>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleAtrOpen("exclusionDetails")}
                      sx={{
                        backgroundColor: "white",
                        color: "gray.900",
                        border: "1px solid #e0e0e0",
                        fontSize: "0.875rem", // Equivalent to text-sm in Tailwind CSS
                        fontWeight: 600, // Equivalent to font-semibold
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // Equivalent to shadow-sm
                        paddingX: "0.875rem", // Equivalent to px-3.5 in Tailwind CSS
                        paddingY: "0.625rem", // Equivalent to py-2.5 in Tailwind CSS
                        borderRadius: "0.375rem", // Equivalent to rounded-md
                        "&:hover": {
                          backgroundColor: "#f5f5f5", // Equivalent to hover:bg-gray-50
                        },
                        width: "auto",
                        height: "40px",
                        ring: "1px solid #e0e0e0", // Equivalent to ring-1 ring-inset ring-gray-300
                      }}
                    >
                      + Add Attribute Filter
                    </Button>
                  )}
                </div>
              )}
            </Box>
          </div>

          {/* inclusion details */}
          <div
            style={{ marginBlock: "20px", fontSize: "24px", fontWeight: 500 }}
          >
            Inclusion Details
          </div>
          <div style={{ display: "flex", flex: 1 }}>
            <Box
              sx={{
                width: 200,
                borderRight: 1,
                borderColor: "divider",
                mr: 2,
              }}
            >
              <Typography
                variant="h6"
                onClick={() =>
                  handleOptionSelect("inclusionDetails", "metrics")
                }
                className={`font-sans `}
                sx={{
                  ...commonTypographyStyles,
                  ...(selectedOption.inclusionDetails === "metrics"
                    ? selectedStyles
                    : {}),
                }}
              >
                Metrics
                {isMetApplied.inclusionDetails && (
                  <span style={appliedBadgeStyles}>Applied</span>
                )}
              </Typography>

              <Typography
                variant="h6"
                onClick={() =>
                  handleOptionSelect("inclusionDetails", "attributes")
                }
                className={`font-sans `}
                sx={{
                  ...commonTypographyStyles,
                  ...(selectedOption.inclusionDetails === "attributes"
                    ? selectedStyles
                    : {}),
                  marginBottom: 0, // To remove margin-bottom from the last item
                }}
              >
                Attributes
                {isAtrApplied.inclusionDetails && (
                  <span style={appliedBadgeStyles}>Applied</span>
                )}
              </Typography>
            </Box>

            {/* Main Content */}
            <Box sx={{ flexGrow: 1, p: 2 }}>
              {selectedOption.inclusionDetails === "metrics" && (
                <div>
                  <Typography variant="h5">Add a metric filter</Typography>
                  <div
                    style={{
                      fontSize: "14px",
                      marginBottom: 16,
                    }}
                  >
                    Common metrics include: Spend, Revenue, Clicks, CTR
                  </div>
                  {selectedMetrics.inclusionDetails ? (
                    <div>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          bgcolor: "background.paper",
                          boxShadow: 2,
                          p: 4,
                          borderRadius: 2,
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            setSelectedMetrics({
                              ...selectedAttributes,
                              inclusionDetails: false,
                            });
                            setIsMetApplied({
                              ...isMetApplied,
                              inclusionDetails: false,
                            });
                          }}
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        {metricsConditions.inclusionDetails.map(
                          (condition, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                gap: 10,
                                marginBottom: 10,
                              }}
                            >
                              <FormControl fullWidth>
                                <InputLabel>Select Field</InputLabel>
                                <Select
                                  value={condition.field}
                                  label="Select Field"
                                  onChange={handleMetricsChange(
                                    "field",
                                    index,
                                    "inclusionDetails"
                                  )}
                                >
                                  {fieldOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <FormControl fullWidth>
                                <InputLabel>Select Operator</InputLabel>
                                <Select
                                  value={condition.operator}
                                  label="Select Operator"
                                  onChange={handleMetricsChange(
                                    "operator",
                                    index,
                                    "inclusionDetails"
                                  )}
                                >
                                  {operators.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <TextField
                                fullWidth
                                label="Enter Value"
                                value={condition.value}
                                onChange={handleMetricsChange(
                                  "value",
                                  index,
                                  "inclusionDetails"
                                )}
                              />
                              <IconButton
                                onClick={() =>
                                  deleteMetricsCondition(
                                    index,
                                    "inclusionDetails"
                                  )
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          )
                        )}
                        <div sx={{ mb: 2 }}>Add Condition</div>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          {metricsConditions.inclusionDetails.length > 0 && (
                            <FormControl fullWidth>
                              <InputLabel>Select Conjunction</InputLabel>
                              <Select
                                value={newMetricsCondition.conjunction}
                                label="Select Conjunction"
                                onChange={handleMetricsChange("conjunction")}
                              >
                                <MenuItem value="AND">AND</MenuItem>
                                <MenuItem value="OR">OR</MenuItem>
                              </Select>
                            </FormControl>
                          )}

                          <FormControl fullWidth>
                            <InputLabel>Select Field</InputLabel>
                            <Select
                              value={newMetricsCondition.field}
                              label="Select Field"
                              onChange={handleMetricsChange("field")}
                            >
                              {fieldOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl fullWidth>
                            <InputLabel>Select Operator</InputLabel>
                            <Select
                              value={newMetricsCondition.operator}
                              label="Select Operator"
                              onChange={handleMetricsChange("operator")}
                            >
                              {operators.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            label="Enter Value"
                            value={newMetricsCondition.value}
                            onChange={handleMetricsChange("value")}
                          />
                        </Box>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() =>
                              addMetricsCondition("inclusionDetails")
                            }
                          >
                            Add Condition
                          </Button>
                        </div>
                      </Box>
                      <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
                        {metricsConditions.inclusionDetails.map(
                          (condition, index) => (
                            <React.Fragment key={index}>
                              {index > 0 && (
                                <Chip
                                  label={`${condition.conjunction}`}
                                  color="primary"
                                  variant="outlined"
                                  sx={{
                                    fontSize: 14,
                                  }}
                                />
                              )}

                              {editingIndex === index ? (
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <FormControl size="small" fullWidth>
                                    <InputLabel>Select Field</InputLabel>
                                    <Select
                                      value={condition.field}
                                      label="Select Field"
                                      onChange={handleMetricsChange(
                                        "field",
                                        index
                                      )}
                                    >
                                      {fieldOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                          {option}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <FormControl size="small" fullWidth>
                                    <InputLabel>Select Operator</InputLabel>
                                    <Select
                                      value={condition.operator}
                                      label="Select Operator"
                                      onChange={handleMetricsChange(
                                        "operator",
                                        index,
                                        "inclusionDetails"
                                      )}
                                    >
                                      {operators.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <TextField
                                    size="small"
                                    value={condition.value}
                                    onChange={handleMetricsChange(
                                      "value",
                                      index,
                                      "inclusionDetails"
                                    )}
                                  />
                                  <IconButton onClick={stopEditingCondition}>
                                    <CloseIcon />
                                  </IconButton>
                                </Box>
                              ) : (
                                <Chip
                                  label={`${condition.field} ${condition.operator} ${condition.value}`}
                                  onClick={() => startEditingCondition(index)}
                                  onDelete={() =>
                                    deleteMetricsCondition(
                                      index,
                                      "inclusionDetails"
                                    )
                                  }
                                  color="primary"
                                  variant="outlined"
                                  sx={{
                                    fontSize: 14,
                                  }}
                                />
                              )}
                            </React.Fragment>
                          )
                        )}
                      </Stack>
                    </div>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleMetricOpen("inclusionDetails")}
                      sx={{
                        backgroundColor: "white",
                        color: "gray.900",
                        border: "1px solid #e0e0e0",
                        fontSize: "0.875rem", // Equivalent to text-sm in Tailwind CSS
                        fontWeight: 600, // Equivalent to font-semibold
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // Equivalent to shadow-sm
                        paddingX: "0.875rem", // Equivalent to px-3.5 in Tailwind CSS
                        paddingY: "0.625rem", // Equivalent to py-2.5 in Tailwind CSS
                        borderRadius: "0.375rem", // Equivalent to rounded-md
                        "&:hover": {
                          backgroundColor: "#f5f5f5", // Equivalent to hover:bg-gray-50
                        },
                        width: "auto",
                        height: "40px",
                        ring: "1px solid #e0e0e0", // Equivalent to ring-1 ring-inset ring-gray-300
                      }}
                    >
                      + Add Metric Filter
                    </Button>
                  )}
                </div>
              )}
              {selectedOption.inclusionDetails === "attributes" && (
                <div>
                  <Typography variant="h5">Add an attribute filter</Typography>
                  <div
                    style={{
                      fontSize: "14px",
                      marginBottom: 16,
                    }}
                  >
                    Common attributes include: SKU id, MRP, Price
                  </div>
                  {selectedAttributes.inclusionDetails ? (
                    <div>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          bgcolor: "background.paper",
                          boxShadow: 2,
                          p: 4,
                          borderRadius: 2,
                        }}
                      >
                        <IconButton
                          onClick={() => {
                            setSelectedAttributes({
                              ...selectedAttributes,
                              inclusionDetails: false,
                            });
                            setIsAtrApplied({
                              ...isAtrApplied,
                              inclusionDetails: false,
                            });
                          }}
                          sx={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                        {attributeConditions.inclusionDetails.map(
                          (condition, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                gap: 10,
                                marginBottom: 10,
                              }}
                            >
                              <FormControl fullWidth>
                                <InputLabel>Select Field</InputLabel>
                                <Select
                                  value={condition.field}
                                  label="Select Field"
                                  onChange={handleAttributesChange(
                                    "field",
                                    index,
                                    "inclusionDetails"
                                  )}
                                >
                                  {attributeFieldOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                      {option}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <FormControl fullWidth>
                                <InputLabel>Select Operator</InputLabel>
                                <Select
                                  value={condition.operator}
                                  label="Select Operator"
                                  onChange={handleAttributesChange(
                                    "operator",
                                    index,
                                    "inclusionDetails"
                                  )}
                                >
                                  {operators.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                              <TextField
                                fullWidth
                                label="Enter Value"
                                value={condition.value}
                                onChange={handleAttributesChange(
                                  "value",
                                  index,
                                  "inclusionDetails"
                                )}
                              />
                              <IconButton
                                onClick={() =>
                                  deleteAttributesCondition(
                                    index,
                                    "inclusionDetails"
                                  )
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </div>
                          )
                        )}
                        <div sx={{ mb: 2 }}>Add Condition</div>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          {attributeConditions.inclusionDetails.length > 0 && (
                            <FormControl fullWidth>
                              <InputLabel>Select Conjunction</InputLabel>
                              <Select
                                value={newAttributesCondition.conjunction}
                                label="Select Conjunction"
                                onChange={handleMetricsChange("conjunction")}
                              >
                                <MenuItem value="AND">AND</MenuItem>
                                <MenuItem value="OR">OR</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                          <FormControl fullWidth>
                            <InputLabel>Select Field</InputLabel>
                            <Select
                              value={newAttributesCondition.field}
                              label="Select Field"
                              onChange={handleAttributesChange("field")}
                            >
                              {attributeFieldOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl fullWidth>
                            <InputLabel>Select Operator</InputLabel>
                            <Select
                              value={newAttributesCondition.operator}
                              label="Select Operator"
                              onChange={handleAttributesChange("operator")}
                            >
                              <MenuItem value="equals">Equals</MenuItem>
                              <MenuItem value="contains">Contains</MenuItem>
                            </Select>
                          </FormControl>
                          <TextField
                            fullWidth
                            label="Enter Value"
                            value={newAttributesCondition.value}
                            onChange={handleAttributesChange("value")}
                          />
                        </Box>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() =>
                              addAttributesCondition("inclusionDetails")
                            }
                          >
                            Add Condition
                          </Button>
                        </div>
                      </Box>
                      <Stack direction="row" spacing={1} sx={{ mb: 2, mt: 4 }}>
                        {attributeConditions.inclusionDetails.map(
                          (condition, index) => (
                            <React.Fragment key={index}>
                              {index > 0 && (
                                <Chip
                                  label={`${condition.conjunction}`}
                                  color="primary"
                                  variant="outlined"
                                  sx={{
                                    fontSize: 14,
                                  }}
                                />
                              )}

                              {editingIndex === index ? (
                                <Box sx={{ display: "flex", gap: 1 }}>
                                  <FormControl size="small" fullWidth>
                                    <InputLabel>Select Field</InputLabel>
                                    <Select
                                      value={condition.field}
                                      label="Select Field"
                                      onChange={handleAttributesChange(
                                        "field",
                                        index,
                                        "inclusionDetails"
                                      )}
                                    >
                                      {fieldOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                          {option}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <FormControl size="small" fullWidth>
                                    <InputLabel>Select Operator</InputLabel>
                                    <Select
                                      value={condition.operator}
                                      label="Select Operator"
                                      onChange={handleAttributesChange(
                                        "operator",
                                        index
                                      )}
                                    >
                                      {operators.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <TextField
                                    size="small"
                                    value={condition.value}
                                    onChange={handleAttributesChange(
                                      "value",
                                      index,
                                      "inclusionDetails"
                                    )}
                                  />
                                  <IconButton onClick={stopEditingCondition}>
                                    <CloseIcon />
                                  </IconButton>
                                </Box>
                              ) : (
                                <Chip
                                  label={`${condition.field} ${condition.operator} ${condition.value}`}
                                  onClick={() => startEditingCondition(index)}
                                  onDelete={() =>
                                    deleteAttributesCondition(
                                      index,
                                      "inclusionDetails"
                                    )
                                  }
                                  color="primary"
                                  variant="outlined"
                                  sx={{
                                    fontSize: 14,
                                  }}
                                />
                              )}
                            </React.Fragment>
                          )
                        )}
                      </Stack>
                    </div>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => handleAtrOpen("inclusionDetails")}
                      sx={{
                        backgroundColor: "white",
                        color: "gray.900",
                        border: "1px solid #e0e0e0",
                        fontSize: "0.875rem", // Equivalent to text-sm in Tailwind CSS
                        fontWeight: 600, // Equivalent to font-semibold
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // Equivalent to shadow-sm
                        paddingX: "0.875rem", // Equivalent to px-3.5 in Tailwind CSS
                        paddingY: "0.625rem", // Equivalent to py-2.5 in Tailwind CSS
                        borderRadius: "0.375rem", // Equivalent to rounded-md
                        "&:hover": {
                          backgroundColor: "#f5f5f5", // Equivalent to hover:bg-gray-50
                        },
                        width: "auto",
                        height: "40px",
                        ring: "1px solid #e0e0e0", // Equivalent to ring-1 ring-inset ring-gray-300
                      }}
                    >
                      + Add Attribute Filter
                    </Button>
                  )}
                </div>
              )}
            </Box>
          </div>

          <div className="w-full flex items-center justify-end mt-5">
            <Button
              variant="contained"
              onClick={handleApply}
              sx={{
                // position: "absolute",
                // bottom: 16,
                // right: 16,
                width: "100px",
                height: "40px",
              }}
            >
              Apply
            </Button>
          </div>
        </Box>
      </Modal>
    </Box>
  );
};

export default StopLossFilterComponent;
