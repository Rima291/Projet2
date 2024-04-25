import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../services/appApi";
import { AppContext } from "../context/appContext";

 function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, {  error }] = useLoginUserMutation();

  
    function handleLogin(e) {
        e.preventDefault();
      
        if (!email || !password) {
          alert("Please fill in all fields."); // Alerte si les champs sont vides
          return;
        }
      
        // Logique de connexion
        loginUser({ email, password })
          .then((response) => {
            if (response && response.data) { // Assurez-vous que la réponse et les données existent
              const { user } = response.data; // Obtenir l'utilisateur de la réponse
      
              if (!user.role || user.role === 'user') {
                alert("Votre compte n'est pas encore approuvé.");
                navigate('/'); // Rediriger vers la page de connexion ou autre
                return; // Fin de la fonction après redirection
              }
      
              // Socket work
              socket.emit("new-user"); // Émission d'un événement socket
      
              // Redirection basée sur le rôle
              switch (user.role) {
                case 'admin':
                  navigate('/dashboardAdmin');
                  break;
                case 'responsable':
                  navigate('/responsable');
                  break;
                case 'devloppeur':
                  navigate('/developpement');
                  break;
                case 'rh':
                  navigate('/rh');
                  break;
                default:
                  console.log("Rôle non reconnu:", user.role);
                  alert("Rôle inconnu. Veuillez contacter l'administrateur.");
                  setEmail('')
                  setPassword('')
                  navigate('/');
              }
            } else {
              console.error("Erreur lors de la connexion:", response);
              alert("Erreur lors de la connexion. Veuillez réessayer.");
            }
          })
          .catch((error) => {
            console.error("Erreur de connexion:", error);
            alert("Erreur de connexion. Veuillez réessayer.");
          });
      }
      

    return (
        <div>
            <div className="auth-page" >
                <div className="container-fluid p-0" >
                    <div className="row g-0">
                        <div className="col-xxl-3 col-lg-4 col-md-5" >
                            <div className="auth-full-page-content d-flex p-sm-5 p-4" >
                                <div className="w-100" >
                                    <div className="d-flex flex-column h-100">
                                        <div className="mb-4 mb-md-5 text-center">
                                            <Link to="/" className="d-block auth-logo">
                                                <img src="assets/images/logo-sm.svg" alt="" height="28" /> <span className="logo-txt">Unity WorkSpace</span>
                                            </Link>
                                        </div>
                                        <div className="auth-content my-auto">
                                            <div className="text-center">
                                                <h5 className="mb-0">Bienvenue de retour !</h5>
                                                <p className="text-muted mt-2">Connectez-vous pour continuer sur Unity WorkSpace.</p>
                                            </div>
                                            <form className="mt-4 pt-2" onSubmit={handleLogin}>
                                                {error && <p className="alert alert-danger">{error.data}</p>}
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input className="form-control" type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                                                </div>
                                                <div className="mb-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-grow-1">
                                                            <label className="form-label">Mot de passe</label>
                                                            
                                                        </div>
                                                        <div className="flex-shrink-0">
                                                            <div>
                                                                <Link  to="/forgot" className="text-muted">Mot de passe oublié?</Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="input-group auth-pass-inputgroup">
                                                        <input type="password" className="form-control" placeholder="Enter password" aria-label="Password" aria-describedby="password-addon" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                                                        <button className="btn btn-light shadow-none ms-0" type="button" id="password-addon"><i className="mdi mdi-eye-outline"></i></button>
                                                    </div>
                                                </div>
                                            
                                                <div className="mb-3">
                                                    <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">Se Connecter</button>
                                                </div>
                                            </form>


                                            <div className="mt-5 text-center">
                                                <p className="text-muted mb-0"> Voulez-vous inscrire à Unity WorkSpace ? <Link to="/signup"
                                                    className="text-primary fw-semibold"> Inscrire </Link> </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* end auth full page content */}
                        </div>
                        {/* end col */}
                        <div className="col-xxl-9 col-lg-8 col-md-7">
                            <div className="auth-bg  p-4 d-flex" style={{width: '900px', height:'695px', marginLeft:'252px'}}>
                                <div className="bg-overlay bg-primary bg-opacity-25" style={{width: '900px', height:'695px', marginLeft: '252px'}}></div>
                                <ul className="bg-bubbles">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                                {/* end bubble effect */}
                                <div className="row justify-content-center align-items-center">
                                    <div className="col-xl-7">
                                        <div className="p-0 p-sm-4 px-xl-0">
                                            <div id="reviewcarouselIndicators" className="carousel slide">
                                                <div className="carousel-indicators carousel-indicators-rounded justify-content-start ms-0 mb-0">
                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                </div>
                                                {/* end carouselIndicators */}
                                                <div className="carousel-inner">
                                                    <div className="carousel-item active">
                                                        <div className="testi-contain text-white">


                                                        </div>
                                                    </div>

                                                    <div className="carousel-item">
                                                        <div className="testi-contain text-white">
                                                            <i className="bx bxs-quote-alt-left text-success display-6"></i>

                                                            <h4 className="mt-4 fw-medium lh-base text-white">“Our task must be to
                                                                free ourselves by widening our circle of compassion to embrace
                                                                all living
                                                                creatures and
                                                                the whole of quis consectetur nunc sit amet semper justo. nature
                                                                and its beauty.”</h4>
                                                            <div className="mt-4 pt-3 pb-5">
                                                                <div className="d-flex align-items-start">
                                                                    <div className="flex-shrink-0">
                                                                        <img src="assets/images/users/avatar-2.jpg" className="avatar-md img-fluid rounded-circle" alt="..." />
                                                                    </div>
                                                                    <div className="flex-grow-1 ms-3 mb-4">
                                                                        <h5 className="font-size-18 text-white">Rosanna French
                                                                        </h5>
                                                                        <p className="mb-0 text-white-50">Web Developer</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="carousel-item">
                                                        <div className="testi-contain text-white">
                                                            <i className="bx bxs-quote-alt-left text-success display-6"></i>

                                                            <h4 className="mt-4 fw-medium lh-base text-white">“I've learned that
                                                                people will forget what you said, people will forget what you
                                                                did,
                                                                but people will never forget
                                                                how donec in efficitur lectus, nec lobortis metus you made them
                                                                feel.”</h4>
                                                            <div className="mt-4 pt-3 pb-5">
                                                                <div className="d-flex align-items-start">
                                                                    <img src="assets/images/users/avatar-3.jpg"
                                                                        className="avatar-md img-fluid rounded-circle" alt="..." />
                                                                    <div className="flex-1 ms-3 mb-4">
                                                                        <h5 className="font-size-18 text-white">Ilse R. Eaton</h5>
                                                                        <p className="mb-0 text-white-50">Manager
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* end carousel-inner */}
                                            </div>
                                            {/* end review carousel */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* end container fluid */}
            </div>
        </div>
    );
}
export default Login;