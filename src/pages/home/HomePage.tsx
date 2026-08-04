import { Link } from 'react-router';
import { destinations } from '@/lib/destinations';
import './home.css';

/**
 * The map. Placeholder rendering until the Phase 2 art direction is settled
 * (v2-plan §4) — but the contract is already real: destinations are data,
 * regions are true links, hover/focus behavior is CSS.
 */
export default function HomePage() {
  const listed = destinations.filter((d) => !d.unlisted);

  return (
    <main className="home">
      <h1 className="visually-hidden">joshgotro</h1>
      <nav aria-label="Site map">
        <ul className="home-map">
          {listed.map((d) => (
            <li key={d.slug} className="home-region" data-region={d.slug}>
              {d.external ? (
                <a href={d.href} rel="noopener noreferrer">
                  <span className="home-label">{d.label}</span>
                  <span className="home-hint">{d.hint}</span>
                </a>
              ) : (
                <Link to={d.href}>
                  <span className="home-label">{d.label}</span>
                  <span className="home-hint">{d.hint}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
