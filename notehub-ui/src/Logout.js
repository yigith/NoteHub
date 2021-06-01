import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from './AppContext';

function Logout() {
    const ctx = useContext(AppContext);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    
    useEffect(() => {
        ctx.setIsLoggedIn(false);
        ctx.setToken(null);
    });

    return <Redirect to="/login?logout=success" />;
}

export default Logout
