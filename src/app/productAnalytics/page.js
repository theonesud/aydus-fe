'use client';
import React, { useEffect, useState } from 'react';
import AnalyticsTable from '@/components/Table';
import FilterComponent from '@/components/FilterComponent';
import Layout from '@/components/Layout';
import { parse } from 'papaparse';
import { saveAs } from 'file-saver';
import { Stack, Chip } from '@mui/material';

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

    const handleApplyConditions = (conditions) => {
        setAppliedConditions(conditions);
    };

    return (
        <div className="min-h-screen">
            <Layout>
                <h1 className="text-3xl font-semibold leading-16 text-gray-900 pb-10 pt-16">
                    Product Insights
                </h1>
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
            </Layout>
        </div>
    );
};

export default ProductAnalyticsPage;
