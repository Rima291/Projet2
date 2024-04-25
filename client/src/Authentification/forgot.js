import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      alert('Veuillez fournir une adresse e-mail Gmail.');
      return;
    }
    axios.post('http://localhost:5001/users/forgot-password', { email })
      .then(res => {
        if (res.data.Status) {
          alert('Check your email for reset password link');
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  return (
  
    <div className='w-100 vh-100 d-flex justify-content-center align-items-center'>
      <div className='w-50'>
        <form onSubmit={handleSubmit}>
          <h2>Forgot Password</h2>
          <br />
          <span>Enter your email</span>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              Send Email
            </button>
          </div>
        </form>
      </div>

    
    </div>


  );
};
