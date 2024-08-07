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
} from '@mui/material';

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

const AnalyticsTable = ({ data }) => {
    const productsData = useCSVData();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                <Table stickyHeader aria-label="product analytics table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="center"
                                sx={{
                                    minWidth: 200,
                                    position: 'sticky',
                                    left: 0,
                                    background: '#fff',
                                    zIndex: 10,
                                    fontWeight: 'bold',
                                }}
                            >
                                Product Details
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Purchase Value
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Catalog Spends
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                PMax Spends
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Total Revenue
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Blended ROAS (Catalog Ads)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Blended ROAS (Est. Spends)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Add To Cart Rate (%)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Conversion Rate (%)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Total Spend (Estimated)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Transaction Rate (%)
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Google CPC
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Google CTR
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Google Clicks
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Fb Impressions
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Fb CPC
                            </TableCell>
                            <TableCell
                                align="center"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Fb Clicks
                            </TableCell>
                            {/* Add more table headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                        sx={{
                                            minWidth: 200,
                                            position: 'sticky',
                                            left: 0,
                                            background: '#fff',
                                            zIndex: 1,
                                        }}
                                    >
                                        <Box
                                            display="flex"
                                            flexDirection="column"
                                        >
                                            <Typography variant="subtitle2">
                                                {row.ProductName}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                color="textSecondary"
                                            >
                                                SKU ID: {row.ProductSku}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.PurchaseValue}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.SpendsCatalogAds}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.SpendsPMaxAds}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.TotalRevenue}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.BlendedROASCatalogAds}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.BlendedROASEstSpends}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.AddToCartRate}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.ConversionRate}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.TotalSpendEstimated}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.TransactionRate}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.GoogleCPC}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.GoogleCTR}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.GoogleClicks}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.FbImpressions}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.FbCPC}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.FbClicks}
                                    </TableCell>
                                    {/* Add more table cells as needed */}
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
