import { useState } from 'react';
import axios from 'axios';
import Logo from '../../assets/Logo.svg';
import LoginImage from '../../assets/loginImage.png';
import '../../App.css';
import TextSlider from '../TextSlider/TextSlider';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post('/api/auth/login', {
            email,
            password,
        });

        if (response.status === 200) {
            console.log(response.data);
            // Handle success, e.g., redirect user, show a success message, etc.
            // window.location.href = '/dashboard'; // Redirect to superadmin dashboard
        } else {
            setError(response.data.error);
        }
        } catch (error) {
        console.error('Axios error:', error);
        setError('An error occurred during the request');
        }
    };

    return (
        <section className="login-container">
        <div className="left-section">
            <div className="logo">
            <img src={Logo} alt="" />
            </div>
            <div>
            <form className="form-container" onSubmit={handleLogin}>
                <h1 className="formHeading">Log In</h1>
                <p className="sign-in">Sign in to continue</p>
                <div className="form-fields">
                <input
                    className="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p className="error">{error}</p>}
                <button className="sign-in-button" type="submit">
                    Sign In
                </button>
                </div>
            </form>
            </div>
        </div>
        <div className="right-section">
            <img src={LoginImage} alt="" />
            <TextSlider />
        </div>
        </section>
    );
}
