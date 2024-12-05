import React, { useState, useEffect } from 'react';
import { Box, Typography, MenuItem, Select, FormControl } from '@mui/material';
// Import the JSON file
import nodeRelationships from '../node_relationships.json';

function NodeConnection() {
  const [predictors, setPredictors] = useState([]);
  const [selectedPredictor, setSelectedPredictor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating an async fetch from the JSON file
        const data = await Promise.resolve(nodeRelationships);
        setPredictors(data);
        setSelectedPredictor(data[0]); // Default to the first predictor
      } catch (error) {
        console.error('Error fetching node relationships:', error);
      }
    };

    fetchData();
  }, []);

  const handlePredictorChange = (event) => {
    const selected = predictors.find((p) => p.predictor === event.target.value);
    setSelectedPredictor(selected);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        overflowY: 'auto',
        padding: '20px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Heading and Dropdown in Same Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h6" sx={{ flex: 1, textAlign: 'left' }}>
          Nodes Connection Graph
        </Typography>
        <FormControl sx={{ minWidth: '200px' }}>
          <Select
            value={selectedPredictor?.predictor || ''}
            onChange={handlePredictorChange}
            displayEmpty
            sx={{
              height: '35px',
              backgroundColor: '#fff',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            {predictors.map((predictor) => (
              <MenuItem key={predictor.predictor} value={predictor.predictor}>
                {predictor.predictor}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedPredictor && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Row 1: Modalities */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            {selectedPredictor.modalities.map((modality, index) => (
              <Box
                key={`modality-${index}`}
                sx={{
                  width: '140px',
                  height: '50px',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '5px',
                  margin: '0 10px',
                  textAlign: 'center',
                  fontSize: '14px',
                }}
              >
                {modality}
              </Box>
            ))}
          </Box>

          {/* Arrow from Modalities to Predictor */}
          <Typography sx={{ fontSize: '28px', marginBottom: '10px' }}>↓</Typography>

          {/* Row 2: Predictor */}
          <Box
            sx={{
              width: '140px',
              height: '50px',
              backgroundColor: '#ff9800',
              color: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center',
              fontSize: '14px',
            }}
          >
            {selectedPredictor.predictor}
          </Box>

          {/* Arrow from Predictor to Treatments */}
          <Typography sx={{ fontSize: '28px', marginBottom: '10px' }}>↓</Typography>

          {/* Row 3: Treatments */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {selectedPredictor.treatments.map((treatment, index) => (
              <Box
                key={`treatment-${index}`}
                sx={{
                  width: '140px',
                  height: '50px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '5px',
                  textAlign: 'center',
                  fontSize: '14px',
                }}
              >
                {treatment}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default NodeConnection;
