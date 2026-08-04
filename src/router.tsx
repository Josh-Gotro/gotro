import { createBrowserRouter } from 'react-router';
import RootLayout from './RootLayout';

/**
 * Route table for v2.
 *
 * Every page is lazy so route bundles never land on `/` — the home map's
 * performance budget depends on this (see vault: Projects/joshgotro.com/v2-plan §4).
 *
 * /spotify/callback and /discobard are externally registered OAuth redirect
 * URIs (Spotify app, Warcraft Logs app). Their paths are cutover blockers and
 * must never change. See v2-plan §6.
 */

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/home/HomePage')).default,
        }),
      },
      {
        path: 'gallery',
        lazy: async () => ({
          Component: (await import('./pages/gallery/GalleryPage')).default,
        }),
      },
      {
        path: 'plaster-calculator',
        lazy: async () => ({
          Component: (await import('./pages/plaster/PlasterPage')).default,
        }),
      },
      {
        path: 'kiln',
        lazy: async () => ({
          Component: (await import('./pages/kiln/KilnPage')).default,
        }),
      },
      {
        path: 'spotify',
        lazy: async () => ({
          Component: (await import('./pages/spotify/SpotifyPage')).default,
        }),
      },
      {
        path: 'spotify/callback',
        lazy: async () => ({
          Component: (await import('./pages/spotify/SpotifyCallbackPage'))
            .default,
        }),
      },
      {
        path: 'discobard',
        lazy: async () => ({
          Component: (await import('./pages/discobard/DiscobardPage')).default,
        }),
      },
      {
        // v1 had no catch-all; unknown paths rendered a blank page.
        path: '*',
        lazy: async () => ({
          Component: (await import('./pages/NotFoundPage')).default,
        }),
      },
    ],
  },
]);
