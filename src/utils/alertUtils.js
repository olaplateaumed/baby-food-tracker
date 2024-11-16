// Function to calculate time difference in hours between now and last feeding
const getHoursSinceLastFeeding = (feedings) => {
  if (!feedings || feedings.length === 0) return 24; // Return 24 if no feedings yet
  
  const lastFeeding = feedings[feedings.length - 1];
  const now = new Date();
  const lastFeedingTime = new Date(lastFeeding.time);
  const diffInHours = (now - lastFeedingTime) / (1000 * 60 * 60);
  
  return diffInHours;
};

// Function to check feeding alerts for all babies
export const checkFeedingAlerts = (babies) => {
  const alerts = [];
  const ALERT_THRESHOLD = 3; // Alert after 3 hours since last feeding

  babies.forEach(baby => {
    const hoursSinceLastFeeding = getHoursSinceLastFeeding(baby.feedings);
    
    if (hoursSinceLastFeeding >= ALERT_THRESHOLD) {
      alerts.push(`${baby.name} may need feeding! Last fed ${Math.floor(hoursSinceLastFeeding)} hours ago.`);
    }
  });

  return alerts;
};

// Function to format date for display
export const formatDateTime = (date) => {
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit'
  };
  return new Date(date).toLocaleDateString(undefined, options);
};

// Function to get feeding statistics for a given date range
export const getFeedingStats = (feedings, startDate, endDate) => {
  return feedings.filter(feeding => {
    const feedingDate = new Date(feeding.time);
    return feedingDate >= startDate && feedingDate <= endDate;
  });
};