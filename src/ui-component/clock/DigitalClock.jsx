import { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
    return `${formattedDate} - ${formattedTime}`;
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {/* <Paper elevation={1} style={{ padding: '6px', textAlign: 'center'}}> */}
        <Typography variant="subtitle1" component="h1">
          {formatTime(time)}
      </Typography>
      {/* </Paper> */}
    </Box>
  );
};

export default DigitalClock;
