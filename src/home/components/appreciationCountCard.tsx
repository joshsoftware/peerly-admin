import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface IProps {
  count: number | undefined;
}

export default function AppreciationCountCard(props: IProps) {
  return (
    <Card sx={{ width: "210px", margin: "10px", height: "150px" }}>
        <CardContent>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ width: "fit-content", margin: "auto" }}
          >
            {props.count}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{ textAlign: "center" }}
          >
            Appreciation count for the quater
          </Typography>
        </CardContent>
    </Card>
  );
}