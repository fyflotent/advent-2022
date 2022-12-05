import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface AppBarProps {
  children: ReactNode
}

export const AppBar = ({ children }: AppBarProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <MuiAppBar component='nav'>
        <Toolbar>
          <Typography>
            Advent 2022
          </Typography>
        </Toolbar>
      </MuiAppBar>
      <Box component='main' sx={{ width: '100%', height: '100%' }}>
        <Toolbar />
        {children}
      </Box>
    </Box >
  )
}