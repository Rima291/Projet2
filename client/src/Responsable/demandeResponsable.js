import React, { useState } from 'react';
import { TextField, Button, Container } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardResponsable from './dashboardResponsable';

export function Demande() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dated, setDated] = useState('');
  const [datef, setDatef] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Invalid email';
    if (!dated) newErrors.dated = 'Start date is required';
    if (!datef) newErrors.datef = 'End date is required';
    if (datef < dated) newErrors.datef = 'End date must be after start date';
    if (!description) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      axios.post("http://localhost:5001/conge/createconge", { name, email, dated, datef, description })
        .then((result) => {
          console.log(result);
          alert('Creation successful!');
          navigate('/responsable');
        })
        .catch((err) => {
          console.error(err);
          alert('Error creating conge');
        });
    }
  };

  return (
    <>
      <DashboardResponsable />
      <Container maxWidth="sm">
        <div className="row">
          <div className="col-md-12 offset-md-1 form-container sign-up">
            <form onSubmit={handleSubmit}>
              <h1>Demande conge</h1>

              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                error={!!errors.name}
                helperText={errors.name}
              />

              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                label="Date de début de congé"
                variant="outlined"
                type="date"
                fullWidth
                margin="normal"
                value={dated}
                onChange={(e) => setDated(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                error={!!errors.dated}
                helperText={errors.dated}
              />

              <TextField
                label="Date de fin de congé"
                variant="outlined"
                type="date"
                fullWidth
                margin="normal"
                value={datef}
                onChange={(e) => setDatef(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                required
                error={!!errors.datef}
                helperText={errors.datef}
              />

              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                error={!!errors.description}
                helperText={errors.description}
              />

              <Button type="submit" variant="contained" color="primary" fullWidth>
                Demande Conge
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </>
  );
}
