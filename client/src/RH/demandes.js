import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem, Typography, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DashboardRh from './dashboardRh';
export default function Conges() {
  const [congeWithoutAcceptations, setCongeWithoutAcceptations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/conge/allConges')
      .then(conges => {
        const congeWithoutAcceptations = conges.data.filter(conge => !conge.acceptation);

        setCongeWithoutAcceptations(congeWithoutAcceptations);
      })
      .catch(err => console.log(err));
  }, []);

  const handleRoleChange = (congeId, newAcceptation) => {
    axios.put(`http://localhost:5001/conge/updateAcceptation/${congeId}`, { acceptation: newAcceptation })
      .then(response => {
        console.log(response);

        // Update the local state with the modified user
        setCongeWithoutAcceptations(prevConge => prevConge.filter(conge => conge._id !== congeId));
      })
      .catch(err => console.error(err));
  };



  return (
    <div>
        <DashboardRh />
      <div style={{ marginTop: '40px', marginBottom: '40px' , width:'900px' , marginLeft:'400px'  }}>
        <Typography variant="h4" align="center" gutterBottom>Demandes des conges</Typography>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {congeWithoutAcceptations.map(conge => (
                <TableRow key={conge._id}>
                  <TableCell>{conge.name}</TableCell>
                  <TableCell>{conge.email}</TableCell>
                  <TableCell>{conge.dated}</TableCell>
                  <TableCell>{conge.datef}</TableCell>
                  <TableCell>{conge.description}</TableCell>
                  <TableCell>
                    <Select value={conge.acceptation} onChange={(e) => handleRoleChange(conge._id, e.target.value)}>
                      <MenuItem value="">Acceptation</MenuItem>
                      <MenuItem value="Oui">Oui</MenuItem>
                      
                    </Select>
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

