import React, { useState } from "react";
import AppContext from './AppContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home'
import Register from './Register';
import Login from './Login';
import Logout from './Logout';

function App() {
  let isLoggedIn = true; // todo: context'in içine kat
  const [token, setToken] = useState("qwerty");

  return (
    <AppContext.Provider value={{ token, setToken }}>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/">
            { isLoggedIn ? <Home /> : <div>önce giriş yap</div> }
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
