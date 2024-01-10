import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ marginLeft: '250px', width: 'calc(100% - 290px)', height: '84px', background: 'rgba(255, 255, 255, 1)', alignContent: 'center', justifyContent: 'center', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: '600', fontSize: '24px', color: 'rgba(20, 21, 34, 1)' }}>
          Task
        </Typography>
        <Link to="/logout" style={{ textDecoration: 'none', color: '#fff', background: 'rgba(84, 111, 255, 1)', marginRight: '70px', width: '127px', height: '54px', borderRadius: '10px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <Button color="inherit">Logout</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
