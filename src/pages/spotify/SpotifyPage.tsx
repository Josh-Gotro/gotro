import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { beginAuthorization, fetchSpotifyStatus } from './spotifyAuth';
import type { SpotifyStatus } from './spotifyAuth';
import '../oauthCard.css';

/**
 * Spotify connect page. Public, but harmless to strangers: the backend only
 * accepts token binds from the allowlisted account (v2-plan §5.2), and no
 * tokens ever reach this page — connection state is a boolean from
 * /spotify/status (§5.4).
 */
export default function SpotifyPage() {
  const [status, setStatus] = useState<SpotifyStatus | 'loading' | 'offline'>(
    'loading',
  );

  useEffect(() => {
    let cancelled = false;
    fetchSpotifyStatus()
      .then((s) => !cancelled && setStatus(s))
      .catch(() => !cancelled && setStatus('offline'));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleConnect = async () => {
    window.location.href = await beginAuthorization();
  };

  return (
    <main className="oauth-room">
      <Link to="/" className="oauth-moon" aria-label="Back to the map" />
      <div className="oauth-card">
        <h1>spotify</h1>

        {status === 'loading' ? (
          <span className="oauth-status">
            <span className="oauth-dot" /> checking…
          </span>
        ) : status === 'offline' ? (
          <span className="oauth-status is-error">
            <span className="oauth-dot" /> backend unreachable
          </span>
        ) : status.connected ? (
          <>
            <span className="oauth-status is-connected">
              <span className="oauth-dot" /> connected
            </span>
            <p>
              Tokens are held server side for the MCP. Claude and other
              integrations can control playback. Reconnect any time to refresh
              the link.
            </p>
          </>
        ) : (
          <>
            <span className="oauth-status">
              <span className="oauth-dot" /> not connected
            </span>
            <p>
              Connect the Spotify account to enable music control through Claude
              and other MCP tools. Only the allowed account can complete the
              link.
            </p>
          </>
        )}

        {status !== 'loading' && status !== 'offline' && (
          <button
            type="button"
            className="oauth-button"
            onClick={handleConnect}
          >
            {status.connected ? 'reconnect' : 'connect spotify'}
          </button>
        )}
      </div>
    </main>
  );
}
