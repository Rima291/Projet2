import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Grid } from '@material-ui/core';
import DashboardResponsable from './dashboardResponsable';

export function Updateprojet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [nameequipe, setNameequipe] = useState('');
  const [nameclient, setNameclient] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchProjet = async () => {
      try {
        const result = await axios.get(`http://localhost:5001/projet/getProjet/${id}`);
        setName(result.data.name);
        setNameequipe(result.data.nameequipe);
        setNameclient(result.data.nameclient);
        setDate(result.data.date);
      } catch (error) {
        console.error('Erreur lors de la récupération du projet:', error.message);
        // Ici, vous pouvez ajouter un traitement d'erreur approprié, comme afficher un message à l'utilisateur.
      }
    };

    fetchProjet();
  }, [id]);

  const update = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5001/projet/updateprojet/${id}`, { name, nameequipe, nameclient, date });
      navigate('/projets');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du projet:', error.message);
      // Ici, vous pouvez ajouter un traitement d'erreur approprié, comme afficher un message à l'utilisateur.
    }
  };

  return (
    <><DashboardResponsable /><Container maxWidth="md" style={{ marginTop: '-30px' }}>
          <Grid container justify="center" alignItems="center" style={{ height: '100vh' }}>
              <Grid item xs={12} sm={8}>
                  <form onSubmit={update}>
                      <h1>Update Projet</h1>

                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label="Nom"
                          value={name}
                          onChange={(e) => setName(e.target.value)} />

                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label="nameequipe"
                          value={nameequipe}
                          onChange={(e) => setNameequipe(e.target.value)} />

                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth
                          label="Nom du client"
                          value={nameclient}
                          onChange={(e) => setNameclient(e.target.value)} />

                      <TextField
                          variant="outlined"
                          margin="normal"
                          fullWidth

                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)} />

                      <Button type="submit" variant="contained" color="primary">Update projet</Button>
                  </form>
              </Grid>
          </Grid>
      </Container></>
  );
}
