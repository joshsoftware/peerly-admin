import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import DiamondIcon from '@mui/icons-material/Diamond';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { useNavigate } from 'react-router-dom';
import { getRoute } from './slice';
import { useDispatch } from 'react-redux';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const iconList = [<DashboardIcon/>, <PostAddIcon/>, <LocalPoliceIcon/>, <DiamondIcon/>, <AssuredWorkloadIcon/>]
  const routeList = ['/', '/appreciations', '/badges', '/', '/config']
  const dispatch = useDispatch();
  const setRoute = (index: number) => () => {
    dispatch(getRoute(routeList[index]));
    navigate(routeList[index])
    toggleDrawer(false)
  }


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Dashboard', 'Appreciations', 'Badges', 'Corevalues', 'Config'].map((text, index) => (
          <ListItem key={text} disablePadding onClick={setRoute(index)}>
            <ListItemButton>
              <ListItemIcon>
                {iconList[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <Divider /> */}
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <ViewSidebarIcon/>
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
