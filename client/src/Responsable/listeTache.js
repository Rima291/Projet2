import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, IconButton, TextField, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import DashboardResponsable from './dashboardResponsable';
export default function Taches() {
  const [taches, setTaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);


  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/tache/allTaches')
      .then(response => {
        setTaches(response.data);
        const startIndex = (page - 1) * 4;
        const endIndex = startIndex + 4;
        const slicedTaches = response.data.slice(startIndex, endIndex);
        setTaches(slicedTaches);
      })
      .catch(err => console.error(err));
  }, [page]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/tache/delete/${id}`)
      .then(res => {
        console.log(res);
        // Refresh taches after deletion
        setTaches(taches.filter(tache => tache._id !== id));
      })
      .catch(err => console.error(err));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handleSearchOpen = () => {
    setSearchOpen(!searchOpen);
  };
  const filteredTaches = taches.filter(tache => {
    return (
      tache.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tache.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tache.namedeveloppeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tache.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  

  return (
    <><DashboardResponsable /><Container maxWidth="lg" style={{ marginTop: '10px', width: '20px'}}>
          <div className='w-80 vh-30 d-flex justify-content-center align-items-center' style={{marginLeft:'150px'}}>
              <div className='w-80 '>
                  <IconButton onClick={handleSearchOpen} style={{ marginLeft: '1000px' }}>
                      <SearchIcon />
                  </IconButton>
                  {searchOpen && (
                      <TextField
                          label="Recherche"
                          variant="outlined"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          style={{ width: '500px', height: '10px', marginBottom: '60px', marginLeft: '500px' }} />
                  )}
                  <Grid container justify="center" style={{ marginTop: '20px' }}>
                      <Button component={Link} to='/createTache' variant="contained" color="primary" startIcon={<AddIcon />} style={{ marginRight: '900px', width: '200px' }}>Add tache</Button>
                  </Grid>
                  <TableContainer style={{ height: '350px' }}>
                      <Table>
                          <TableHead>
                              <TableRow>
                                  <TableCell>#</TableCell>
                                  <TableCell>Name</TableCell>
                                  <TableCell>Description</TableCell>
                                  <TableCell>Namedeveloppeur</TableCell>
                                  <TableCell>Date</TableCell>
                                  <TableCell>Action</TableCell>
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {filteredTaches.map((tache, index) => (
                                  <TableRow key={tache._id}>
                                      <TableCell>{(page - 1) * 4 + index + 1}</TableCell>

                                      <TableCell>{tache.name}</TableCell>
                                      <TableCell>{tache.description}</TableCell>

                                      <TableCell>{tache.namedeveloppeur} </TableCell>
                                      <TableCell>{tache.date}</TableCell>
                                      <TableCell>
                                          <IconButton component={Link} to={`/updateTache/${tache._id}`} color="primary">
                                              <EditIcon />
                                          </IconButton>
                                          <IconButton onClick={() => handleDelete(tache._id)} color="secondary">
                                              <DeleteIcon />
                                          </IconButton>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>
                  </TableContainer>
                  <Grid container justify="center" style={{ marginTop: '20px' }}>
                      <Button onClick={handlePrevPage} disabled={page === 1} variant="outlined" style={{ marginRight: '20px' }}>Précédent</Button>
                      <Typography variant="body1">{` ${page}`}</Typography>
                      <Button onClick={handleNextPage} variant="outlined" style={{ marginLeft: '20px' }}>Suivant</Button>
                  </Grid>

              </div>
          </div>
      </Container></>
  );
}
