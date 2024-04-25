import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DashboardRh from './dashboardRh';
export default function ListesConges() {
  const [congesWithAcceptation, setCongesWithAcceptation] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/conge/allConges')
      .then(conges => {
        const congesWithAcceptation = conges.data.filter(conge => conge.acceptation);

        setCongesWithAcceptation(congesWithAcceptation);
      })
      .catch(err => console.log(err));
  }, []);



  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/conge/delete/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
     
  <DashboardRh />
      <div style={{ marginTop: '40px', marginBottom: '40px' , width:'900px' , marginLeft:'400px'}}>
        <Typography variant="h4" align="center" gutterBottom>Listes des conges</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Date de debut</TableCell>
                <TableCell>Date de fin</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Acceptation</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {congesWithAcceptation.map(conge => (
                <TableRow key={conge._id}>
                  <TableCell>{conge.name}</TableCell>
                  <TableCell>{conge.email}</TableCell>
                  <TableCell>{conge.dated}</TableCell>
                  <TableCell>{conge.datef}</TableCell>
                  <TableCell>{conge.description}</TableCell>
                  <TableCell>{conge.acceptation}</TableCell>
                  <TableCell>
                    <IconButton variant="contained" color="secondary" onClick={() => handleDelete(conge._id)}><DeleteIcon/></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

