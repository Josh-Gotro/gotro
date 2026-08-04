# gotro-v2

The v2 rewrite of [joshgotro.com](https://www.joshgotro.com). Built side-by-side
with the live v1 frontend (`../gotro`); cuts over to the production domain only
when complete. The directory name is temporary.

Planning docs live in the Obsidian vault under `Projects/joshgotro.com/`:

- `v1.md` — assessment of the current production site
- `v2-plan.md` — architecture, scope, phases, and security plan
- `Decisions.md` — decision log

## Stack

Vite · React 19 · React Router 8 · TypeScript · plain modern CSS (no UI kit)

## Development

```bash
cp .env.example .env.local   # once
npm install
npm run dev                  # http://localhost:5173 (port is pinned — see vite.config.ts)
```

The backend is the existing `../gotrodb` Express API:

```bash
cd ../gotrodb && node server.js   # port 3006
```

Port 5173 is already in gotrodb's CORS allowlist, so no proxy or backend
change is needed for local development.

## Commands

| Command                | What it does                 |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Dev server with HMR          |
| `npm run build`        | Typecheck + production build |
| `npm run preview`      | Serve the production build   |
| `npm run lint`         | oxlint                       |
| `npm run typecheck`    | tsc only                     |
| `npm run format`       | Prettier, write              |
| `npm run format:check` | Prettier, check only         |

## Route map

| Route                 | Status                                         |
| --------------------- | ---------------------------------------------- |
| `/`                   | Placeholder map — real scene lands in Phase 2  |
| `/gallery`            | Placeholder — Phase 3                          |
| `/plaster-calculator` | Placeholder — Phase 4                          |
| `/kiln`               | Placeholder — Phase 4                          |
| `/spotify`            | Placeholder — Phase 5                          |
| `/spotify/callback`   | **Externally registered OAuth path** — Phase 5 |
| `/discobard`          | **Externally registered OAuth path** — Phase 5 |
| `*`                   | 404                                            |

`/spotify/callback` and `/discobard` are registered redirect URIs on external
OAuth apps (Spotify, Warcraft Logs). Their paths must never change.
