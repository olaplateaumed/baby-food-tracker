import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import AddBaby from './components/AddBaby';
import BabyList from './components/BabyList';
import FeedingReport from './components/FeedingReport';
import { LocalStorageManager } from './utils/LocalStorageManager';
import { checkFeedingAlerts } from './utils/alertUtils';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

function App() {
  const [babies, setBabies] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedBabies = LocalStorageManager.getData('babies');
    if (storedBabies) {
      setBabies(storedBabies);
    }

    // Set up alert checking interval
    const alertInterval = setInterval(() => {
      const currentAlerts = checkFeedingAlerts(babies);
      setAlerts(currentAlerts);
      if (currentAlerts.length > 0) {
        setSnackbarMessage(currentAlerts[0]);
        setOpenSnackbar(true);
      }
    }, 60000); // Check every minute

    return () => clearInterval(alertInterval);
  }, [babies]);

  const handleAddBaby = (newBaby) => {
    const updatedBabies = [...babies, { ...newBaby, id: Date.now(), feedings: [] }];
    setBabies(updatedBabies);
    LocalStorageManager.saveData('babies', updatedBabies);
  };

  const handleAddFeeding = (babyId, feedingData) => {
    const updatedBabies = babies.map(baby => {
      if (baby.id === babyId) {
        return {
          ...baby,
          feedings: [...baby.feedings, { ...feedingData, id: Date.now() }]
        };
      }
      return baby;
    });
    setBabies(updatedBabies);
    LocalStorageManager.saveData('babies', updatedBabies);
  };

  const handleDeleteBaby = (babyId) => {
    const updatedBabies = babies.filter(baby => baby.id !== babyId);
    setBabies(updatedBabies);
    LocalStorageManager.saveData('babies', updatedBabies);
  };

  const handleClearDatabase = () => {
    LocalStorageManager.clearData();
    setBabies([]);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h1" component="h1" gutterBottom align="center">
          Baby Feeding Tracker
        </Typography>

        <AddBaby onAddBaby={handleAddBaby} />

        <Box sx={{ mt: 4 }}>
          <BabyList 
            babies={babies} 
            onAddFeeding={handleAddFeeding}
            onDeleteBaby={handleDeleteBaby}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <FeedingReport babies={babies} />
        </Box>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleClearDatabase}
            sx={{ mt: 2 }}
          >
            Clear Database
          </Button>
        </Box>

        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={6000} 
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default App;