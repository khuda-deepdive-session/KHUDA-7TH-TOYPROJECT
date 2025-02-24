//src/routes/auth/login.tsx
import React from 'react';
import { GoogleLogin } from '@/components/auth/GoogleLogin';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  
  const handleGoogleLogin = async () => {
    try {
      await login({ google_token: 'token_from_google' });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return <GoogleLogin onLogin={handleGoogleLogin} />;
};

export default Login;