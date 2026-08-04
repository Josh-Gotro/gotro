/**
 * The destinations the home map points at.
 *
 * Design principle (v2-plan §1): adding a destination to the map is a content
 * edit — append an entry here — not a layout rewrite. The map component renders
 * whatever this list contains.
 */

export interface Destination {
  slug: string;
  label: string;
  /** Internal route or external URL. */
  href: string;
  /** One-liner shown on hover/focus. */
  hint: string;
  external?: boolean;
  /**
   * Excluded from the fallback text nav (OAuth pages, easter eggs, or
   * destinations reachable only through their scene region).
   */
  unlisted?: boolean;
}

export const destinations: Destination[] = [
  {
    slug: 'gallery',
    label: 'Gallery',
    href: '/gallery',
    hint: 'Sculpture and other art',
    // Reachable only via the moon — Josh: no corner-nav duplicate (2026-08-04).
    unlisted: true,
  },
  {
    slug: 'plaster',
    label: 'Plaster Calculator',
    href: '/plaster-calculator',
    hint: 'Water and plaster quantities for mold-making',
  },
  {
    slug: 'kiln',
    label: 'Kiln',
    href: '/kiln',
    hint: 'Ceramic and glass firing records',
  },
  {
    slug: 'substack',
    // Lowercase on purpose — the scene label renders it verbatim.
    label: 'substack',
    href: 'https://substack.com/@gotrox',
    hint: 'Writing on Substack',
    external: true,
    // Reachable only via the tree region (2026-08-04).
    unlisted: true,
  },
  {
    slug: 'spotify',
    label: 'Spotify',
    href: '/spotify',
    hint: 'Connect Spotify for MCP integrations',
    unlisted: true,
  },
];
