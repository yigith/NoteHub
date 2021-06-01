import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import AppContext from './AppContext';

function Logout() {
    const ctx = useContext(AppContext);
    ctx.setIsLoggedIn(false);
    ctx.setToken(null);

    // todo: localStorage'dan token'ı sil


    return <Redirect to="/login?logout=success" />;
}

export default Logout
