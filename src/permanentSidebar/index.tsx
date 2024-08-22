import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import DiamondIcon from '@mui/icons-material/Diamond';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { useDispatch } from "react-redux";
import { getRoute } from "./slice";
import { useNavigate } from "react-router-dom";
import Header from "../header";

const drawerWidth = 200;

interface IProps {
    component: any
}

export default function PermanentDrawerLeft(props: IProps) {
  const iconList = [
    <DashboardIcon />,
    <PostAddIcon />,
    <LocalPoliceIcon />,
    <DiamondIcon />,
    <AssuredWorkloadIcon />,
  ];
  const routeList = ["/", "/appreciations", "/badges", "/core_values", "/config"];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const setRoute = (index: number) => () => {
    dispatch(getRoute(routeList[index]));
    navigate(routeList[index]);
  };
  return (
    <>
    <Header/>
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "48px",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {["Dashboard", "Appreciations", "Badges", "Corevalues", "Config"].map(
            (text, index) => (
              <ListItem key={text} disablePadding onClick={setRoute(index)}>
                <ListItemButton>
                  <ListItemIcon>{iconList[index]}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>

      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", marginTop: "50px"}}
      >
        {props.component}
      </Box>
    </Box>
    </>
  );
}
