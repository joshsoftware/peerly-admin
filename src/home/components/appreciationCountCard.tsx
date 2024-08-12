import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface IProps{
  count : number | undefined
}

export default function AppreciationCountCard(props: IProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h1" gutterBottom>
            {props.count}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            Appreciation count for the quater
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
