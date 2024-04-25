import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Assuming you are using react-router-dom
import axios from 'axios';

export function ResetPass() {
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const {id, token} = useParams()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5001/users/reset-password/${id}/${token}`, { password });
      if (res.data.Status === "Success") {
        alert('Password changed');
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      // Gestion des erreurs ici, par exemple afficher un message d'erreur à l'utilisateur.
    }
  };
  return (
    <div className="container" id="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <br />
            <span>Enter your new Password</span>
  
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Reset
              </button>
            </div>
          </form>
        </div>
  
       
      </div>
    </div>
  </div>
  
  );
}
