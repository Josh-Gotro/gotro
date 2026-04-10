import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendApiUrl } from '../../api/useApi';
import './Discobard.css';

const Discobard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      setMessage('Warcraft Logs connection failed. Please try again.');
      return;
    }

    if (!code || !state) {
      setStatus('info');
      setMessage('This page handles Warcraft Logs authorization callbacks.');
      return;
    }

    const exchangeCode = async () => {
      try {
        const response = await axios.post(
          `${backendApiUrl}/api/oauth/discobard/callback`,
          { code, state }
        );

        if (response.data.success) {
          if (response.data.returnUrl) {
            setStatus('success');
            setMessage('Warcraft Logs connected! Redirecting...');
            window.location.href = response.data.returnUrl;
            return;
          }
          setStatus('success');
          setMessage(
            'Warcraft Logs connected successfully. You can close this tab.'
          );
        } else {
          setStatus('error');
          setMessage('Warcraft Logs connection failed. Please try again.');
        }
      } catch {
        setStatus('error');
        setMessage('Warcraft Logs connection failed. Please try again.');
      }

      navigate('/discobard', { replace: true });
    };

    exchangeCode();
  }, [searchParams, navigate]);

  return (
    <div className="discobard">
      <div className="discobard-card">
        {status === 'loading' && (
          <>
            <div className="discobard-spinner" />
            <p>Connecting to Warcraft Logs...</p>
          </>
        )}
        {status === 'success' && (
          <>
            <h2>Connected</h2>
            <p>{message}</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h2>Error</h2>
            <p>{message}</p>
          </>
        )}
        {status === 'info' && (
          <>
            <h2>Discobard</h2>
            <p>{message}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Discobard;
