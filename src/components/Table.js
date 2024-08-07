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
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'ActiveProductCount'}
                                    direction={orderBy === 'ActiveProductCount' ? order : 'asc'}
                                    onClick={() => handleRequestSort('ActiveProductCount')}
                                >
                                    Active Product Count
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'ActiveVariantCount'}
                                    direction={orderBy === 'ActiveVariantCount' ? order : 'asc'}
                                    onClick={() => handleRequestSort('ActiveVariantCount')}
                                >
                                    Active Variant Count
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'AddToCartRate'}
                                    direction={orderBy === 'AddToCartRate' ? order : 'asc'}
                                    onClick={() => handleRequestSort('AddToCartRate')}
                                >
                                    Add To Cart Rate (%)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'AddToCarts'}
                                    direction={orderBy === 'AddToCarts' ? order : 'asc'}
                                    onClick={() => handleRequestSort('AddToCarts')}
                                >
                                    Add To Carts
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'AverageSellingPrice'}
                                    direction={orderBy === 'AverageSellingPrice' ? order : 'asc'}
                                    onClick={() => handleRequestSort('AverageSellingPrice')}
                                >
                                    Average Selling Price
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'BlendedCRRCatalogAds'}
                                    direction={orderBy === 'BlendedCRRCatalogAds' ? order : 'asc'}
                                    onClick={() => handleRequestSort('BlendedCRRCatalogAds')}
                                >
                                    Blended CRR (Catalog Ads)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'BlendedCRREstSpends'}
                                    direction={orderBy === 'BlendedCRREstSpends' ? order : 'asc'}
                                    onClick={() => handleRequestSort('BlendedCRREstSpends')}
                                >
                                    Blended CRR (Est. Spends)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'BlendedROASCatalogAds'}
                                    direction={orderBy === 'BlendedROASCatalogAds' ? order : 'asc'}
                                    onClick={() => handleRequestSort('BlendedROASCatalogAds')}
                                >
                                    Blended ROAS (Catalog Ads)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'BlendedROASEstSpends'}
                                    direction={orderBy === 'BlendedROASEstSpends' ? order : 'asc'}
                                    onClick={() => handleRequestSort('BlendedROASEstSpends')}
                                >
                                    Blended ROAS (Est. Spends)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'CPSCatalogSpends'}
                                    direction={orderBy === 'CPSCatalogSpends' ? order : 'asc'}
                                    onClick={() => handleRequestSort('CPSCatalogSpends')}
                                >
                                    CPS Catalog Spends
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'CPSEstSpends'}
                                    direction={orderBy === 'CPSEstSpends' ? order : 'asc'}
                                    onClick={() => handleRequestSort('CPSEstSpends')}
                                >
                                    CPS Est. Spends
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'ConversionRate'}
                                    direction={orderBy === 'ConversionRate' ? order : 'asc'}
                                    onClick={() => handleRequestSort('ConversionRate')}
                                >
                                    Conversion Rate (%)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'DiscountedProductCount'}
                                    direction={orderBy === 'DiscountedProductCount' ? order : 'asc'}
                                    onClick={() => handleRequestSort('DiscountedProductCount')}
                                >
                                    Discounted Product Count
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'FbCPC'}
                                    direction={orderBy === 'FbCPC' ? order : 'asc'}
                                    onClick={() => handleRequestSort('FbCPC')}
                                >
                                    Fb CPC
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'FbCTR'}
                                    direction={orderBy === 'FbCTR' ? order : 'asc'}
                                    onClick={() => handleRequestSort('FbCTR')}
                                >
                                    Fb CTR
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'FbClicks'}
                                    direction={orderBy === 'FbClicks' ? order : 'asc'}
                                    onClick={() => handleRequestSort('FbClicks')}
                                >
                                    Fb Clicks
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'FbImpressions'}
                                    direction={orderBy === 'FbImpressions' ? order : 'asc'}
                                    onClick={() => handleRequestSort('FbImpressions')}
                                >
                                    Fb Impressions
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'GABlendedCRRCatalogSpends'}
                                    direction={orderBy === 'GABlendedCRRCatalogSpends' ? order : 'asc'}
                                    onClick={() => handleRequestSort('GABlendedCRRCatalogSpends')}
                                >
                                    GA Blended CRR (Catalog Spends)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'GABlendedCRREstSpends'}
                                    direction={orderBy === 'GABlendedCRREstSpends' ? order : 'asc'}
                                    onClick={() => handleRequestSort('GABlendedCRREstSpends')}
                                >
                                    GA Blended CRR (Est. Spends)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'GABlendedROASCatalogSpends'}
                                    direction={orderBy === 'GABlendedROASCatalogSpends' ? order : 'asc'}
                                    onClick={() => handleRequestSort('GABlendedROASCatalogSpends')}
                                >
                                    GA Blended ROAS (Catalog Spends)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'GABlendedROASEstSpends'}
                                    direction={orderBy === 'GABlendedROASEstSpends' ? order : 'asc'}
                                    onClick={() => handleRequestSort('GABlendedROASEstSpends')}
                                >
                                    GA Blended ROAS (Est. Spends)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'GACPSCatalogSpends'}
                                    direction={orderBy === 'GACPSCatalogSpends' ? order : 'asc'}
                                    onClick={() => handleRequestSort('GACPSCatalogSpends')}
                                >
                                    GA CPS (Catalog Spends)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'GACPSEstSpends'}
                                    direction={orderBy === 'GACPSEstSpends' ? order : 'asc'}
                                    onClick={() => handleRequestSort('GACPSEstSpends')}
                                >
                                    GA CPS (Est. Spends)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'GoogleCPC'}
                                    direction={orderBy === 'GoogleCPC' ? order : 'asc'}
                                    onClick={() => handleRequestSort('GoogleCPC')}
                                >
                                    Google CPC
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'GoogleCTR'}
                                    direction={orderBy === 'GoogleCTR' ? order : 'asc'}
                                    onClick={() => handleRequestSort('GoogleCTR')}
                                >
                                    Google CTR
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'GoogleClicks'}
                                    direction={orderBy === 'GoogleClicks' ? order : 'asc'}
                                    onClick={() => handleRequestSort('GoogleClicks')}
                                >
                                    Google Clicks
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'GoogleImpressions'}
                                    direction={orderBy === 'GoogleImpressions' ? order : 'asc'}
                                    onClick={() => handleRequestSort('GoogleImpressions')}
                                >
                                    Google Impressions
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'InStockProductCount'}
                                    direction={orderBy === 'InStockProductCount' ? order : 'asc'}
                                    onClick={() => handleRequestSort('InStockProductCount')}
                                >
                                    In Stock Product Count
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'InStockVariantCount'}
                                    direction={orderBy === 'InStockVariantCount' ? order : 'asc'}
                                    onClick={() => handleRequestSort('InStockVariantCount')}
                                >
                                    In Stock Variant Count
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'OutOfStockProductCount'}
                                    direction={orderBy === 'OutOfStockProductCount' ? order : 'asc'}
                                    onClick={() => handleRequestSort('OutOfStockProductCount')}
                                >
                                    Out of Stock Product Count
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'OutofstockVariantsCount'}
                                    direction={orderBy === 'OutofstockVariantsCount' ? order : 'asc'}
                                    onClick={() => handleRequestSort('OutofstockVariantsCount')}
                                >
                                    Out of Stock Variants Count
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'ProductPageViews'}
                                    direction={orderBy === 'ProductPageViews' ? order : 'asc'}
                                    onClick={() => handleRequestSort('ProductPageViews')}
                                >
                                    Product Page Views
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'Purchases'}
                                    direction={orderBy === 'Purchases' ? order : 'asc'}
                                    onClick={() => handleRequestSort('Purchases')}
                                >
                                    Purchases
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'PurchaseValue'}
                                    direction={orderBy === 'PurchaseValue' ? order : 'asc'}
                                    onClick={() => handleRequestSort('PurchaseValue')}
                                >
                                    Purchase Value
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'PurchasesPmaxAds'}
                                    direction={orderBy === 'PurchasesPmaxAds' ? order : 'asc'}
                                    onClick={() => handleRequestSort('PurchasesPmaxAds')}
                                >
                                    Purchases Pmax Ads
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'PurchasesValuePmaxAds'}
                                    direction={orderBy === 'PurchasesValuePmaxAds' ? order : 'asc'}
                                    onClick={() => handleRequestSort('PurchasesValuePmaxAds')}
                                >
                                    Purchases Value Pmax Ads
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'ROASPmaxAds'}
                                    direction={orderBy === 'ROASPmaxAds' ? order : 'asc'}
                                    onClick={() => handleRequestSort('ROASPmaxAds')}
                                >
                                    ROAS Pmax Ads
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'SpendsCatalogAds'}
                                    direction={orderBy === 'SpendsCatalogAds' ? order : 'asc'}
                                    onClick={() => handleRequestSort('SpendsCatalogAds')}
                                >
                                    Spends Catalog Ads
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'SpendsPMaxAds'}
                                    direction={orderBy === 'SpendsPMaxAds' ? order : 'asc'}
                                    onClick={() => handleRequestSort('SpendsPMaxAds')}
                                >
                                    Spends PMax Ads
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'TotalCatalogSpendsFBGoogle'}
                                    direction={orderBy === 'TotalCatalogSpendsFBGoogle' ? order : 'asc'}
                                    onClick={() => handleRequestSort('TotalCatalogSpendsFBGoogle')}
                                >
                                    Total Catalog Spends (FB + Google)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'TotalRevenue'}
                                    direction={orderBy === 'TotalRevenue' ? order : 'asc'}
                                    onClick={() => handleRequestSort('TotalRevenue')}
                                >
                                    Total Revenue
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'TotalSpendEstimated'}
                                    direction={orderBy === 'TotalSpendEstimated' ? order : 'asc'}
                                    onClick={() => handleRequestSort('TotalSpendEstimated')}
                                >
                                    Total Spend Estimated
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                <TableSortLabel
                                    active={orderBy === 'TransactionRate'}
                                    direction={orderBy === 'TransactionRate' ? order : 'asc'}
                                    onClick={() => handleRequestSort('TransactionRate')}
                                >
                                    Transaction Rate (%)
                                </TableSortLabel>
                            </TableCell>
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
                                            flexDirection="row"
                                            alignItems="center"
                                        >
                                            <div style={{display:'flex',flexDirection:'column'}}>
                                                <Typography variant="subtitle2">
                                                    {row.ProductName}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="textSecondary"
                                                >
                                                    SKU ID: {row.ProductSku}
                                                </Typography>
                                            </div>
                                            <Image
                                                src={row.ImageURL || placeholderImage}
                                                alt="Product Image"
                                                width={50}
                                                height={50}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.ActiveProductCount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.ActiveVariantCount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.AddToCartRate}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.AddToCarts}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.AverageSellingPrice}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.BlendedCRRCatalogAds}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.BlendedCRREstSpends}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.BlendedROASCatalogAds}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.BlendedROASEstSpends}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.CPSCatalogSpends}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.CPSEstSpends}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.ConversionRate}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.DiscountedProductCount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.FbCPC}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.FbCTR}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.FbClicks}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.FbImpressions}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.GABlendedCRRCatalogSpends}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.GABlendedCRREstSpends}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.GABlendedROASCatalogSpends}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.GABlendedROASEstSpends}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.GACPSCatalogSpends}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.GACPSEstSpends}
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
                                        {row.GoogleImpressions}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.InStockProductCount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.InStockVariantCount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.OutOfStockProductCount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.OutofstockVariantsCount}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.ProductPageViews}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.Purchases}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.PurchaseValue}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.PurchasesPmaxAds}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.PurchasesValuePmaxAds}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.ROASPmaxAds}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.SpendsCatalogAds}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.SpendsPMaxAds}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.TotalCatalogSpendsFBGoogle}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.TotalRevenue}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.TotalSpendEstimated}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.TransactionRate}
                                    </TableCell>
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
