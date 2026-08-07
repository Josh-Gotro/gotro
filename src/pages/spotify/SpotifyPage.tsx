import { Link } from 'react-router';

/**
 * Phase 5 — Spotify connect flow (v2-plan §10).
 *
 * The v2 build must fix what v1 got wrong here (v2-plan §5): verify `state`
 * on return (or use PKCE), keep tokens out of localStorage, and pair with the
 * backend account-allowlist check.
 */
export default function SpotifyPage() {
  return (
    <main className="page-placeholder">
      <h1>Spotify</h1>
      <p>Not wired up yet, coming in Phase 5. Use v1 to connect Spotify.</p>
      <Link to="/">Back to the map</Link>
    </main>
  );
}
