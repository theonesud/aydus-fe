// ProductAnalyticsPage.js
'use client';
import React, { useEffect, useState } from 'react';
import AnalyticsTable from '@/components/Table';
import FilterComponent from '@/components/FilterComponent';
import Layout from '@/components/Layout';
import { parse } from 'papaparse';
import { saveAs } from 'file-saver';

const ProductAnalyticsPage = () => {
    const [filterText, setFilterText] = useState('');
    const [productsData, setProductsData] = useState([]);

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

    return (
        <div className="min-h-screen">
            <Layout>
                {/* <div>
                    <h1
                        style={{
                            fontSize: '24px',
                            fontFamily: 'bold',
                            padding: 10,
                        }}
                    >
                        Product Insights
                    </h1>
                </div> */}

                <h1 className="text-3xl font-semibold leading-16 text-gray-900 pb-10 pt-16">
                    Product Insights
                </h1>
                <FilterComponent
                    onFilterChange={(event) =>
                        setFilterText(event.target.value)
                    }
                    onDownload={handleDownload}
                />
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
