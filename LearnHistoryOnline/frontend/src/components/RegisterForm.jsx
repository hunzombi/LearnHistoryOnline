import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import style from '../css/RegisterForm.module.css';

function LoginForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    
    const { register, user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert("The 2 passwords should match!");
            return;
        }

        const res = await register(username, email, password);
        console.log("hello");
        if (res) {
            navigate("/login");
        }
    };

    if (user !== null) {
        return <h2>Welcome, {user.username}</h2>
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required></input>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required></input>
            <input type="password" className={(password !== password2) ? style.red : ''} value={password2} onChange={(e) => setPassword2(e.target.value)} placeholder="Password Again" required></input>
            <button type="submit">Register</button>
        </form>
    );
}

export default LoginForm;