import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from './Components/Login';
import Signup from './Components/Signup';
import Profile from './Components/Profile';
import NoteState from './context/NoteState';
import { useState } from 'react';

function App() {
  const [user, userlogin] = useState({});

  return (
    
    <>
    <NoteState>
    <Router>
    <Routes>
          <Route exact path="/login" element={<Login  userlogin = {userlogin}/>}></Route>
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/Profile" element={<Profile id={user._id} name ={user.name} age = {user.age} batch = {user.batch} email= {user.email}/>}></Route>
    </Routes>
    </Router>
    </NoteState>
    </>
  )
}

export default App;
