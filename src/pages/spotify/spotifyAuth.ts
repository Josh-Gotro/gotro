import { api } from '@/lib/api';

/**
 * Spotify authorization with PKCE and verified state.
 *
 * v1's flow had two holes (v2-plan §5.3, §5.4): it generated a `state` and
 * never checked it on return, and it stored access/refresh tokens in
 * localStorage even though the MCP reads them from Postgres. Here:
 * - state is verified on return and consumed once
 * - PKCE means the code is useless without the verifier
 * - no token ever touches browser storage; the backend holds them and the
 *   page asks /spotify/status for a boolean
 *
 * sessionStorage holds only the short-lived verifier/state, cleared on use.
 */

const CLIENT_ID = 'c694c1ae79724f1aa39ff2127dbc82bd';
const AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const VERIFIER_KEY = 'spotify_pkce_verifier';
const STATE_KEY = 'spotify_auth_state';

const SCOPES = [
  'user-library-read',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
].join(' ');

/** Spotify requires the redirect URI to match the registered one exactly. */
export function redirectUri(): string {
  return `${window.location.origin}/spotify/callback`;
}

function base64url(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function randomString(byteLength = 32): string {
  return base64url(crypto.getRandomValues(new Uint8Array(byteLength)));
}

async function challengeFor(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(verifier),
  );
  return base64url(new Uint8Array(digest));
}

/** Builds the authorize URL and stashes the verifier + state for the return. */
export async function beginAuthorization(): Promise<string> {
  const verifier = randomString();
  const state = randomString(16);
  sessionStorage.setItem(VERIFIER_KEY, verifier);
  sessionStorage.setItem(STATE_KEY, state);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri(),
    scope: SCOPES,
    state,
    code_challenge_method: 'S256',
    code_challenge: await challengeFor(verifier),
  });

  return `${AUTHORIZE_URL}?${params.toString()}`;
}

export class AuthError extends Error {}

/** Verifies the returned state and consumes the one-time PKCE material. */
export function consumeAuthContext(returnedState: string | null): string {
  const expectedState = sessionStorage.getItem(STATE_KEY);
  const verifier = sessionStorage.getItem(VERIFIER_KEY);
  sessionStorage.removeItem(STATE_KEY);
  sessionStorage.removeItem(VERIFIER_KEY);

  if (!expectedState || !verifier) {
    throw new AuthError(
      'No pending authorization. Start again from the connect page.',
    );
  }
  if (returnedState !== expectedState) {
    throw new AuthError(
      'State mismatch. The response did not match the request.',
    );
  }
  return verifier;
}

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

/** Exchanges the code, then hands the tokens to the backend for the MCP. */
export async function completeAuthorization(
  code: string,
  verifier: string,
): Promise<void> {
  const tokens = await api.post<TokenResponse>('/spotify/token', {
    code,
    redirect_uri: redirectUri(),
    code_verifier: verifier,
  });

  await api.post('/spotify/mcp-token', {
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_in: tokens.expires_in,
  });
}

export interface SpotifyStatus {
  connected: boolean;
  expires_at?: number;
  updated_at?: string;
}

export function fetchSpotifyStatus() {
  return api.get<SpotifyStatus>('/spotify/status');
}
