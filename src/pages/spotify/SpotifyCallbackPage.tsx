/**
 * Phase 5 — OAuth redirect target. EXACT PATH: /spotify/callback
 *
 * Registered as a redirect URI on the Spotify app — this URL is a cutover
 * blocker and must never change (v2-plan §6). Until Phase 5 lands, v1 remains
 * the live handler; this placeholder must NOT be deployed anywhere Spotify
 * points at.
 */
export default function SpotifyCallbackPage() {
  return (
    <main className="page-placeholder">
      <h1>Spotify Callback</h1>
      <p>Not wired up yet. This route is handled by v1 in production.</p>
    </main>
  );
}
