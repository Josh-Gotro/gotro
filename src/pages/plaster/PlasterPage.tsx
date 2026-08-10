import { useState } from 'react';
import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ToolQueryProvider } from '@/lib/queryClient';
import { calcPlaster, isValidDimension } from './plasterMath';
import { fetchPlasterHistory, savePlasterCalculation } from './plasterApi';
import './plaster.css';

/**
 * Plaster calculator — "the plaster room". Bone-white counterpart to the
 * gallery's dark room; same Helvetica/gold/red family as the map.
 *
 * v1 posted to the server just to display a result. Here the math runs live
 * on every keystroke (it's three multiplications — no server needed) and
 * saving to history is an explicit, separate act.
 *
 * The mold visual is a CSS 3D box driven by custom properties; its
 * proportions track the inputs. No canvas, no SVG, no animation library.
 */

const TIMING = [
  { label: 'add plaster', minutes: 1 },
  { label: 'soak', minutes: 3 },
  { label: 'mix', minutes: 3 },
  { label: 'liquid', minutes: 3 },
  { label: 'thixotropic', minutes: 2 },
  { label: 'plastic', minutes: 3 },
] as const;

const STATES = [
  ['liquid', 'flows like heavy cream'],
  ['thixotropic', 'stands on its own, returns to liquid when shaken'],
  ['plastic', 'can be modeled like clay'],
] as const;

/** USG No. 1 pottery plaster, 70:100 and 66:100 consistencies. */
const RATIOS = [
  [0.5, 1.4, 1.5, 40],
  [1, 2.85, 3, 80],
  [2, 5.7, 6, 160],
  [3, 8.55, 9, 240],
  [4, 11.4, 12, 320],
  [5, 14.25, 15, 400],
  [6, 17.1, 18, 480],
  [7, 19.95, 21, 560],
  [8, 22.8, 24, 640],
  [9, 25.65, 27, 720],
  [10, 28.5, 30, 800],
] as const;

function PlasterCalculator() {
  const [fields, setFields] = useState({ length: '', width: '', height: '' });
  const queryClient = useQueryClient();

  const dims = {
    length: parseFloat(fields.length),
    width: parseFloat(fields.width),
    height: parseFloat(fields.height),
  };
  const valid =
    isValidDimension(dims.length) &&
    isValidDimension(dims.width) &&
    isValidDimension(dims.height);
  const result = valid ? calcPlaster(dims) : null;

  const history = useQuery({
    queryKey: ['plaster-history'],
    queryFn: () => fetchPlasterHistory(),
  });

  const save = useMutation({
    mutationFn: savePlasterCalculation,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['plaster-history'] }),
  });

  const set = (key: keyof typeof fields) => (value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    save.reset(); // new dimensions, new save state
  };

  const handleSave = () => {
    if (!result) return;
    save.mutate({
      length: dims.length,
      width: dims.width,
      height: dims.height,
      volume: result.volume,
      water: result.waterOz,
      plaster_lbs: result.plasterPounds,
      plaster_oz: result.plasterOunces,
    });
  };

  // Mold proportions, normalized so the longest edge is constant.
  const maxDim = valid ? Math.max(dims.length, dims.width, dims.height) : 1;
  const moldStyle = {
    '--l': valid ? dims.length / maxDim : 1,
    '--w': valid ? dims.width / maxDim : 0.75,
    '--h': valid ? dims.height / maxDim : 0.6,
  } as CSSProperties;

  return (
    <main className="plaster-room">
      <header className="plaster-header">
        <Link to="/" className="plaster-moon" aria-label="Back to the map" />
        <h1>plaster</h1>
        <p>measurements and timing</p>
      </header>

      <section className="bench" aria-label="Calculator">
        <div className="mold-stage" aria-hidden="true">
          <div className="mold" style={moldStyle}>
            <div className="face front" />
            <div className="face back" />
            <div className="face left" />
            <div className="face right" />
            <div className="face top" />
            <div className="face bottom" />
          </div>
        </div>

        <form className="dims" onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend className="visually-hidden">
              Mold dimensions in inches
            </legend>
            {(['length', 'width', 'height'] as const).map((key, i) => (
              <label key={key} className="dim-field">
                <span className="dim-name">{key[0]}</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0.1"
                  max="1000"
                  step="any"
                  placeholder="0"
                  value={fields[key]}
                  onChange={(e) => set(key)(e.target.value)}
                  // Scrolling the page over a focused number input silently
                  // changes its value; drop focus instead.
                  onWheel={(e) => e.currentTarget.blur()}
                  aria-label={`${key} in inches`}
                />
                {i < 2 && <span className="dim-times">×</span>}
              </label>
            ))}
            <span className="dim-unit">inches</span>
          </fieldset>
        </form>

        <output className="results" aria-live="polite">
          {result ? (
            <>
              <div className="stat">
                <span className="stat-value">{result.volume.toFixed(1)}</span>
                <span className="stat-label">cu in, incl. 7.5% extra</span>
              </div>
              <div className="stat">
                <span className="stat-value">{result.waterOz.toFixed(1)}</span>
                <span className="stat-label">
                  oz water by weight ({result.waterQuarts.toFixed(2)} qt)
                </span>
              </div>
              <div className="stat">
                <span className="stat-value">
                  {result.plasterPounds}
                  <small> lb </small>
                  {result.plasterOunces.toFixed(1)}
                  <small> oz</small>
                </span>
                <span className="stat-label">plaster, USG №1 pottery</span>
              </div>
            </>
          ) : (
            <p className="results-empty">
              enter the mold&rsquo;s inside dimensions
            </p>
          )}
        </output>

        <div className="save-row">
          <button
            type="button"
            className="save"
            disabled={!result || save.isPending || save.isSuccess}
            onClick={handleSave}
          >
            {save.isPending
              ? 'saving…'
              : save.isSuccess
                ? 'saved'
                : 'save to history'}
          </button>
          {save.isError && (
            <p className="save-note" role="status">
              couldn&rsquo;t save, but the numbers above are still good
            </p>
          )}
        </div>
      </section>

      <section className="reference" aria-label="Reference">
        {/* name groups the panels into a native exclusive accordion */}
        <details name="plaster-ref">
          <summary>timing</summary>
          <div
            className="timing-bar"
            style={
              {
                gridTemplateColumns: TIMING.map((t) => `${t.minutes}fr`).join(
                  ' ',
                ),
              } as CSSProperties
            }
          >
            {TIMING.map((t, i) => (
              <div
                key={t.label}
                className="timing-seg"
                style={{ '--seg': i } as CSSProperties}
              >
                <span className="timing-label">{t.label}</span>
                <span className="timing-minutes">{t.minutes}m</span>
              </div>
            ))}
          </div>
          <p className="timing-total">≈ 15 minutes, water to plastic</p>
          <dl className="states">
            {STATES.map(([name, description]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </details>

        <details name="plaster-ref">
          <summary>common mix ratios</summary>
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>water (qt)</th>
                  <th>plaster lb (70)</th>
                  <th>plaster lb (66)</th>
                  <th>volume (cu in)</th>
                </tr>
              </thead>
              <tbody>
                {RATIOS.map(([qt, p70, p66, vol]) => (
                  <tr key={qt}>
                    <td>{qt}</td>
                    <td>{p70.toFixed(2)}</td>
                    <td>{p66}</td>
                    <td>{vol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>

        <details name="plaster-ref">
          <summary>the formula</summary>
          <ol className="formula">
            <li>
              <var>V</var> = L × W × H × <b>1.075</b>
              <span>7.5% extra for spills and leaks</span>
            </li>
            <li>
              water (qt) = <var>V</var> ÷ <b>80</b>
              <span>one quart of water yields 80 cu in of set mix</span>
            </li>
            <li>
              plaster (lb) = qt × <b>2.85</b>
              <span>USG №1 pottery plaster at 70:100 consistency</span>
            </li>
            <li>
              water (oz wt) = qt × 32 × <b>1.043</b>
              <span>a fluid ounce of 70 °F water weighs 1.043 oz</span>
            </li>
          </ol>
        </details>
      </section>

      <section className="history" aria-label="Recent calculations">
        <h2>recent</h2>
        {history.isPending && <p className="history-note">loading…</p>}
        {history.isError && (
          <p className="history-note">history unavailable, backend offline</p>
        )}
        {history.data && history.data.length === 0 && (
          <p className="history-note">nothing saved yet</p>
        )}
        {history.data && history.data.length > 0 && (
          <div className="history-grid">
            {history.data.map((r) => (
              <details key={r.id} name="plaster-history">
                <summary>
                  {r.length} × {r.width} × {r.height}
                </summary>
                <dl>
                  <div>
                    <dt>volume</dt>
                    <dd>{r.volume.toFixed(1)} cu in</dd>
                  </div>
                  <div>
                    <dt>water</dt>
                    <dd>{r.water.toFixed(1)} oz</dd>
                  </div>
                  <div>
                    <dt>plaster</dt>
                    <dd>
                      {r.plasterLbs} lb {r.plasterOz.toFixed(1)} oz
                    </dd>
                  </div>
                </dl>
              </details>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default function PlasterPage() {
  return (
    <ToolQueryProvider>
      <PlasterCalculator />
    </ToolQueryProvider>
  );
}
