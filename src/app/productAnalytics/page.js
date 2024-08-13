'use client';
import React, { useEffect, useState } from 'react';
import AnalyticsTable from '@/components/Table';
import FilterComponent from '@/components/FilterComponent';
import Layout from '@/components/Layout';
import { parse } from 'papaparse';
import { saveAs } from 'file-saver';
import { Stack, Chip } from '@mui/material';
import { productApi } from '@/utils/api'; // Ensure you import the API function

const ProductAnalyticsPage = () => {
    const [filterText, setFilterText] = useState('');
    const [productsData, setProductsData] = useState([]);
    const [appliedConditions, setAppliedConditions] = useState([]); // State to hold applied conditions

    // Fetch and parse CSV on mount
    useEffect(() => {
        fetch('/products.csv') // Ensure the CSV is in the correct directory
            .then((response) => response.text())
            .then((csvData) => {
                parse(csvData, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        const formattedData = results.data.map((row) => {
                            const formattedRow = {};
                            Object.keys(row).forEach((key) => {
                                const cleanKey = key
                                    .trim()
                                    .replace(/[().% ]+/g, '');
                                formattedRow[cleanKey] = row[key];
                            });
                            return formattedRow;
                        });
                        setProductsData(formattedData);
                    },
                });
            })
            .catch((err) => console.error('Failed to load CSV data:', err));
    }, []);

    const handleDownload = () => {
        const filteredData = productsData.filter(
            (product) =>
                product.ProductName.toLowerCase().includes(
                    filterText.toLowerCase()
                ) ||
                product.ProductSku.toLowerCase().includes(
                    filterText.toLowerCase()
                )
        );
        const csv = filteredData
            .map((row) => Object.values(row).join(','))
            .join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'filtered_data.csv');
    };

    const handleApplyConditions = async (conditions) => {
        setAppliedConditions(conditions);

        // Define your post data structure
        const postData = {
            metrics_filter: conditions, // assuming these are the conditions
            attribute_filter: conditions, // modify according to your needs
            from_date: '2022-01-01', // example date, update with actual
            to_date: '2022-12-31', // example date, update with actual
            sorting_column: 'price', // update with actual column
            sorting_order: 'asc' // update with actual order
        };

        try {
            // Call the API
            await productApi(
                postData,
                (response) => {
                    console.log('API Response:', response.data); // Log the response
                    // Optionally update productsData with the API response
                    setProductsData(response.data || []);
                },
                (error) => {
                    console.error('API Error:', error);
                }
            );
        } catch (error) {
            console.error('Failed to call API:', error);
        }
    };

    return (

        <Layout>
            <div className="min-h-screen">
                <div className="border-b border-gray-200 pb-2 mb-2">
                    <h3 style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        margin: '20px 0'
                    }} className=" leading-6 text-gray-900">Product Insights</h3>
                </div>
                
                <FilterComponent
                    onFilterChange={(event) =>
                        setFilterText(event.target.value)
                    }
                    onDownload={handleDownload}
                    onApplyConditions={handleApplyConditions} // pass the handler
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
                <AnalyticsTable
                    data={productsData.filter(
                        (product) =>
                            product.ProductName.toLowerCase().includes(
                                filterText.toLowerCase()
                            ) ||
                            product.ProductSku.toLowerCase().includes(
                                filterText.toLowerCase()
                            )
                    )}
                />
            </div>
        </Layout>

    );
};

export default ProductAnalyticsPage;
