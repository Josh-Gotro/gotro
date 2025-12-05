import { useState, useEffect } from 'react';

const SPOTIFY_CLIENT_ID = 'c694c1ae79724f1aa39ff2127dbc82bd';
const SPOTIFY_SCOPES = [
  'user-library-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
].join(' ');

const Spotify = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check if user has valid tokens
    const accessToken = localStorage.getItem('spotify_access_token');
    const expiresAt = localStorage.getItem('spotify_token_expires_at');

    if (accessToken && expiresAt && Date.now() < parseInt(expiresAt)) {
      setIsConnected(true);
    }
  }, []);

  const handleConnectSpotify = () => {
    const redirectUri = `${window.location.origin}/spotify/callback`;
    const authUrl = new URL('https://accounts.spotify.com/authorize');

    authUrl.searchParams.append('client_id', SPOTIFY_CLIENT_ID);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('scope', SPOTIFY_SCOPES);
    authUrl.searchParams.append('state', crypto.randomUUID());

    window.location.href = authUrl.toString();
  };

  const handleDisconnect = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_expires_at');
    setIsConnected(false);
  };

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
      maxWidth: '500px',
      width: '90%',
    },
    logo: {
      fontSize: '60px',
      marginBottom: '20px',
    },
    title: {
      fontSize: '28px',
      marginBottom: '10px',
      color: '#1DB954',
    },
    message: {
      color: '#b3b3b3',
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    connectButton: {
      padding: '14px 32px',
      backgroundColor: '#1DB954',
      color: '#fff',
      border: 'none',
      borderRadius: '24px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'background-color 0.2s, transform 0.1s',
    },
    disconnectButton: {
      padding: '10px 20px',
      backgroundColor: 'transparent',
      color: '#b3b3b3',
      border: '1px solid #b3b3b3',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '14px',
      marginTop: '16px',
    },
    successIcon: {
      color: '#1DB954',
      fontSize: '48px',
      marginBottom: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {isConnected ? (
          <>
            <div style={styles.successIcon}>✓</div>
            <h1 style={styles.title}>Spotify Connected</h1>
            <p style={styles.message}>
              Your Spotify account is connected. You can now use Spotify features
              with Claude Desktop and other integrations.
            </p>
            <button
              style={styles.disconnectButton}
              onClick={handleDisconnect}
              onMouseOver={(e) => {
                e.target.style.borderColor = '#fff';
                e.target.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = '#b3b3b3';
                e.target.style.color = '#b3b3b3';
              }}
            >
              Disconnect
            </button>
          </>
        ) : (
          <>
            <div style={styles.logo}>🎵</div>
            <h1 style={styles.title}>Spotify Integration</h1>
            <p style={styles.message}>
              Connect your Spotify account to enable music controls through
              Claude Desktop and other MCP-enabled applications.
            </p>
            <button
              style={styles.connectButton}
              onClick={handleConnectSpotify}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#1ed760';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#1DB954';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Connect Spotify
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Spotify;
