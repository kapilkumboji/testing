import React, { useState } from 'react';
import { signUpWithEmailPassword, loginWithGoogle, requestOTP } from '../firebase'; // Import relevant functions
import { recaptchaVerifier } from '../firebase'; // Import recaptchaVerifier

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');

  const handleEmailSignUp = async () => {
    try {
      await signUpWithEmailPassword(email, password);
      alert('Registration successful');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await loginWithGoogle();
      alert('Google sign-up successful');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const setupRecaptcha = () => {
    // Initialize reCAPTCHA when the OTP request is triggered
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = recaptchaVerifier('recaptcha-container');
    }
  };

  const handleRequestOTP = async () => {
    setupRecaptcha();
    try {
      const confirmation = await requestOTP(phone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      alert('OTP sent to phone');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleVerifyOTP = async () => {
    if (!confirmationResult) {
      alert('Please request OTP first');
      return;
    }
    try {
      await confirmationResult.confirm(otp);
      alert('Phone verified successfully');
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        
        <button className="btn-primary" onClick={handleEmailSignUp}>
          Register with Email
        </button>

        <button className="btn-primary mt-4" onClick={handleGoogleSignUp}>
          Sign Up with Google
        </button>

        {/* Phone Number */}
        <input
          type="text"
          placeholder="Phone Number"
          className="input-field mt-4"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button className="btn-primary mt-4" onClick={handleRequestOTP}>
          Request OTP
        </button>

        {/* OTP Input */}
        <input
          type="text"
          placeholder="Enter OTP"
          className="input-field mt-4"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="btn-primary mt-4" onClick={handleVerifyOTP}>
          Verify OTP
        </button>
        <p
              className="text-sm mt-4 cursor-pointer text-blue-500"
            >
              Already have an account?
            </p>
        {/* reCAPTCHA container */}
        <div id="recaptcha-container"></div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
