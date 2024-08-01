import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./card.css";
import BadgeAvatars from "./badgeAvatars";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function AppreciationCard() {
  return (
    <Box sx={{ position: "relative", marginTop: 8  }}>
      
      <Box sx={{position: "absolute", left: "0px", bottom: "250px", zIndex: 1}}>
        <BadgeAvatars />
      </Box>

      <Card sx={{ width: "20%", position:"relative" }}>
        <CardContent
          sx={{ margin: "0px", padding: "0", "&:last-child": { pb: 0 } }}
        >
          <Box sx={{ mt:3, p: 2 }}>
            <Typography variant="h5" component="div">
              Mangesh Pawar
            </Typography>
            <Typography variant="body2">Technical Lead</Typography>
            <Typography sx={{ mt: 1.5 }} color="text.secondary">
              Appriciated by
            </Typography>
            <Typography variant="h6">Manas Joshi</Typography>
            <Typography sx={{ mb: 1.5, fontSize: 14 }} color="text.secondary">
              10 days ago
            </Typography>
          </Box>
          <Box sx={{ background: "#F5E6D6" }}>
            <Typography
              sx={{ fontSize: 14, pt: 1, width: "fit-content", margin: "auto" }}
              color="text.secondary"
            >
              Core Value
            </Typography>
            <Typography
              sx={{ pb: 1, width: "fit-content", margin: "auto" }}
              variant="subtitle1"
            >
              Technical Excellence
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
