import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/login';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(API_URL, { username, password });
            if (response.status === 200) {
                localStorage.setItem('username', username);
                window.location.href = '/welcome';
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Backend is not reachable. Start backend on http://127.0.0.1:5000 and try again.';
            setError(message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
