import React from 'react';
import { Redirect } from 'react-router-dom';

function Logout() {
    // todo: token'ı sil

    return <Redirect to="/login?logout=success" />;
}

export default Logout
