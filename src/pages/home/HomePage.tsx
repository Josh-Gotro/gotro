import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { destinations } from '@/lib/destinations';
import './home.css';

/**
 * The map — a recreation of v1's abstract-geometric Art page, rebuilt on
 * modern CSS (v2-plan §4).
 *
 * Everything v1 did with useState + mouse handlers is CSS here:
 * - The big hover label is `:has()` setting a `--label` custom property.
 * - The tree turning pink was JS DOM manipulation in v1; now it's `:hover`.
 * - Regions are real links: keyboard-focusable, labeled, `:focus-visible`
 *   triggers the same reveals as hover.
 *
 * Region → destination mapping (v1 → v2):
 * - moon head      → /gallery (unchanged)
 * - large circle   → /plaster-calculator (unchanged)
 * - medium circle  → /kiln (unchanged)
 * - tree           → OPEN SLOT (was /portfolio, cut in v2)
 * - small circle   → OPEN SLOT (was a TODO in v1)
 * Open slots are decorative until assigned; hover shows '???'.
 */

const BRANCH_COUNT = 13;
const branches = Array.from({ length: BRANCH_COUNT }, (_, i) => i);

export default function HomePage() {
  const listed = destinations.filter((d) => !d.unlisted);

  return (
    <main className="scene">
      <h1 className="visually-hidden">joshgotro</h1>

      {/* Plain-text fallback nav: visually hidden, revealed on keyboard focus,
          so the art is never the only way in. */}
      <nav className="scene-nav" aria-label="Sections">
        <ul>
          {listed.map((d) => (
            <li key={d.slug}>
              <Link to={d.href}>{d.label}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="gold-band" aria-hidden="true" />

      <div className="figure" aria-hidden="false">
        <Link
          to="/gallery"
          className="region head moon-face to-gallery"
          aria-label="Gallery — sculpture and other art"
        />
        <div className="tree-container" aria-hidden="true">
          {/* Open slot: not a link until it has somewhere to go. */}
          <div className="tree slot">
            {branches.map((i) => (
              <span
                key={i}
                className="branch"
                style={{ '--i': i } as CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>

      <Link
        to="/plaster-calculator"
        className="region circle large-circle to-plaster"
        aria-label="Plaster calculator"
      />
      <Link
        to="/kiln"
        className="region circle medium-circle to-kiln"
        aria-label="Kiln — ceramic and glass firing records"
      />
      {/* Open slot: was a TODO in v1, keeps its place in the composition. */}
      <div className="circle small-circle slot" aria-hidden="true" />

      {/* Driven entirely by CSS :has() — see home.css. */}
      <div className="scene-label" aria-hidden="true" />
    </main>
  );
}
