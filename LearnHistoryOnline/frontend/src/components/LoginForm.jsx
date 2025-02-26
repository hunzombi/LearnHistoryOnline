import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { login, user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("hello!");
        const res = await login(email, password);
        console.log("good");
        console.log(res);
    };

    if (user !== null) {
        return <h2>Welcome, {user.username}</h2>
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required></input>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;