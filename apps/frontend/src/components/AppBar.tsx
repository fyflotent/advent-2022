import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface AppBarProps {
  children: ReactNode
}

export const AppBar = ({ children }: AppBarProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <MuiAppBar component='nav'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      <Box component='main'>
        <Toolbar />
        {children}
      </Box>
    </Box >
  )
}