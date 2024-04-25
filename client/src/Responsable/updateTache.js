import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import DashboardResponsable from './dashboardResponsable';

export function UpdateTache() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [namedeveloppeur, setNamedeveloppeur] = useState('');
  const [date, setDate] = useState('');
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5001/tache/getTache/${id}`)
      .then(result => {
        setName(result.data.name);
        setDescription(result.data.description);
        setNamedeveloppeur(result.data.namedeveloppeur);
        setDate(result.data.date);
      })
      .catch(err => console.log(err));

      axios.get("http://localhost:5001/users/allUsers")
      .then(response => {
        setDevelopers(response.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5001/tache/update/${id}`, { name, description, namedeveloppeur, date })
      .then(result => {
        console.log(result);
        navigate('/listeTache');
      })
      .catch(err => console.log(err));
  };

  return (
    <><DashboardResponsable /><Container maxWidth="md" style={{ marginTop: '50px' }}>
          <Grid container justify="center">
              <Grid item xs={12} sm={8}>
                  <form onSubmit={update}>
                      <h1>Modifier tache</h1>

                      <TextField
                          label="Name"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={name}
                          onChange={(e) => setName(e.target.value)} />

                      <TextField
                          label="Description"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} />

                      <FormControl variant="outlined" fullWidth margin="normal">
                          <InputLabel>Namedeveloppeur</InputLabel>
                          <Select
                              value={namedeveloppeur}
                              onChange={(e) => setNamedeveloppeur(e.target.value)}
                              label="Namedeveloppeur"
                          >
                              <MenuItem value="">Select Developer</MenuItem>
                              {developers.map(developer => (
                                  <MenuItem key={developer._id} value={developer.name}>

                                      <img
                                          src={developer.picture}
                                          style={{ width: 30, height: 30, objectFit: 'cover', borderRadius: '50%' }}
                                          alt="" />
                                      {developer.name}</MenuItem>
                              ))}
                          </Select>
                      </FormControl>

                      <TextField

                          variant="outlined"
                          type="date"
                          fullWidth
                          margin="normal"
                          value={date}
                          onChange={(e) => setDate(e.target.value)} />

                      <Button type="submit" variant="contained" color="primary">Modifier</Button>
                  </form>
              </Grid>
          </Grid>
      </Container></>
  );
}
