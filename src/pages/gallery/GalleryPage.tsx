import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { works } from './works';
import './gallery.css';

/**
 * Gallery — "workshop to window". A dark-room filmstrip of the stained glass
 * work, ordered pattern → cut & foil → assembly → finished.
 *
 * CSS does the heavy lifting (v2-plan §4 spirit):
 * - scroll-snap filmstrip: native swipe on touch, wheel/keys on desktop
 * - animation-timeline: view() pulls the centered piece into focus
 * - a gold progress band (scroll() timeline) echoes the home page's band
 * - fullscreen viewer is a native [popover] — Esc, focus and light-dismiss
 *   for free — animated with @starting-style
 * - thumbnail rail fades at its edges via mask-image
 *
 * The one piece of JS: an IntersectionObserver that marks the current
 * thumbnail (aria-current) and keeps it scrolled into view. CSS can't track
 * scroll position across elements; this genuinely buys orientation.
 */

export default function GalleryPage() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const slides = [...strip.querySelectorAll('[data-index]')];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setCurrent(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { root: strip, threshold: 0.6 },
    );
    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document
      .querySelector(`[data-thumb="${current}"]`)
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [current]);

  return (
    <main className="gallery-room">
      {/* Scroll progress — the home page's gold band, repurposed. */}
      <div className="gallery-progress" aria-hidden="true" />

      <header className="gallery-header">
        <Link to="/" className="gallery-moon" aria-label="Back to the map" />
        <h1>gallery</h1>
        <p>stained glass: pattern, foil, solder, light</p>
      </header>

      <div
        className="strip"
        ref={stripRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Stained glass works"
        tabIndex={0}
      >
        {works.map((w, i) => (
          <figure
            key={w.slug}
            id={w.slug}
            className="work"
            data-index={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${works.length}`}
          >
            <button
              className="work-open"
              popoverTarget={`view-${w.slug}`}
              aria-label={`View ${w.title} full screen`}
            >
              <img
                src={w.src}
                alt={w.alt}
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            </button>
            <figcaption>
              <span className="work-count">
                {String(i + 1).padStart(2, '0')} / {works.length}
              </span>
              <span className="work-title">{w.title}</span>
              <span className="work-phase">{w.phase}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <nav className="rail" aria-label="Jump to a work">
        {works.map((w, i) => (
          <a
            key={w.slug}
            href={`#${w.slug}`}
            data-thumb={i}
            aria-current={i === current ? 'true' : undefined}
            aria-label={`${w.title} (${i + 1} of ${works.length})`}
          >
            <img src={w.src} alt="" loading="lazy" decoding="async" />
          </a>
        ))}
      </nav>

      {/* Fullscreen viewers — native popovers, one per work. */}
      {works.map((w) => (
        <div key={w.slug} id={`view-${w.slug}`} className="viewer" popover="">
          <img src={w.src} alt={w.alt} loading="lazy" decoding="async" />
          <p>
            {w.title} · {w.phase}
          </p>
          <button
            popoverTarget={`view-${w.slug}`}
            popoverTargetAction="hide"
            className="viewer-close"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      ))}
    </main>
  );
}
