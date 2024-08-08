import React, { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    Typography,
    TablePagination,
    TableSortLabel,
} from '@mui/material';
import Image from 'next/image';
import placeholderImage from '../../assets/icon_cms1.jpg';

const useCSVData = () => {
    const [data, setData] = useState([]);

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
                                // Remove extra spaces and special characters from keys
                                const cleanKey = key
                                    .trim()
                                    .replace(/[().% ]+/g, '');
                                formattedRow[cleanKey] = row[key];
                            });
                            return formattedRow;
                        });
                        setData(formattedData);
                    },
                });
            })
            .catch((err) => console.error('Failed to load CSV data:', err));
    }, []);

    return data;
};

const AnalyticsTable = () => {
    const productsData = useCSVData();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedData = productsData.slice().sort((a, b) => {
        if (orderBy) {
            const valueA = parseFloat(a[orderBy]) || 0;
            const valueB = parseFloat(b[orderBy]) || 0;

            if (order === 'asc') {
                return valueA - valueB;
            }
            return valueB - valueA;
        }
        return 0;
    });

    const generateTableCell = (row, column) => {
        if (column.isImageCell) {
            return (
                <TableCell
                    key={column.key}
                    align="center"
                    component={column.component}
                    scope={column.scope}
                    sx={{
                        minWidth: column.minWidth,
                        position: 'sticky',
                        left: 0,
                        background: '#fff',
                        zIndex: 1,
                    }}
                >
                    <Box display="flex" flexDirection="row" alignItems="center">
                        <Image
                            src={row.ImageURL || placeholderImage}
                            alt="Product Image"
                            width={50}
                            height={50}
                            style={{ marginRight: '20px' }}
                        />
                        <div
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <Typography variant="subtitle2">
                                {row.ProductName}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                SKU ID: {row.ProductSku}
                            </Typography>
                        </div>
                    </Box>
                </TableCell>
            );
        }
        return (
            <TableCell key={column.key} align="center">
                {row[column.key]}
            </TableCell>
        );
    };

    const tableConfig = [
        {
            label: 'Product Details',
            key: 'ProductDetails',
            sticky: true,
            component: 'th',
            scope: 'row',
            minWidth: 200,
            isImageCell: true,
        },
        { label: 'Revenue (Shopify)', key: 'TotalRevenue' },
        {
            label: 'Spends (Catalog Ads - FB + Google)',
            key: 'TotalCatalogSpendsFBGoogle',
        },
        { label: 'Blended ROAS (Catalog Ads)', key: 'BlendedROASCatalogAds' },
        { label: 'Spends (Catalog Ads - FB)', key: 'SpendsCatalogAds' },
        { label: 'Spends (PMax Ads - Google)', key: 'SpendsPMaxAds' },
        { label: 'Product Page Views (GA)', key: 'ProductPageViews' },
        { label: 'Add To Carts (GA)', key: 'AddToCarts' },
        { label: 'Conversion Rate % (GA)', key: 'ConversionRate' },

        { label: 'Impressions (FB)', key: 'FbImpressions' },
        { label: 'Impressions (Google)', key: 'GoogleImpressions' },
        { label: 'CPC (Google)', key: 'GoogleCPC' },
        { label: 'CPC (FB)', key: 'FbCPC' },
        { label: 'CPS (Catalog Ads - FB)', key: 'CPSCatalogSpends' },
        { label: 'CPS (Catalog Ads - Google)', key: 'GACPSCatalogSpends' },
        { label: 'Total Spend (Est.)', key: 'TotalSpendEstimated' },
        { label: 'Transaction Rate %', key: 'TransactionRate' },
        { label: 'Add To Cart Rate %', key: 'AddToCartRate' },
        { label: 'Purchases', key: 'Purchases' },
        { label: 'Purchase Value', key: 'PurchaseValue' },
        { label: 'Purchases (Pmax Ads)', key: 'PurchasesPmaxAds' },
        { label: 'Purchases (Value Pmax Ads)', key: 'PurchasesValuePmaxAds' },
        { label: 'Blended CRR (Catalog Ads)', key: 'BlendedCRRCatalogAds' },
        { label: 'Blended CRR (Est. Spends)', key: 'BlendedCRREstSpends' },
        {
            label: 'Blended CRR (Catalog Spends - GA)',
            key: 'GABlendedCRRCatalogSpends',
        },
        {
            label: 'Blended CRR (Est. Spends - GA)',
            key: 'GABlendedCRREstSpends',
        },
        {
            label: 'Blended ROAS (Est. Spends - GA)',
            key: 'BlendedROASEstSpends',
        },
        {
            label: 'Blended ROAS (Catalog Spends - GA)',
            key: 'GABlendedROASCatalogSpends',
        },
        {
            label: 'Blended ROAS (Est. Spends - GA)',
            key: 'GABlendedROASEstSpends',
        },
        { label: 'ROAS (Pmax Ads)', key: 'ROASPmaxAds' },
        { label: 'CPS (Est. Spends)', key: 'CPSEstSpends' },
        { label: 'CPS (Est. Spends - GA)', key: 'GACPSEstSpends' },
        { label: 'CTR (FB)', key: 'FbCTR' },
        { label: 'CTR (Google)', key: 'GoogleCTR' },
        { label: 'Clicks (FB)', key: 'FbClicks' },
        { label: 'Clicks (Google)', key: 'GoogleClicks' },
        { label: 'Average Selling Price', key: 'AverageSellingPrice' },
        { label: 'Discounted Product Count', key: 'DiscountedProductCount' },
        { label: 'Active Product Count', key: 'ActiveProductCount' },
        { label: 'Active Variant Count', key: 'ActiveVariantCount' },
        { label: 'In Stock Product Count', key: 'InStockProductCount' },
        { label: 'In Stock Variant Count', key: 'InStockVariantCount' },
        {
            label: 'Out of Stock Variants Count',
            key: 'OutofstockVariantsCount',
        },
        { label: 'Out of Stock Product Count', key: 'OutOfStockProductCount' },
    ];

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'hidden',
                marginTop: 2,
                boxShadow: '10px 10px 100px 0px rgba(16, 28, 45, 0.08)',
                borderRadius: 4,
            }}
        >
            <TableContainer
                sx={{ maxHeight: 600, overflowX: 'auto', paddingX: 1 }}
            >
                <Table stickyHeader aria-label="product insights table">
                    <TableHead>
                        <TableRow>
                            <>
                                {tableConfig.map((column) => (
                                    <TableCell
                                        key={column.key}
                                        align="center"
                                        sx={{
                                            fontWeight: 'bold',
                                            ...(column.sticky && {
                                                minWidth: column.minWidth,
                                                position: 'sticky',
                                                left: 0,
                                                background: '#fff',
                                                zIndex: 10,
                                            }),
                                        }}
                                    >
                                        {column.key !== 'ProductDetails' ? (
                                            <TableSortLabel
                                                active={orderBy === column.key}
                                                direction={
                                                    orderBy === column.key
                                                        ? order
                                                        : 'asc'
                                                }
                                                onClick={() =>
                                                    handleRequestSort(
                                                        column.key
                                                    )
                                                }
                                            >
                                                {column.label}
                                            </TableSortLabel>
                                        ) : (
                                            column.label
                                        )}
                                    </TableCell>
                                ))}
                            </>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                                <TableRow key={index}>
                                    <>
                                        {tableConfig.map((column) =>
                                            generateTableCell(row, column)
                                        )}
                                    </>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={productsData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default AnalyticsTable;
