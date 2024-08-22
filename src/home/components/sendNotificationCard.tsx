import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

interface IProps {
  setOpenNotifyUser: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  setOpenNotifyAll: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

export default function NotificationCard(props: IProps) {
  const handleClickOpenNotifyAll = () => {
    props.setOpenNotifyAll(true);
  };

  const handleClickOpenNotifyUser = () => {
    props.setOpenNotifyUser(true);
  };

  return (
    <Box sx={{ minWidth: 160, margin: "20px", height: "150px" }}>
      <Card
        variant="outlined"
        sx={{
          height: "150px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <CardContent>
          <Typography variant="body1">Send a notification</Typography>
        </CardContent>

        <Box sx={{ display: "flex" }}>
          <CardActions>
            <Button size="small" onClick={handleClickOpenNotifyAll}>
              Notify all
            </Button>
          </CardActions>
          <CardActions>
            <Button size="small" sx={{fontFamily : "Arial"}} onClick={handleClickOpenNotifyUser}>
              Notify a user
            </Button>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
}
