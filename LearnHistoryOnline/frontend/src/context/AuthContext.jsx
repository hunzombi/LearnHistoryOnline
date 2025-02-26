import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext('hellow');
const apiUrl = process.env.REACT_APP_API_URL;

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try{
            const res = await fetch(`${apiUrl}/api/auth/getUser`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();
            setUser(data);
        } catch (err) {
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const addCompleted = async (value) => {
        try {
            const res = await fetch(`${apiUrl}/api/auth/completed`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({value}),
                credentials: 'include'
            });
            
            const data = await res.json();

            if (data.res) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error("Error", err);
        }
        fetchUser();
    }

    const register = async (username, email, password) => {
        try {
            const res = await fetch(`${apiUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, email, password}),
                credentials: 'include'
            });

            const data = await res.json();

            if (data.res) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Error: ', err);
        }
    }

    const login = async (email, password) => {
        try {
            const res = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: "include"
            });

            if (res.ok){
                const data = await res.json();
                setUser(data.user);
                return true;
            } else {
                return false;
            }
        } catch (err) {
            // Do Nothing
        }
    };

    const logout = () => {
        fetch(`${apiUrl}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        }).then(() => {
            setUser(null);
        });
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, addCompleted, loading }}>
            { children }
        </AuthContext.Provider>
    )
};

export { AuthContext, AuthProvider };