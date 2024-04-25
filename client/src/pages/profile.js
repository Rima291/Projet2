import React from 'react';
import { Avatar, Typography, Button, Divider } from '@mui/material';
import Dashboard from '../Admin/dashboardAdmin';

const Profile = () => {
  return (
    <><Dashboard /><div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px', // You can adjust the padding as needed
    }}>
      <Avatar
        alt="John Doe"
        src="https://via.placeholder.com/150"
        style={{
          width: '96px', // Adjust the size of the avatar as needed
          height: '96px',
          marginBottom: '16px',
        }} />
      <Typography variant="h5" gutterBottom>
        John Doe
      </Typography>
      <Typography variant="body1" gutterBottom>
        Web Developer
      </Typography>
      <Divider style={{ margin: '16px 0' }} />
      <Typography variant="body1">
        Email: johndoe@example.com
      </Typography>
      <Typography variant="body1">
        Phone: +123456789
      </Typography>
      <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Edit Profile
      </Button>
    </div></>
  );
};

export default Profile;
