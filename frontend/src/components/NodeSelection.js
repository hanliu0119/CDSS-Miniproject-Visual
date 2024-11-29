import React, { useState } from 'react';
import { Button, Menu, MenuItem, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box, Typography, Select, FormControl, InputLabel } from '@mui/material';

function NodeSelection({ config, handleSelect, selectedDetails }) {
  const [createAnchor, setCreateAnchor] = useState(null);
  const [createType, setCreateType] = useState(null);
  const [newEntity, setNewEntity] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateOpen = (event) => {
    setCreateAnchor(event.currentTarget);
  };

  const handleCreateClose = () => {
    setCreateAnchor(null);
  };

  const handleCreateTypeSelect = (type) => {
    setCreateType(type);
    setDialogOpen(true);
    setCreateAnchor(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewEntity({});
  };

  const handleInputChange = (key, value) => {
    setNewEntity((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveNewEntity = () => {
    if (createType === 'modality') {
      config.data_modalities.push(newEntity);
    } else if (createType === 'treatment') {
      config.treatments.push(newEntity);
    } else if (createType === 'predictor') {
      config.predictors.push(newEntity);
    }
    handleDialogClose();
  };

  const renderDetails = (details) => {
    if (!details) return <Typography variant="body2">No selection</Typography>;

    return (
      <Box>
        {Object.entries(details).map(([key, value]) => (
          <Typography key={key} variant="body2" style={{ marginBottom: '4px' }}>
            <strong>{key}:</strong> {String(value)}
          </Typography>
        ))}
      </Box>
    );
  };

  const renderInputFields = () => {
    const keys =
      createType === 'modality'
        ? ['name', 'long_name', 'selected', 'provider_cost', 'time', 'payer_cost']
        : createType === 'treatment'
        ? ['name', 'long_name', 'selected', 'provider_cost', 'time', 'payer_cost', 'efficacy']
        : createType === 'predictor'
        ? ['name', 'modalities', 'sensitivity', 'specificity', 'description', 'response_targets']
        : [];

    return keys.map((key) => (
      <TextField
        key={key}
        label={key}
        fullWidth
        margin="dense"
        value={newEntity[key] || ''}
        onChange={(e) => handleInputChange(key, e.target.value)}
      />
    ));
  };

  return (
    <Box
      sx={{
        width: '30%',
        padding: '10px',
        borderRight: '1px solid #ccc',
        overflowY: 'auto',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Box sx={{ marginBottom: '10px' }}>
          <Typography variant="h6" sx={{ marginBottom: '8px' }}>
            Data Modalities
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel id="modality-label">Select Modality</InputLabel>
            <Select
              labelId="modality-label"
              onChange={(e) => handleSelect('modality', e.target.value)}
              defaultValue=""
            >
              {config.data_modalities.map((mod) => (
                <MenuItem key={mod.name} value={mod.name}>
                  {mod.long_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              marginTop: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              textAlign: 'left',
              lineHeight: '1.2em',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {renderDetails(selectedDetails.modality)}
          </Box>
        </Box>

        <Box sx={{ marginBottom: '10px' }}>
          <Typography variant="h6" sx={{ marginBottom: '8px' }}>
            Predictors
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel id="predictor-label">Select Predictor</InputLabel>
            <Select
              labelId="predictor-label"
              onChange={(e) => handleSelect('predictor', e.target.value)}
              defaultValue=""
            >
              {config.predictors.map((pred) => (
                <MenuItem key={pred.name} value={pred.name}>
                  {pred.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              marginTop: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              textAlign: 'left',
              lineHeight: '1.2em',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {renderDetails(selectedDetails.predictor)}
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ marginBottom: '8px' }}>
            Treatments
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel id="treatment-label">Select Treatment</InputLabel>
            <Select
              labelId="treatment-label"
              onChange={(e) => handleSelect('treatment', e.target.value)}
              defaultValue=""
            >
              {config.treatments.map((treat) => (
                <MenuItem key={treat.name} value={treat.name}>
                  {treat.long_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              marginTop: '10px',
              padding: '10px',
              border: '1px solid #ccc',
              textAlign: 'left',
              lineHeight: '1.2em',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {renderDetails(selectedDetails.treatment)}
          </Box>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        sx={{
          marginTop: '20px',
          alignSelf: 'center',
          width: '50%',
        }}
        onClick={handleCreateOpen}
      >
        Create New
      </Button>

      <Menu anchorEl={createAnchor} open={Boolean(createAnchor)} onClose={handleCreateClose}>
        <MenuItem onClick={() => handleCreateTypeSelect('modality')}>Modality</MenuItem>
        <MenuItem onClick={() => handleCreateTypeSelect('predictor')}>Predictor</MenuItem>
        <MenuItem onClick={() => handleCreateTypeSelect('treatment')}>Treatment</MenuItem>
      </Menu>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Create New {createType}</DialogTitle>
        <DialogContent>{renderInputFields()}</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleSaveNewEntity} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NodeSelection;
