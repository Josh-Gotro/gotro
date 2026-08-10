/**
 * Contact links revealed by the small circle on the home map.
 *
 * Substack and Medium were deliberately left off this list (Josh, 2026-08-04);
 * Substack lives on the tree region of the map instead.
 */

export interface Contact {
  label: string;
  href: string;
  /** Opens in a new tab. mailto: links don't need it. */
  external?: boolean;
}

export const contacts: Contact[] = [
  {
    label: 'email',
    href: 'mailto:joshuagauthreaux@gmail.com',
  },
  {
    label: 'github',
    href: 'https://github.com/Josh-Gotro',
    external: true,
  },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/josh-gauthreaux/',
    external: true,
  },
];
