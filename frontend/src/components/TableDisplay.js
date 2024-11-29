import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';

function TableDisplay() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/result.json'); // Replace with your backend endpoint
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          console.error('Failed to fetch result.json');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Polling to refresh data every 5 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        height: '50%',
        padding: '10px',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        Results Table
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><strong>Data Modality</strong></TableCell>
              <TableCell><strong>Predictor</strong></TableCell>
              <TableCell><strong>Treatment</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.modality}</TableCell>
                <TableCell>{row.predictor}</TableCell>
                <TableCell>{row.treatment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default TableDisplay;
