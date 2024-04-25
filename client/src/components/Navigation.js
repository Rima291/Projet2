import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Container } from '@mui/material';
import { useLogoutUserMutation } from '../services/appApi';
import { useSelector } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';


const Navigation = () => {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(user);
    // Redirect to the home page
    window.location.replace('/');
  };

  return (
    <AppBar position="static" color="default">
      <Container>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
        
          </Typography>

          {user && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
              >
                <img src={user.picture} style={{ width: 30, height: 30 }} alt="Avatar de l'utilisateur" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link to='/profile'><MenuItem onClick={handleClose}>Mon Compte</MenuItem></Link>
                <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
