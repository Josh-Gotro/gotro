import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SpotifyCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      setErrorMessage(
        error === 'access_denied'
          ? 'You denied access to your Spotify account.'
          : `Authorization failed: ${error}`
      );
      return;
    }

    if (!code) {
      setStatus('error');
      setErrorMessage('No authorization code received from Spotify.');
      return;
    }

    const exchangeToken = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3006';
        const redirectUri = `${window.location.origin}/spotify/callback`;

        const response = await fetch(`${backendUrl}/spotify/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            redirect_uri: redirectUri,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error_description || data.error || 'Token exchange failed');
        }

        // Store tokens in localStorage
        localStorage.setItem('spotify_access_token', data.access_token);
        localStorage.setItem('spotify_refresh_token', data.refresh_token);
        localStorage.setItem('spotify_token_expires_at', Date.now() + data.expires_in * 1000);

        // Also store tokens in backend for MCP access
        try {
          await fetch(`${backendUrl}/spotify/mcp-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: data.access_token,
              refresh_token: data.refresh_token,
              expires_in: data.expires_in,
            }),
          });
        } catch (mcpError) {
          console.warn('Failed to store token for MCP:', mcpError);
          // Don't fail the flow if MCP storage fails
        }

        setStatus('success');
        setTimeout(() => {
          navigate('/spotify');
        }, 1500);
      } catch (err) {
        console.error('Token exchange error:', err);
        setStatus('error');
        setErrorMessage(err.message || 'Failed to complete authentication');
      }
    };

    exchangeToken();
  }, [searchParams, navigate]);

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: '#121212',
      color: '#fff',
    },
    card: {
      backgroundColor: '#282828',
      borderRadius: '8px',
      padding: '40px',
      textAlign: 'center',
      maxWidth: '400px',
      width: '90%',
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '4px solid #333',
      borderTop: '4px solid #1DB954',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '0 auto 20px',
    },
    successIcon: {
      fontSize: '50px',
      marginBottom: '20px',
    },
    errorIcon: {
      fontSize: '50px',
      marginBottom: '20px',
    },
    title: {
      fontSize: '24px',
      marginBottom: '10px',
    },
    message: {
      color: '#b3b3b3',
      fontSize: '14px',
    },
    errorText: {
      color: '#ff6b6b',
    },
    retryButton: {
      marginTop: '20px',
      padding: '12px 24px',
      backgroundColor: '#1DB954',
      color: '#fff',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.card}>
          {status === 'loading' && (
            <>
              <div style={styles.spinner}></div>
              <h1 style={styles.title}>Connecting to Spotify</h1>
              <p style={styles.message}>Please wait while we complete the authorization...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div style={styles.successIcon}>✓</div>
              <h1 style={styles.title}>Success!</h1>
              <p style={styles.message}>Redirecting you now...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <div style={{ ...styles.errorIcon, ...styles.errorText }}>✕</div>
              <h1 style={{ ...styles.title, ...styles.errorText }}>Authorization Failed</h1>
              <p style={styles.message}>{errorMessage}</p>
              <button
                style={styles.retryButton}
                onClick={() => navigate('/')}
              >
                Return Home
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SpotifyCallback;
