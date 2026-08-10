import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { api } from '@/lib/api';
import '../oauthCard.css';

/**
 * EXACT PATH: /discobard — registered Warcraft Logs redirect URI.
 *
 * Discobard starts a handoff via the backend bridge; Warcraft Logs redirects
 * here with code+state; this page completes the exchange. The backend
 * validates state (hashed at rest) and only stores allowlisted returnUrls.
 */

interface CallbackResponse {
  success: boolean;
  returnUrl: string | null;
}

export default function DiscobardPage() {
  const [params] = useSearchParams();
  const [phase, setPhase] = useState<'working' | 'done' | 'error' | 'info'>(
    'working',
  );
  const [message, setMessage] = useState('connecting to Warcraft Logs…');
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const error = params.get('error');
    const code = params.get('code');
    const state = params.get('state');

    if (error) {
      setPhase('error');
      setMessage('Warcraft Logs connection failed. please try again');
      return;
    }

    if (!code || !state) {
      setPhase('info');
      setMessage('this page handles Warcraft Logs authorization callbacks');
      return;
    }

    (async () => {
      try {
        const response = await api.post<CallbackResponse>(
          '/api/oauth/discobard/callback',
          { code, state },
        );
        if (!response.success) throw new Error('exchange failed');

        if (response.returnUrl) {
          setPhase('done');
          setMessage('connected. heading back…');
          window.location.href = response.returnUrl;
          return;
        }
        setPhase('done');
        setMessage('Warcraft Logs connected. you can close this tab');
      } catch {
        setPhase('error');
        setMessage('Warcraft Logs connection failed. please try again');
      }
    })();
  }, [params]);

  return (
    <main className="oauth-room">
      <div className="oauth-card">
        <h1>discobard</h1>
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
      </div>
    </main>
  );
}
