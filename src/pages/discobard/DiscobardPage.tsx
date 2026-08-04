/**
 * Phase 5 — OAuth redirect target. EXACT PATH: /discobard
 *
 * Registered as the Warcraft Logs redirect URI for the Discobard handoff
 * bridge — this URL is a cutover blocker and must never change (v2-plan §6).
 * Until Phase 5 lands, v1 remains the live handler; this placeholder must NOT
 * be deployed anywhere Warcraft Logs points at.
 */
export default function DiscobardPage() {
  return (
    <main className="page-placeholder">
      <h1>Discobard</h1>
      <p>Not wired up yet — this route is handled by v1 in production.</p>
    </main>
  );
}
