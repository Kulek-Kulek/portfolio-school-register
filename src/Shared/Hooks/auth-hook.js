import { useEffect, useState, useCallback } from 'react';

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userStatus, setUserStatus] = useState(null);

    const [tokenExpires, setTokenExpires] = useState();

    const login = useCallback((userId, userEmail, token, userStatus, expires) => {
        setToken(token);
        setUserId(userId);
        setUserEmail(userEmail);
        setUserStatus(userStatus);
        const tokenExpirationDate = expires || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpires(tokenExpirationDate);
        localStorage.setItem('userData',
            JSON.stringify({
                userId,
                userEmail,
                token,
                userStatus,
                expires: tokenExpirationDate.toISOString()
            }))
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setUserEmail(null);
        setUserStatus(null);
        setTokenExpires(null);
        localStorage.removeItem('userData');
    }, []);


    useEffect(() => {
        if (token && tokenExpires) {
            const remainingTime = tokenExpires.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpires]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (storedData && storedData.token && new Date(storedData.expires) > new Date()) {
            login(storedData.userId, storedData.userEmail, storedData.token, storedData.userStatus, new Date(storedData.expires))
        }
    }, [login]);

    return { token, login, logout, userId, userEmail, userStatus };
}