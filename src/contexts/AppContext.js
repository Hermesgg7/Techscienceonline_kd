import React from 'react';

const initialState = {
    authenticated: null,
    userInfo: null
};

const AppContext = React.createContext(initialState);

export default AppContext;
