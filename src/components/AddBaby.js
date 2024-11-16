import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography,
  Grid 
} from '@mui/material';

function AddBaby({ onAddBaby }) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !birthDate) return;

    onAddBaby({
      name: name.trim(),
      birthDate,
      createdAt: new Date().toISOString()
    });

    // Reset form
    setName('');
    setBirthDate('');
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Add New Baby
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Baby Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="date"
              label="Birth Date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={!name.trim() || !birthDate}
          >
            Add Baby
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default AddBaby;