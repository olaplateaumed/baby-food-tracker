import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDateTime } from '../utils/alertUtils';

function BabyList({ babies, onAddFeeding, onDeleteBaby }) {
  const [selectedBaby, setSelectedBaby] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [feedingAmount, setFeedingAmount] = useState('');
  const [feedingType, setFeedingType] = useState('breast');
  const [feedingNotes, setFeedingNotes] = useState('');

  const handleOpenDialog = (baby) => {
    setSelectedBaby(baby);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBaby(null);
    setFeedingAmount('');
    setFeedingType('breast');
    setFeedingNotes('');
  };

  const handleAddFeeding = () => {
    if (selectedBaby) {
      onAddFeeding(selectedBaby.id, {
        time: new Date().toISOString(),
        amount: feedingAmount,
        type: feedingType,
        notes: feedingNotes
      });
      handleCloseDialog();
    }
  };

  const getLastFeedingTime = (baby) => {
    if (!baby.feedings || baby.feedings.length === 0) {
      return 'No feedings recorded';
    }
    const lastFeeding = baby.feedings[baby.feedings.length - 1];
    return formatDateTime(lastFeeding.time);
  };

  return (
    <Box>
      <Typography variant="h2" component="h2" gutterBottom>
        Babies
      </Typography>
      <Grid container spacing={3}>
        {babies.map((baby) => (
          <Grid item xs={12} sm={6} md={4} key={baby.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" component="h3">
                    {baby.name}
                  </Typography>
                  <IconButton 
                    onClick={() => onDeleteBaby(baby.id)}
                    color="error"
                    aria-label="delete baby"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography color="text.secondary" gutterBottom>
                  Birth Date: {formatDateTime(baby.birthDate)}
                </Typography>
                <Typography variant="body2">
                  Last Feeding: {getLastFeedingTime(baby)}
                </Typography>
                <Typography variant="body2">
                  Total Feedings: {baby.feedings?.length || 0}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  color="primary"
                  onClick={() => handleOpenDialog(baby)}
                >
                  Add Feeding
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Feeding for {selectedBaby?.name}</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Feeding Type"
            value={feedingType}
            onChange={(e) => setFeedingType(e.target.value)}
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="breast">Breast Feeding</option>
            <option value="bottle">Bottle Feeding</option>
            <option value="formula">Formula</option>
          </TextField>
          <TextField
            fullWidth
            label="Amount (ml/oz)"
            type="number"
            value={feedingAmount}
            onChange={(e) => setFeedingAmount(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Notes"
            multiline
            rows={4}
            value={feedingNotes}
            onChange={(e) => setFeedingNotes(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddFeeding} variant="contained" color="primary">
            Add Feeding
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BabyList;