import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, Container, Typography, Grid, IconButton, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import DashboardResponsable from './dashboardResponsable';

export default function Projets() {
  const [projets, setProjets] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5001/projet/allProjets")
      .then(response => {
        const startIndex = (page - 1) * 4;
        const endIndex = startIndex + 4;
        const slicedProjets = response.data.slice(startIndex, endIndex);
        setProjets(slicedProjets);
      })
      .catch(err => console.error(err));
  }, [page]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/projet/delete/${id}`)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => console.error(err));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearchOpen = () => {
    setSearchOpen(!searchOpen);
  };

  const filteredProjets = projets.filter(projet => {
    return (
      projet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projet.nameequipe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projet.nameclient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projet.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <><DashboardResponsable /><Container maxWidth="lg" style={{ marginTop: '10px'  , marginLeft:'290px'}}>
          <Grid container justify="center" alignItems="center">
              <IconButton onClick={handleSearchOpen} style={{ marginLeft: '700px' }}>
                  <SearchIcon />
              </IconButton>
              {searchOpen && (
                  <TextField
                      label="Recherche"
                      variant="outlined"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={{ width: '100px', height: '5px', marginBottom: '65px' }} />
              )}
              <Button component={Link} to='/createprojet' variant="contained" color="primary" startIcon={<AddIcon />} style={{ marginRight: '900px', marginBottom: '0px', width: '300px' }}>Ajouter un projet</Button>
              <TableContainer style={{ width: '100%', marginBottom: '20px', height: '360px' }}>
                  <Table style={{ width: '80%', marginBottom: '20px', marginLeft: '90px' }}>
                      <TableHead>
                          <TableRow>
                              <TableCell>#</TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell>Name équipe</TableCell>
                              <TableCell>Name client</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Action</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {filteredProjets.map((projet, index) => (
                              <TableRow key={projet._id}>
                                  <TableCell>{(page - 1) * 4 + index + 1}</TableCell>
                                  <TableCell>{projet.name}</TableCell>
                                  <TableCell>{projet.nameequipe}</TableCell>
                                  <TableCell>{projet.nameclient}</TableCell>
                                  <TableCell>{projet.date}</TableCell>
                                  <TableCell>
                                      <IconButton component={Link} to={`/updateprojet/${projet._id}`} color="primary">
                                          <EditIcon />
                                      </IconButton>
                                      <IconButton color="secondary" onClick={() => handleDelete(projet._id)}>
                                          <DeleteIcon />
                                      </IconButton>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer>
              <Grid container justify="center">
                  <Button onClick={handlePrevPage} disabled={page === 1} variant="outlined" style={{ marginRight: '20px' }}>Précédent</Button>
                  <Typography variant="body1">{` ${page}`}</Typography>
                  <Button onClick={handleNextPage} variant="outlined" style={{ marginLeft: '20px' }}>Suivant</Button>
              </Grid>
          </Grid>
          <br />

      </Container></>
  );
}