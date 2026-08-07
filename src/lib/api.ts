/**
 * Typed client for the gotrodb Express API.
 *
 * Endpoint shapes are documented in the vault: Projects/joshgotro.com/v1.md
 * ("Endpoint inventory"). Domain-specific functions and types get added here
 * as each tool is ported (plaster, kiln, spotify, discobard).
 */

export const backendApiUrl: string = import.meta.env.VITE_BACKEND_API_URL;

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${backendApiUrl}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) detail = body.error;
    } catch {
      // non-JSON error body; keep statusText
    }
    throw new ApiError(response.status, detail);
  }

  // Some endpoints 200 with an empty body (e.g. /current-ceramic-firing when
  // no firing is in progress — res.json(undefined) server-side).
  const text = await response.text();
  return (text === '' ? undefined : JSON.parse(text)) as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
};
