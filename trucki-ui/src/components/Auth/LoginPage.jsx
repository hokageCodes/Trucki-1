import { useState } from 'react';
import Logo from '../../assets/Logo.svg';
import LoginImage from '../../assets/loginImage.png';
import '../../App.css';
import TextSlider from '../TextSlider/TextSlider';
import  axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
console.log('err')
        try {
            let data = JSON.stringify({
                "email": "olajuwonlawal2012@gmail.com",
                "password": "olajuwon1"
              });

            //   let config = {
            //     method: 'post',
            //     maxBodyLength: Infinity,
            //     url: 'http://localhost:5000/api/auth/superadmin/login',
            //     headers: { 
            //       'Content-Type': 'application/json', 
            //       'Authorization': 'Basic b2xhanV3b24ubGF3YWxAcG1nbG9iYWx0ZWNobm9sb2d5LmNvbTpQYXNzd29yZA=='
            //     },
            //     data : data
            //   };

            const response  = await axios.post('http://localhost:5000/api/auth/superadmin/login', data).then(res=>res).catch(res => res.response);
            console.log({response})
        // const response = await axios.request(config).then(res => res).catch(err=> err);
        if (response.status === 200) {
            console.log(response.data);
            // Handle success, e.g., redirect user, show a success message, etc.
            // window.location.href = '/dashboard'; // Redirect to superadmin dashboard
        } else {
            setError(response.data.error || response.data.message);
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
