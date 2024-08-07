import React, { useEffect, useState } from 'react';
import { parse } from 'papaparse';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Typography, TablePagination } from '@mui/material';

const useCSVData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/products.csv') // Ensure the CSV is in the correct directory
      .then(response => response.text())
      .then(csvData => {
        parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const formattedData = results.data.map(row => {
              const formattedRow = {};
              Object.keys(row).forEach(key => {
                // Remove extra spaces and special characters from keys
                const cleanKey = key.trim().replace(/[().% ]+/g, '');
                formattedRow[cleanKey] = row[key];
              });
              return formattedRow;
            });
            setData(formattedData);
          }
        });
      })
      .catch(err => console.error("Failed to load CSV data:", err));
  }, []);

  return data;
};

const AnalyticsTable = ({data}) => {
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
    <Paper sx={{ width: '100%', overflow: 'hidden' ,marginTop:2,boxShadow: '10px 10px 100px 0px rgba(16, 28, 45, 0.08)',borderRadius:4}}>
      <TableContainer sx={{ maxHeight: 600, overflowX: 'auto' }}>
        <Table stickyHeader aria-label="product analytics table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 200, position: 'sticky', left: 0, background: '#fff', zIndex: 10 }}>Product Details</TableCell>
              <TableCell align="right">Purchase Value</TableCell>
              <TableCell align="right">Catalog Spends</TableCell>
              <TableCell align="right">PMax Spends</TableCell>
              <TableCell align="right">Total Revenue</TableCell>
              <TableCell align="right">Blended ROAS (Catalog Ads)</TableCell>
              <TableCell align="right">Blended ROAS (Est. Spends)</TableCell>
              <TableCell align="right">Add To Cart Rate (%)</TableCell>
              <TableCell align="right">Conversion Rate (%)</TableCell>
              <TableCell align="right">Total Spend (Estimated)</TableCell>
              <TableCell align="right">Transaction Rate (%)</TableCell>
              <TableCell align="right">Google CPC</TableCell>
              <TableCell align="right">Google CTR</TableCell>
              <TableCell align="right">Google Clicks</TableCell>
              <TableCell align="right">Fb Impressions</TableCell>
              <TableCell align="right">Fb CPC</TableCell>
              <TableCell align="right">Fb Clicks</TableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row" sx={{ minWidth: 200, position: 'sticky', left: 0, background: '#fff', zIndex: 1 }}>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="subtitle2">{row.ProductName}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      SKU ID: {row.ProductSku}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">{row.PurchaseValue}</TableCell>
                <TableCell align="right">{row.SpendsCatalogAds}</TableCell>
                <TableCell align="right">{row.SpendsPMaxAds}</TableCell>
                <TableCell align="right">{row.TotalRevenue}</TableCell>
                <TableCell align="right">{row.BlendedROASCatalogAds}</TableCell>
                <TableCell align="right">{row.BlendedROASEstSpends}</TableCell>
                <TableCell align="right">{row.AddToCartRate}</TableCell>
                <TableCell align="right">{row.ConversionRate}</TableCell>
                <TableCell align="right">{row.TotalSpendEstimated}</TableCell>
                <TableCell align="right">{row.TransactionRate}</TableCell>
                <TableCell align="right">{row.GoogleCPC}</TableCell>
                <TableCell align="right">{row.GoogleCTR}</TableCell>
                <TableCell align="right">{row.GoogleClicks}</TableCell>
                <TableCell align="right">{row.FbImpressions}</TableCell>
                <TableCell align="right">{row.FbCPC}</TableCell>
                <TableCell align="right">{row.FbClicks}</TableCell>
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
