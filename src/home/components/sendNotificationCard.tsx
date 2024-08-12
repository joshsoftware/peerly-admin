import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="body1">
        Send a notification
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Send Notification</Button>
    </CardActions>
  </React.Fragment>
);

export default function NotificationCard() {
  return (
    <Box sx={{ minWidth: 160 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
