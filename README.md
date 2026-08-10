# joshgotro.com

Personal site: a map to art, craft tools, and other not-work-related things.

- `/` is an abstract map. Hover or focus a region to see where it goes.
- `/gallery` is stained glass work, from pattern to finished piece.
- `/plaster-calculator` computes water and plaster for mold-making.
- `/kiln` records ceramic and glass firings.
- `/spotify` and `/discobard` handle OAuth callbacks for side projects.

## Stack

React 19, React Router 8, TypeScript, Vite. Plain modern CSS: the home page,
gallery motion, contact panel, and kiln tabs run on CSS alone (`:has()`,
scroll-driven animations, popovers, `:target`). TanStack Query and
react-hook-form load only on the tool routes.

## Development

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build
```

The backend is [gotrodb](https://github.com/Josh-Gotro/gotrodb) on port 3006.
Set `VITE_BACKEND_API_URL=http://localhost:3006` in `.env.local`.

## Deployment

Heroku, static build served by nginx (`Procfile` + `config/nginx.conf.erb`).
Push to main deploys. `VITE_BACKEND_API_URL` is set as a config var and baked
in at build time.
