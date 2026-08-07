import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import {
  AuthError,
  completeAuthorization,
  consumeAuthContext,
} from './spotifyAuth';
import '../oauthCard.css';

/**
 * EXACT PATH: /spotify/callback — registered Spotify redirect URI.
 *
 * Unlike v1: the state is actually verified, the exchange carries the PKCE
 * verifier, and nothing is written to localStorage (v2-plan §5.3, §5.4).
 */
export default function SpotifyCallbackPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'working' | 'done' | 'error'>('working');
  const [message, setMessage] = useState('completing the handshake…');
  const ran = useRef(false);

  useEffect(() => {
    // StrictMode mounts effects twice in dev; the auth context is one-shot.
    if (ran.current) return;
    ran.current = true;

    const error = params.get('error');
    const code = params.get('code');

    if (error) {
      setPhase('error');
      setMessage(
        error === 'access_denied'
          ? 'access was denied on the Spotify side'
          : `authorization failed: ${error}`,
      );
      return;
    }

    if (!code) {
      setPhase('error');
      setMessage(
        'no authorization code in the URL. start from the connect page',
      );
      return;
    }

    (async () => {
      try {
        const verifier = consumeAuthContext(params.get('state'));
        await completeAuthorization(code, verifier);
        setPhase('done');
        setMessage('connected. tokens are stored for the MCP');
        setTimeout(() => navigate('/spotify'), 1600);
      } catch (err) {
        setPhase('error');
        setMessage(
          err instanceof AuthError
            ? err.message.toLowerCase()
            : 'token exchange failed. try connecting again',
        );
      }
    })();
  }, [params, navigate]);

  return (
    <main className="oauth-room">
      <div className="oauth-card">
        <h1>spotify</h1>
        {phase === 'working' && (
          <div className="oauth-spinner" aria-hidden="true" />
        )}
        {phase === 'done' && (
          <span className="oauth-status is-connected">
            <span className="oauth-dot" /> connected
          </span>
        )}
        {phase === 'error' && (
          <span className="oauth-status is-error">
            <span className="oauth-dot" /> failed
          </span>
        )}
        <p role="status">{message}</p>
        {phase === 'error' && (
          <Link to="/spotify" className="oauth-button">
            back to connect
          </Link>
        )}
      </div>
    </main>
  );
}
