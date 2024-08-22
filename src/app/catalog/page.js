"use client";
import React, { useState } from "react";
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    TextField,
    Button,
} from "@mui/material";
import Layout from "@/components/Layout";

const CatalogPage = () => {
    const [selectedOption, setSelectedOption] = useState("percentage");
    const [percentage, setPercentage] = useState(60); // Default value as shown in the screenshot
    const [number, setNumber] = useState(0);
    const [variantSize, setVariantSize] = useState(""); // If variant size option is used

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handlePercentageChange = (event) => {
        setPercentage(event.target.value);
    };

    const handleNumberChange = (event) => {
        setNumber(event.target.value);
    };

    const handleVariantSizeChange = (event) => {
        setVariantSize(event.target.value);
    };

    const handleSave = () => {
        // Handle the save functionality here, like making an API call
        console.log("Save Clicked");
        console.log({
            selectedOption,
            percentage,
            number,
            variantSize,
        });
    };

    const handleCancel = () => {
        // Handle the cancel functionality here
        console.log("Cancel Clicked");
    };

    return (
        <Layout>
            <div className="border-b border-gray-200 pb-2 mb-2">
          <h3
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              margin: "20px 0",
            }}
            className=" leading-6 text-gray-900"
          >
            Catalog Page
          </h3>
        </div>
            <Box sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
                <Typography variant="h5" gutterBottom>
                    Stock Status
                </Typography>
                <Typography variant="body1" gutterBottom>
                    This indicates when we should mark a product as out of stock from your catalog.
                </Typography>

                <FormControl component="fieldset">
                    <RadioGroup
                        value={selectedOption}
                        onChange={handleOptionChange}
                        aria-label="stock-status"
                        name="stock-status"
                    >
                        <FormControlLabel
                            value="allInStock"
                            control={<Radio />}
                            label="Tag all products in catalog as In-Stock"
                        />
                        <FormControlLabel
                            value="parentInStock"
                            control={<Radio />}
                            label="Tag as In-Stock, if the parent product availability is in-stock"
                        />
                        <FormControlLabel
                            value="oneVariantInStock"
                            control={<Radio />}
                            label="Tag as In-Stock, even if one variant of a product is in-stock"
                        />
                        <FormControlLabel
                            value="oneVariantOutOfStock"
                            control={<Radio />}
                            label="Tag as Out of Stock, even if one variant of a product goes out of stock"
                        />
                        <FormControlLabel
                            value="percentage"
                            control={<Radio />}
                            label="Tag as In-Stock, only when the total percentage of in-stock variants is greater than"
                        />
                        {selectedOption === "percentage" && (
                            <TextField
                                type="number"
                                value={percentage}
                                onChange={handlePercentageChange}
                                InputProps={{
                                    endAdornment: <span>%</span>,
                                }}
                                sx={{ marginLeft: 2, marginTop: 1, width: "100px" }}
                            />
                        )}
                        <FormControlLabel
                            value="number"
                            control={<Radio />}
                            label="Tag as In-Stock, only when the total number of in-stock variants is greater than"
                        />
                        {selectedOption === "number" && (
                            <TextField
                                type="number"
                                value={number}
                                onChange={handleNumberChange}
                                sx={{ marginLeft: 2, marginTop: 1, width: "100px" }}
                            />
                        )}
                        <FormControlLabel
                            value="variantSize"
                            control={<Radio />}
                            label="Tag as In-Stock if any of the following variant sizes is in-stock"
                        />
                        {selectedOption === "variantSize" && (
                            <TextField
                                value={variantSize}
                                onChange={handleVariantSizeChange}
                                placeholder="e.g., XL, XXL"
                                sx={{ marginLeft: 2, marginTop: 1, width: "200px" }}
                            />
                        )}
                    </RadioGroup>
                </FormControl>

                <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 3 }}>
                    <Button
                        variant="outlined"
                        onClick={handleCancel}
                        sx={{ marginRight: 2 }}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Box>
            </Box>
        </Layout>
    );
};

export default CatalogPage;
