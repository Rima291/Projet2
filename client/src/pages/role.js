import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../Admin/dashboardAdmin';
import { Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem } from '@mui/material';

export function Role() {
    const [usersWithoutRoles, setUsersWithoutRoles] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/users/allUsers')
          .then(response => {
            const usersWithUserRole = response.data.filter(user => user.role === 'user');
            setUsersWithoutRoles(usersWithUserRole);
          })
          .catch(err => console.log(err));
      }, []);

  const handleRoleChange = (userId, newRole) => {
    axios.put(`http://localhost:5001/users/updateRole/${userId}`, { role: newRole })
      .then(response => {
        console.log(response);
        setUsersWithoutRoles(prevUsers => prevUsers.filter(user => user._id !== userId));
      })
      .catch(err => console.error(err));
  };
  return (
    <>
      <Dashboard />
      <div className='role-container' style={{width: '800px', marginLeft:'400px'}}>
        <div className='role-table'>
          <h2>Utilisateurs sans role</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Adresse</TableCell>
                <TableCell>Téléphone</TableCell>
                <TableCell>Domaine</TableCell>
                <TableCell>Rôle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersWithoutRoles.map(user => (
                <TableRow key={user._id}>
                  <TableCell>
                    <img
                      src={user.picture}
                      style={{ width: 30, height: 30, objectFit: "cover", borderRadius: "50%" }}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.domaine}</TableCell>
                  <TableCell>
                    <Select
                      value={user.role || ""}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      style={{ minWidth: '100px' }}
                    >
                      <MenuItem value="" disabled>Choisir un rôle</MenuItem>
                      <MenuItem value="developpeur">developpeur</MenuItem>
                      <MenuItem value="responsable">responsable</MenuItem>
                      <MenuItem value="rh">rh</MenuItem>
                    </Select>
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
