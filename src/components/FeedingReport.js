import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { formatDateTime, getFeedingStats } from '../utils/alertUtils';

function FeedingReport({ babies }) {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setHours(0, 0, 0, 0)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const generateReport = () => {
    const report = babies.map(baby => {
      const feedingsInRange = getFeedingStats(
        baby.feedings,
        new Date(startDate),
        new Date(endDate).setHours(23, 59, 59, 999)
      );

      return {
        name: baby.name,
        totalFeedings: feedingsInRange.length,
        feedingDetails: feedingsInRange
      };
    });

    return report;
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h2" component="h2" gutterBottom>
        Feeding Report
      </Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>

      {generateReport().map((babyReport) => (
        <Box key={babyReport.name} sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            {babyReport.name} - Total Feedings: {babyReport.totalFeedings}
          </Typography>
          
          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {babyReport.feedingDetails.map((feeding) => (
                  <TableRow key={feeding.id}>
                    <TableCell>{formatDateTime(feeding.time)}</TableCell>
                    <TableCell>{feeding.type}</TableCell>
                    <TableCell>{feeding.amount}</TableCell>
                    <TableCell>{feeding.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Paper>
  );
}

export default FeedingReport;