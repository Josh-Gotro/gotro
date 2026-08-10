import { Link } from 'react-router';
import { ToolQueryProvider } from '@/lib/queryClient';
import CeramicLog from './CeramicLog';
import GlassLog from './GlassLog';
import './kiln.css';

/**
 * Kiln — "the kiln room". Charcoal dark with an ember glow; the ceramic and
 * glass logs live behind a CSS-only tab switch (radio inputs + :has(), no
 * state, no handlers — see kiln.css).
 */
export default function KilnPage() {
  return (
    <ToolQueryProvider>
      <main className="kiln-room">
        <header className="kiln-header">
          <Link to="/" className="kiln-moon" aria-label="Back to the map" />
          <h1>kiln</h1>
          <p>ceramic + glass firing log</p>
        </header>

        <fieldset className="kiln-tabs">
          <legend className="visually-hidden">Which kiln log</legend>
          <input type="radio" name="kiln-tab" id="tab-ceramic" defaultChecked />
          <label htmlFor="tab-ceramic">ceramic</label>
          <input type="radio" name="kiln-tab" id="tab-glass" />
          <label htmlFor="tab-glass">glass</label>
        </fieldset>

        <section className="kiln-panel panel-ceramic" aria-label="Ceramic log">
          <CeramicLog />
        </section>
        <section className="kiln-panel panel-glass" aria-label="Glass log">
          <GlassLog />
        </section>

        <div className="ember" aria-hidden="true" />
      </main>
    </ToolQueryProvider>
  );
}
