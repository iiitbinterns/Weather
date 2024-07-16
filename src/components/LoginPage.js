import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login form submission
    console.log("Email:", email);
    console.log("Password:", password);
    // Add logic to send the login data to the server
  };

  const handleButtonClick = () => {
    setButtonClicked(true);
    // Add any additional logic for the button click here
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', padding: '20px' }}>
      <div style={{ display: 'grid', gap: '10px', border: '2px solid lightgray', borderRadius: '50px', padding: '20px' }}>
        <h2 style={{ color: 'darkblue' }}>Weather Forecast Portal Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <div style={{ display: 'grid', gap: '5px' }}>
            <label style={{ color: 'black', opacity: '0.7' }}>Enter your Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ backgroundColor: '#f2f2f2', padding: '5px' }} />
          </div>
          <div style={{ display: 'grid', gap: '5px' }}>
            <label style={{ color: 'black', opacity: '0.7' }}>Enter your Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ backgroundColor: '#f2f2f2', padding: '5px' }} />
          </div>
          <div style={{ display: 'grid', placeItems: 'center' }}>
            <button type="submit" onClick={handleButtonClick} style={{ backgroundColor: 'blue', padding: '10px 20px', border: 'none', cursor: 'pointer', position: 'relative', borderRadius: '20px', transition: 'background-color 0.3s' }}>
              Login
              {buttonClicked && <span style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '20px', background: 'rgba(255, 255, 255, 0.2)', animation: 'sparkle 1s infinite'}}></span>}
            </button>
          </div>
        </form>
        <p style={{ color: 'gray', marginTop: '10px' }}>Don't have an account? <a href="/signup" style={{ textDecoration: 'none', color: 'blue' }}>Sign up</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
