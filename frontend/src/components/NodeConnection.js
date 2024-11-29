import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function NodeConnection({ selectedDetails }) {
  const handleRun = async () => {
    const newRecord = {
        modality: selectedDetails.modality?.long_name || "None",
        predictor: selectedDetails.predictor?.name || "None",
        treatment: selectedDetails.treatment?.long_name || "None",
    };

    try {
        const response = await fetch('http://localhost:5001/save-result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecord),
        });

        if (response.ok) {
            console.log('Record saved successfully.');
        } else {
            console.error('Failed to save record.');
        }
    } catch (error) {
        console.error('Error connecting to the server:', error);
    }
  };


  return (
    <Box
      sx={{
        height: '50%',
        borderBottom: '1px solid #ccc',
        padding: '10px',
        position: 'relative',
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: '10px' }}>
        Nodes Connection Graph
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100% - 50px)', // Account for button height
        }}
      >
        {/* Node 1: Data Modality */}
        <Box
          sx={{
            width: '120px',
            height: '50px',
            backgroundColor: '#1976d2',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            marginRight: '20px',
            textAlign: 'center',
          }}
        >
          {selectedDetails.modality?.long_name || "Data Modality"}
        </Box>

        {/* Connector 1 */}
        <Typography
          sx={{
            marginRight: '20px',
            fontSize: '24px',
          }}
        >
          →
        </Typography>

        {/* Node 2: Predictor */}
        <Box
          sx={{
            width: '120px',
            height: '50px',
            backgroundColor: '#ff9800',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            marginRight: '20px',
            textAlign: 'center',
          }}
        >
          {selectedDetails.predictor?.name || "Predictor"}
        </Box>

        {/* Connector 2 */}
        <Typography
          sx={{
            marginRight: '20px',
            fontSize: '24px',
          }}
        >
          →
        </Typography>

        {/* Node 3: Treatment */}
        <Box
          sx={{
            width: '120px',
            height: '50px',
            backgroundColor: '#4caf50',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          {selectedDetails.treatment?.long_name || "Treatment"}
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)', // Center the button horizontally
          width: '150px', // Adjust the width as needed
        }}
        onClick={handleRun}
      >
        Run
      </Button>
    </Box>
  );
}

export default NodeConnection;
