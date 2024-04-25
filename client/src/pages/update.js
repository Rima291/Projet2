import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button, Avatar, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import userImg from '../assets/user.jpg';
import Dashboard from '../Admin/dashboardAdmin';

export function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [domaine, setDomaine] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(userImg);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/users/getUser/${id}`)
      .then((response) => {
        const { name, email, address, phone, domaine, picture, role } = response.data;
        setName(name);
        setEmail(email);
        setAddress(address);
        setPhone(phone);
        setDomaine(domaine);
        setRole(role);

        if (picture) {
          setImage(picture);
          setImagePreview(picture);
        }
      })
      .catch((err) => console.error(err));
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5001/users/update/${id}`, { name, email, address, phone, domaine, role })
      .then((result) => {
        console.log(result);
        alert('Utilisateur Modifie');
        navigate('/employee'); // Rediriger après la mise à jour
      })
      .catch((err) => console.error(err));
  };

  return (
    <><Dashboard /><Container>
          <Typography variant="h4" align="center">Mettre à jour l'utilisateur</Typography>
          <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                  <form onSubmit={update}>
                      <Grid container spacing={3}>
                          <Grid item xs={12} style={{ textAlign: 'center' }}>
                              <Avatar
                                  src={imagePreview}
                                  sx={{ width: 100, height: 100 }}
                                  alt="Image de profil" />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  label="Nom"
                                  fullWidth
                                  variant="outlined"
                                  required
                                  onChange={(e) => setName(e.target.value)}
                                  value={name} />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  label="Email"
                                  fullWidth
                                  type="email"
                                  required
                                  variant="outlined"
                                  onChange={(e) => setEmail(e.target.value)}
                                  value={email} />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  label="Téléphone"
                                  fullWidth
                                  type="number"
                                  required
                                  variant="outlined"
                                  onChange={(e) => setPhone(e.target.value)}
                                  value={phone} />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  label="Adresse"
                                  fullWidth
                                  variant="outlined"
                                  required
                                  onChange={(e) => setAddress(e.target.value)}
                                  value={address} />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  label="Domaine"
                                  fullWidth
                                  variant="outlined"
                                  required
                                  onChange={(e) => setDomaine(e.target.value)}
                                  value={domaine} />
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  label="Rôle"
                                  fullWidth
                                  variant="outlined"
                                  required
                                  onChange={(e) => setRole(e.target.value)}
                                  value={role} />
                          </Grid>
                          <Grid item xs={12}>
                              <Button
                                  variant="contained"
                                  color="primary"
                                  type="submit"
                                  fullWidth
                              >
                                  Mettre à jour
                              </Button>
                          </Grid>
                      </Grid>
                  </form>
              </Grid>
              <Grid item xs={12} md={5} className="signup__bg"></Grid>
          </Grid>
      </Container></>
  );
}

export default Update;
