import { createContext } from 'react';


export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    userEmail: null,
    userStatus: null,
    login: () => { },
    logout: () => { }
});