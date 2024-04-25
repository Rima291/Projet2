import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem ,Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DashboardResponsable from './dashboardResponsable';
export function CreateTache() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [namedeveloppeur, setNamedeveloppeur] = useState('');
  const [date, setDate] = useState('');
  const [developers, setDevelopers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5001/users/allUsers")
      .then(response => {
        setDevelopers(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5001/tache/create", { name, description, namedeveloppeur, date })
      .then(result => {
        console.log(result);
        alert('Creation successful!');
        navigate('/listeTache');
      })
      .catch(err => console.log(err));
  }

  return (
    <><DashboardResponsable /><Container maxWidth="md" style={{ marginTop: '40px' }}>
      <Grid container justify="center">
        <Grid item xs={12} sm={8}>
          <form onSubmit={handleSubmit}>
            <h1>Create New Tache</h1>

            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required />

            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required />

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Name developpeur</InputLabel>
              <Select
                value={namedeveloppeur}
                onChange={(e) => setNamedeveloppeur(e.target.value)}
                label="Name developpeur"
                required
              >
                <MenuItem value="">Select Developer</MenuItem>
                {developers.map(developer => (
                  <MenuItem key={developer._id} value={developer.name}>

                    <img
                      src={developer.picture}
                      style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '50%' }}
                      alt="" />
                    {developer.name}


                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField

              variant="outlined"
              type="date"
              fullWidth
              margin="normal"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required />

            <Typography variant="body2">
              <ArrowBackIcon /> {/* Ajout de l'icône */}
              <Link to={'/listeTache'} style={{ verticalAlign: 'middle', textDecoration: 'none', marginLeft: '1px', marginRight: '10px' }}>retourne a la liste</Link>
              {/* Ajout de la marge à droite pour créer un espace */}
              <Button type="submit" variant="contained" color="primary">Create</Button>
            </Typography>
          </form>
        </Grid>
      </Grid>
    </Container></>
  );
}
