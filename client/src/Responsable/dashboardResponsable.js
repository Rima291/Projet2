import React from 'react';
import './dashboard.css';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';

 function DashboardResponsable() {


    return (
        <div>
            {/* Votre JSX pour le composant Dashboard */}
            <section id="sidebar" >
                <Link to={'/'} className="brand">
                    <i className='bx bxs-smile'></i>
                    <span className="text">Responsable</span>
                </Link>
                <ul className="side-menu top">
                    <li className="">
                        <Link to={'/dashboard'}>
                            <i className='bx bxs-dashboard' ></i>
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/listes'}>
                            <i className='bx bx-group'></i>
                            <span className="text">Listes des Employees</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/listeProjet'}>
                            <i className='bx bxs-doughnut-chart' ></i>
                            <span className="text">Projets</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/listeTache'}>
                        <i class='bx bx-task-x' ></i>
                            <span className="text">Taches</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/HomevideoResponsable'}>
                        <i class='bx bx-video'></i>                        
                            <span className="text">Salle de Reunion</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/homegoogle'}>
                        <i class='bx bx-bot'></i>
                            <span className="text">Gemini IA</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/chat'}>
                            <i className='bx bxs-message-dots' ></i>
                            <span className="text">Messages</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/demande'}>
                            <i className='bx bxs-message-dots' ></i>
                            <span className="text">Demande Conge</span>
                        </Link>
                    </li>
                  
                  
                </ul>
                <ul className="side-menu">
                    <li>
                       
                    <Link to={'/noteres'}>
                            <i className='bx bx-notepad' ></i>
                            <span className="text">Notes</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/calendrierres'}>
                            <i className='bx bx-calendar' ></i>
                            <span className="text">Calendrier</span>
                        </Link>
                    </li>
                </ul>
            </section>
             

            
            <div id="content">
                <Navigation/>
                <main>
                    {/* Contenu du tableau de bord */}
                </main>
            </div>

                
        </div>
    );
}
export default DashboardResponsable;
