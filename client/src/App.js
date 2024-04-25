
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AppContext, socket } from "./context/appContext";

import Login from "./Authentification/Login";
import { Signup } from "./Authentification/Signup";
import Dashboard from "./Admin/dashboardAdmin";
import Employee from "./pages/employee";
import { Role } from "./pages/role";
import Notes from "./pages/note";
import Calendrier from "./pages/calendrier";
import { ForgotPassword } from "./Authentification/forgot";
import { ResetPass } from "./Authentification/resetPass";
import Profile from "./pages/profile";
import Create from "./pages/create";
import {Update} from "./pages/update";
import DashboardDev from "./Developpeur/dashboardDeveloppeur";
import DashboardRh from "./RH/dashboardRh";
import DashboardResponsable from "./Responsable/dashboardResponsable";
import Liste from "./RH/listeEmployee";
import { Createproject } from "./Responsable/createprojet";
import Projets from "./Responsable/listeProjet";
import { Updateprojet } from "./Responsable/updateProjet";
import Taches from "./Responsable/listeTache";
import { CreateTache } from "./Responsable/createTache";
import { UpdateTache } from "./Responsable/updateTache";
import RoomPage from "./Responsable/Room";
import HomeVideo from "./Responsable/VideoHome";
import { Demande } from "./Responsable/demandeResponsable";
import DemandeRh from "./RH/demandes";
import NotesRh from "./RH/noteRh";
import CalendrierRh from "./RH/calendrier";
import HomeVideoRh from "./RH/VideoHome";
import RoomPageRh from "./RH/Room";
import Listes from "./Responsable/listeEmployee";
import Conges from "./RH/demandes";
import ListesConges from "./RH/listesConges";
import HomeGoogle from "./Responsable/Google/HomeGoogle";
import NotesRes from "./Responsable/note";
import CalendrierRes from "./Responsable/calendrier";
import ListesRh from "./RH/liste";


function App() {
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [privateMemberMsg, setPrivateMemberMsg] = useState({});
    const [newMessages, setNewMessages] = useState({});
    return (
        <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
            <BrowserRouter>
                <Routes>
                    
                    
                            <Route path="/" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        
                        <Route path="/dashboardAdmin" element={<Dashboard />}/>
                        <Route path="/employee" element={<Employee />}/>
                        <Route path="/role" element={<Role />}/>
                        <Route path="/note" element={<Notes />}/>
                        <Route path="/calendrier" element={<Calendrier/>}/>
                        <Route path='/forgot' element={<ForgotPassword/>}/>  
                        <Route path='/resetPass/:id/:token' element={<ResetPass/>}/>     
                         <Route path="/profile" element={<Profile/>}/>
                         <Route path="/create" element={<Create />}/>
                         <Route path="/update/:id" element={<Update />}/>
                         <Route path="/developpement" element={<DashboardDev />}/>
                         <Route path="/rh" element={<DashboardRh />}/>


                         
                         <Route path="/responsable" element={<DashboardResponsable/>}/>
                         <Route path="/listes" element={<Listes />}/>
                         <Route path="/createProjet" element={<Createproject />}/>
                         <Route path="/listeProjet" element={<Projets/>}/>
                         <Route path='/updateprojet/:id' element={<Updateprojet/>}/>
                         <Route path="/listeTache" element={<Taches />}/>
                         <Route path="/createTache" element={<CreateTache />}/>
                         <Route path='/updateTache/:id' element={<UpdateTache/>}/>
                         <Route path='/HomevideoResponsable' element={<HomeVideo/>}/>
                        <Route path='/roomResponsable/:roomId' element={<RoomPage/>}/>
                        <Route path="/demande" element={<Demande />}/>
                        <Route path="/noteres" element={<NotesRes />}/>
                        <Route path="/calendrierres" element={<CalendrierRes />}/>
                       
                       <Route path="/homegoogle" element={<HomeGoogle />}/>
                       
                       
                       
                       
                       
                       
                        <Route path="/demandes" element={<Conges/>}/>
                        <Route path="/noteRh" element={<NotesRh />}/>
                        <Route path="/calendrierRh" element={<CalendrierRh/>}/>
                        <Route path='/HomevideoRh' element={<HomeVideoRh/>}/>
                        <Route path='/roomRh/:roomId' element={<RoomPageRh/>}/>
                        <Route path="/listeConge" element={<ListesConges/>}/>
                        <Route path="/liste" element={<ListesRh />}/>
                        
                
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
