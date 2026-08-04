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
  /** Hidden from the map but still routable (OAuth pages, easter eggs). */
  unlisted?: boolean;
}

export const destinations: Destination[] = [
  {
    slug: 'gallery',
    label: 'Gallery',
    href: '/gallery',
    hint: 'Sculpture and other art',
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
    slug: 'spotify',
    label: 'Spotify',
    href: '/spotify',
    hint: 'Connect Spotify for MCP integrations',
    unlisted: true,
  },
];
