import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DashboardResponsable from './dashboardResponsable';
export function Createproject() {
  const [name, setName] = useState('');
  const [nameequipe, setNameequipe] = useState('');
  const [nameclient, setNameclient] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/projet/createprojet", { name, nameequipe, nameclient, date })
      .then(result => {
        console.log(result);
        alert('Creation successful!');
        navigate('/listeProjet');
      })
      .catch(err => console.log(err));
  }

  return (
    <>
    <DashboardResponsable />
    <Container maxWidth="md">
          <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
              <Grid item xs={12} sm={8}>
                  <form onSubmit={handleSubmit}>
                      <Typography variant="h4" gutterBottom>Create New Projet</Typography>
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label="Titre Projet"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label=" Equipe"
                          value={nameequipe}
                          onChange={(e) => setNameequipe(e.target.value)}
                          required />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label="Name Client"
                          value={nameclient}
                          onChange={(e) => setNameclient(e.target.value)}
                          required />
                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth

                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required />

                      <Typography variant="body2">
                          <ArrowBackIcon /> {/* Ajout de l'icône */}
                          <Link to={'/projets'} style={{ verticalAlign: 'middle', textDecoration: 'none', marginLeft: '1px', marginRight: '10px' }}>reture a la liste</Link>
                          {/* Ajout de la marge à droite pour créer un espace */}
                          <Button type="submit" variant="contained" color="primary">Create</Button>
                      </Typography>
                  </form>
              </Grid>
          </Grid>
      </Container></>
  );
}