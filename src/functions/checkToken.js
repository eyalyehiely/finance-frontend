import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const checkToken = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')).access : null;

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        // Check if the token is expired
        if (decodedToken.exp < currentTime) {
          // Token is expired
          navigate('/signin');
        }
      } catch (error) {
        // Token decoding failed
        console.error('Invalid token:', error);
        navigate('/signin');
      }
    } else {
      // No token available
      navigate('/signin');
    }
  }, [navigate]);
};

export default checkToken;
