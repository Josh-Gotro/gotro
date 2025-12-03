const Spotify = () => {
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
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>🎵</div>
        <h1 style={styles.title}>Welcome to Spotify Integration</h1>
        <p style={styles.message}>
          You have successfully connected your Spotify account.
        </p>
      </div>
    </div>
  );
};

export default Spotify;
