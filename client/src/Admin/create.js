import React, { useState } from 'react';
import { Container, Grid, TextField, Button, IconButton, Typography } from '@mui/material';
import { AddAPhoto as AddAPhotoIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '../services/appApi'; // Utilisez la bonne mutation ici
import userImg from '../assets/user.jpg';
import Dashboard from '../Admin/dashboardAdmin';

function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [domaine, setDomaine] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();
  const [signupUser] = useSignupUserMutation(); // Assurez-vous d'utiliser la bonne mutation

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1 MB");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'zgbktqql'); // Ajustez le preset selon votre configuration
    try {
      setUploadingImg(true);
      let res = await fetch('https://api.cloudinary.com/v1_1/duynzjvcb/image/upload', {
        method: 'post',
        body: data,
      });
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!image) {
      return alert("Please upload your profile picture");
    }
    const url = await uploadImage();
    signupUser({ name, email, phone, address, domaine, password, picture: url });
    navigate('/employee');
    alert("Creation successful!");
  }

  return (
    <><Dashboard /><Container style={{width:'600px' ,marginBottom:'20px'}}>
          <Typography variant="h4" align="center" gutterBottom>
              Créer un nouveau compte
          </Typography>
          <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                  <Grid item xs={12} align="center">
                      <img
                          src={imagePreview || userImg}
                          alt="Profile"
                          style={{ borderRadius: '50%', width: '70px', height: '70px' }} />
                      <input
                          type="file"
                          hidden
                          id="image-upload"
                          onChange={validateImg}
                          accept="image/png, image/jpeg" />
                      <label htmlFor="image-upload">
                          <IconButton component="span" >
                              <AddAPhotoIcon style={{marginRight:'10px'}}/>
                          </IconButton>
                      </label>
                  </Grid>

                  <Grid item xs={12}>
                      <TextField
                          label="Name"
                          fullWidth
                          required
                          onChange={(e) => setName(e.target.value)}
                          value={name} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          label="Email"
                          fullWidth
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="email" />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          label="Phone"
                          fullWidth
                          required
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                          type="number" />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          label="Address"
                          fullWidth
                          required
                          onChange={(e) => setAddress(e.target.value)}
                          value={address} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          label="Domaine"
                          fullWidth
                          required
                          onChange={(e) => setDomaine(e.target.value)}
                          value={domaine} />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                          label="Password"
                          fullWidth
                          required
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password} />
                  </Grid>
                  <Grid item xs={12} align="center">
                      <Button variant="contained" type="submit" color="primary">
                          {uploadingImg ? "Creating..." : "Create"}
                      </Button>
                  </Grid>
              </Grid>
          </form>
      </Container></>
  );
}

export default Create;
