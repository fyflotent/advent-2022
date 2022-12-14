import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export const AppBar = () => (
  <MuiAppBar component="nav" position="sticky">
    <Toolbar>
      <Typography variant="h6">Advent 2022 ❄️</Typography>
    </Toolbar>
  </MuiAppBar>
);
