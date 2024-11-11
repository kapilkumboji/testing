import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Add this for redirection
import { loginWithEmailPassword, loginWithGoogle, requestOTP } from '../firebase';
import { auth } from '../firebase';
import { RecaptchaVerifier } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [usePhoneLogin, setUsePhoneLogin] = useState(false);
  const navigate = useNavigate();  // Initialize navigate

  // Initialize RecaptchaVerifier
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible', // Invisible reCAPTCHA
          callback: (response) => {
            console.log('Recaptcha verified', response);
          },
        },
        auth
      );
    }
  };

  const handleEmailLogin = async () => {
    try {
      await loginWithEmailPassword(email, password);
      alert('Login successful');
      navigate('/dashboard');  // Redirect to dashboard after successful login
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      alert('Google login successful');
      navigate('/dashboard');  // Redirect to dashboard after successful login
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleRequestOTP = async () => {
    setupRecaptcha();
    try {
      const confirmation = await requestOTP(phone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      alert('OTP sent to phone');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleVerifyOTP = async () => {
    if (!confirmationResult) return alert('Request OTP first');
    try {
      await confirmationResult.confirm(otp);
      alert('Phone login successful');
      navigate('/dashboard');  // Redirect after successful phone login
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        
        {usePhoneLogin ? (
          <>
            <input
              type="text"
              placeholder="Phone Number"
              className="input-field"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className="btn-primary" onClick={handleRequestOTP}>
              Request OTP
            </button>
            <input
              type="text"
              placeholder="Enter OTP"
              className="input-field"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn-primary" onClick={handleVerifyOTP}>
              Verify OTP
            </button>
            <p
              className="text-sm mt-4 cursor-pointer text-blue-500"
              onClick={() => setUsePhoneLogin(false)}
            >
              Back to Email Login
            </p>
          </>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn-primary" onClick={handleEmailLogin}>
              Login
            </button>
            <button className="btn-secondary" onClick={handleGoogleLogin}>
              Login with Google
            </button>
            <p
              className="text-sm mt-4 cursor-pointer text-blue-500"
              onClick={() => setUsePhoneLogin(true)}
            >
              Try another way
            </p>
          </>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login;
