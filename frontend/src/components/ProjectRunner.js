import React, { useState } from 'react';
import NodeSelection from './NodeSelection';
import NodeConnection from './NodeConnection';
import TableDisplay from './TableDisplay';
import config from '../config.json'; // Adjust path as per location of config.json
import { Box } from '@mui/material';

const ProjectRunner = () => {
  const [selectedDetails, setSelectedDetails] = useState({
    modality: null,
    treatment: null,
    predictor: null,
  });

  const handleSelect = (type, value) => {
    let details = null;
    switch (type) {
      case 'modality':
        details = config.data_modalities.find((mod) => mod.name === value);
        break;
      case 'treatment':
        details = config.treatments.find((treat) => treat.name === value);
        break;
      case 'predictor':
        details = config.predictors.find((pred) => pred.name === value);
        break;
      default:
        break;
    }
    setSelectedDetails((prev) => ({ ...prev, [type]: details }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <NodeSelection config={config} handleSelect={handleSelect} selectedDetails={selectedDetails} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <NodeConnection selectedDetails={selectedDetails} />
        <TableDisplay />
      </Box>
    </div>
  );
};

export default ProjectRunner;
