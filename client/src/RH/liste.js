import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {  BiSearch, BiUserPlus } from 'react-icons/bi'; // Import des icônes
import DashboardRh from './dashboardRh';



function ListesRh() {
  const [usersWithRoles, setUsersWithRoles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5001/users/allUsers')
      .then((response) => {
        const filteredUsers = response.data.filter((user) => user.role !== 'user');
        setUsersWithRoles(filteredUsers);
      })
      .catch((error) => console.error(error));
  }, []);



  

 

  const filteredUsers = usersWithRoles.filter((user) =>
    (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.address && user.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.phone && user.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.domaine && user.domaine.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (user.role && user.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <DashboardRh />
      <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
        <div className="w-50" style={{ marginBottom: '300px' }}>
          <h2 style={{ marginBottom: '50px' }}>Listes des employees</h2>
          <div style={{ display: 'flex', alignItems: 'center', width: '1200px' }}>
          
            <TextField
              label="Rechercher"
              variant="outlined"
              size="small"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <BiSearch />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ width: '250px', marginLeft: '600px' }}
            />
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Numéro </TableCell>
                <TableCell>Domaine</TableCell>
                <TableCell>Rôle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <img
                      src={user.picture}
                      style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '50%' }}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.domaine}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
     
    </>
  );
}

export default ListesRh;
