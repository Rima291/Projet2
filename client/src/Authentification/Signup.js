import React, { useState } from 'react';
import { useSignupUserMutation } from '../services/appApi';
import { Link } from 'react-router-dom';
import userImg from '../assets/user.jpg';
import './Signup.css'

export function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [domaine, setDomaine] = useState('');
  const [password, setPassword] = useState('');
  const [signupUser] = useSignupUserMutation();


  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb")
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'ilaj8umd');
    try {
      setUploadingImg(true);
      let res = await fetch('https://api.cloudinary.com/v1_1/duynzjvcb/image/upload', {
        method: 'post',
        body: data
      })
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture");
    const url = await uploadImage(image);
    console.log(url);
    // signup the user
    signupUser({ name, email, address ,phone,domaine ,password, picture: url }).then(({ data }) => {
        if (data) {
            console.log(data);
            alert( "Votre inscription a bien été enregistrée. Vous recevrez bientôt un e-mail de confirmation. Veuillez consulter votre boîte de réception pour activer votre compte.");
            setName('');
            setEmail('');
            setAddress('');
            setPhone('');
            setDomaine('');
            setImage(null);
            setPassword('');       
        }
    });
    
}

    return (
        <div>
            <div className="auth-page">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-xxl-3 col-lg-4 col-md-2">
                            <div className="auth-full-page-content d-flex p-sm-5 p-4">
                                <div className="w-100">
                                    <div className="d-flex flex-column h-100">
                                        <div className="mb-4 mb-md-1 text-center">
                                            <Link to="/" className="d-block auth-logo">
                                                 <span className="logo-txt">Créer un  compte</span>
                                            </Link>
                                        </div>
                                        <div className="auth-content my-auto">
                                        <div className="mb-1">
      <div className='signup-profile-pic__container'>
        <img src={imagePreview || userImg} className='signup-profile-pic' alt='' />
        <label htmlFor='image-upload' className='image-upload-label'>
          <i className='fas fa-plus-circle add-picture-icon'></i>
        </label>
        <input type='file' id='image-upload' hidden accept='image/png, image/jpeg' onChange={validateImg} />
      </div>
    </div>
                                            <form className="mt-1 pt-1" onSubmit={handleSignup}>
                                                <div className="md-1">
                                                    <label className="form-label">Nom</label>
                                                    <input className="form-control" type="text" placeholder="Entrer name" onChange={(e) => setName(e.target.value)} value={name} required />
                                                </div>
                                                <div className="md-1">
                                                    <label className="form-label">E-mail</label>
                                                    <input className="form-control" type="email" placeholder="exemple@exemple.com" onChange={(e) => setEmail(e.target.value)} value={email} required />
                                                </div>
                                                       
                                                <div className="md-1">
                                                    <label className="form-label">Numéro mobile</label>
                                                    <input className="form-control" type="number" placeholder="Enter email" onChange={(e) => setPhone(e.target.value)} value={phone} required />
                                                </div>     
                                                <div className="md-1">
                                                    <label className="form-label">Adresse</label>
                                                    <input className="form-control" type="text" placeholder="Région, ville" onChange={(e) => setAddress(e.target.value)} value={address} required />
                                                </div>
                                                <div className="md-1">
                                                    <label className="form-label">Domaine de travail</label>
                                                    <input className="form-control" type="text" placeholder="Responsable d'équipe, Développeur, Ressource Humaine...." onChange={(e) => setDomaine(e.target.value)} value={domaine} required />
                                                </div>
                                                <div className="md-1">
                                                    <div className="d-flex align-items-start">
                                                        <div className="flex-grow-1">
                                                            <label className="form-label">Mot de passe</label>
                                                            
                                                        </div>
                                                       
                                                    </div>

                                                    <div className="input-group auth-pass-inputgroup">
                                                        <input type="password" className="form-control" placeholder="Enter password" aria-label="Password" aria-describedby="password-addon" onChange={(e) => setPassword(e.target.value)} value={password} required/>
                                                        <button className="btn btn-light shadow-none ms-0" type="button" id="password-addon"><i className="mdi mdi-eye-outline"></i></button>
                                                    </div>
                                                </div>
                                                 <br/>
                                                <div className="md-2">
                                                    <button className="btn btn-primary w-100 waves-effect waves-light" type="submit">S'inscrire</button>
                                                </div>
                                            </form>


                                            <div className="mt-2 text-center">
                                                <p className="text-muted mb-0"> Retourne à  ? <Link to="/"
                                                    className="text-primary fw-semibold"> Connexion </Link> </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* end auth full page content */}
                        </div>
                        {/* end col */}
                        <div className="col-xxl-9 col-lg-8 col-md-7">
                        <div className="auth-bg pt-md-5 p-4 d-flex">
                                <div className="bg-overlay bg-primary bg-opacity-25"></div>
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
