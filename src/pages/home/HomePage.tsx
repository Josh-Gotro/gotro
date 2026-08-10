import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { contacts } from '@/lib/contacts';
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
 * - moon head      → /gallery (unchanged; sole path to the gallery)
 * - large circle   → /plaster-calculator (unchanged)
 * - medium circle  → /kiln (unchanged)
 * - tree           → Substack, external (was /portfolio, cut in v2)
 * - small circle   → CONTACT (was a TODO in v1)
 *
 * Contact is a CSS-only `:target` toggle — no JS, no state. Two stacked
 * anchors sit over the circle: the "open" one points at #contact, the
 * "close" one points at a non-existent fragment. `:has()` swaps which is
 * clickable, so the circle stays visible and toggles on repeat clicks.
 */

const BRANCH_COUNT = 13;
const branches = Array.from({ length: BRANCH_COUNT }, (_, i) => i);

export default function HomePage() {
  const listed = destinations.filter((d) => !d.unlisted);
  const substack = destinations.find((d) => d.slug === 'substack')!;
  const pathfinder = destinations.find((d) => d.slug === 'pathfinder')!;

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

      {/* Topo mountain → Pathfinder. In the DOM before the gold band so its
          base paints behind it and the band reads as a horizon. The hiker dot
          rests on the summit and walks the ridge on hover; all CSS. */}
      <a
        href={pathfinder.href}
        target="_blank"
        rel="noopener noreferrer"
        className="region mountain to-pathfinder"
        aria-label="Pathfinder: trail guide for Juneau, Alaska"
      >
        <span className="mountain-body" />
        <span className="hiker" />
      </a>

      <div className="gold-band" aria-hidden="true" />

      <div className="figure" aria-hidden="false">
        <Link
          to="/gallery"
          className="region head moon-face to-gallery"
          aria-label="Gallery: sculpture and other art"
        />
        <div className="tree-container">
          <a
            href={substack.href}
            target="_blank"
            rel="noopener noreferrer"
            className="region tree to-substack"
            aria-label="substack: writing on Substack"
          >
            {branches.map((i) => (
              <span
                key={i}
                className="branch"
                style={{ '--i': i } as CSSProperties}
              />
            ))}
          </a>
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
        aria-label="Kiln: ceramic and glass firing records"
      />
      {/* Contact toggle. The circle is the visual; the two anchors stacked on
          top of it swap roles via :has() so it reads as one toggling circle. */}
      <div className="circle small-circle" aria-hidden="true" />
      <a
        href="#contact"
        className="region contact-toggle open"
        aria-label="Contact"
      />
      <a
        href="#contact-closed"
        className="region contact-toggle close"
        aria-label="Close contact details"
      />

      {/* Driven entirely by CSS :has() — see home.css. */}
      <div className="scene-label" aria-hidden="true" />

      <aside id="contact" className="contact" aria-label="Contact details">
        <div className="contact-veil" aria-hidden="true" />
        <div className="contact-body">
          <h2>contact</h2>
          <ul>
            {contacts.map((c, i) => (
              <li key={c.label} style={{ '--i': i } as CSSProperties}>
                <a
                  href={c.href}
                  {...(c.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </main>
  );
}
