import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface IProps {
  setOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export default function DynamicEngagersReportCard(props: IProps) {
  const handleClick = () => {
    props.setOpen(true);
  };

  return (
    <Box sx={{ minWidth: 160, margin: '10px', height: '150px' }}>
      <Card
        sx={{
          height: '150px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <CardContent>
          <Typography variant="body1">Dynamic Engagers Report</Typography>
        </CardContent>
        <Box sx={{ display: 'flex' }}>
          <CardActions>
            <Button size="small" onClick={handleClick}>
              Download Report
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
}
