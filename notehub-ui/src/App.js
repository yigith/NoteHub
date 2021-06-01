import React, { useState } from "react";
import AppContext from './AppContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home'
import Register from './Register';
import Login from './Login';
import Logout from './Logout';

function App() {
  // todo: local/session storage da token varsa login et..
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [token, setToken] = useState(null);

  return (
    <AppContext.Provider value={{ token, setToken, isLoggedIn, setIsLoggedIn }}>
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
            { isLoggedIn ? <Home /> : <Redirect to="/login" /> }
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
