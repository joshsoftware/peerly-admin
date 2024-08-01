import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";


const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 50,
  height: 50,
  border: `2px solid ${theme.palette.background.paper}`,
  left:"25px",
  bottom:"15px"
}));

export default function BadgeAvatars() {
  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      badgeContent={
        <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      }
    >
      <Avatar
        sx={{ width: "70px", height: "70px" }}
        alt="Travis Howard"
        src="/static/images/avatar/2.jpg"
      />
    </Badge>
  );
}
