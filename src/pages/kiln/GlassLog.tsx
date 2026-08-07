import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AUTO_PROCESSES,
  AUTO_SPEEDS,
  createGlassRecord,
  fetchGlassRecords,
  fetchProTables,
  GLASS_TYPES,
  proTableSegments,
} from './kilnApi';
import type { NewGlassRecord, ProTable } from './kilnApi';

/**
 * Glass firing log — v1's react-hook-form form, carried over with its bugs
 * fixed rather than ported:
 * - schedule preview matched name against id, so it never rendered
 * - the "other" field only appeared for MIXED (precedence bug), not OTHER
 * - '-' placeholder options posted the literal string 'none', which the
 *   backend's enum validators reject
 * - FASt speed existed in the backend but not in the UI
 */

interface GlassFormValues {
  mode: 'PRO' | 'AUTO';
  pro_table_id: string;
  auto_speed: string;
  auto_process: string;
  auto_mod_temp: string;
  auto_mod_hr: string;
  auto_mod_m: string;
  room_temp: string;
  glass_type: string;
  glass_type_other: string;
  loading_notes: string;
  unloading_notes: string;
  fire_time_hr: string;
  fire_time_m: string;
}

const EMPTY: GlassFormValues = {
  mode: 'PRO',
  pro_table_id: '',
  auto_speed: '',
  auto_process: '',
  auto_mod_temp: '',
  auto_mod_hr: '',
  auto_mod_m: '',
  room_temp: '',
  glass_type: 'STAINED',
  glass_type_other: '',
  loading_notes: '',
  unloading_notes: '',
  fire_time_hr: '',
  fire_time_m: '',
};

function toRecord(values: GlassFormValues): NewGlassRecord {
  const num = (s: string) => (s.trim() === '' ? undefined : Number(s));
  const str = (s: string) => (s.trim() === '' ? undefined : s.trim());
  const isPro = values.mode === 'PRO';

  return {
    mode: values.mode,
    room_temp: num(values.room_temp) as never,
    glass_type: str(values.glass_type) as never,
    glass_type_other:
      values.glass_type === 'OTHER' || values.glass_type === 'MIXED'
        ? (str(values.glass_type_other) as never)
        : undefined,
    loading_notes: str(values.loading_notes),
    unloading_notes: str(values.unloading_notes),
    fire_time_hr: num(values.fire_time_hr),
    fire_time_m: num(values.fire_time_m),
    pro_table_id: isPro ? num(values.pro_table_id) : undefined,
    auto_speed: isPro ? undefined : (str(values.auto_speed) as never),
    auto_process: isPro ? undefined : (str(values.auto_process) as never),
    auto_mod_temp: isPro ? undefined : (num(values.auto_mod_temp) as never),
    auto_mod_hr: isPro ? undefined : num(values.auto_mod_hr),
    auto_mod_m: isPro ? undefined : num(values.auto_mod_m),
  };
}

export default function GlassLog() {
  const queryClient = useQueryClient();
  const proTables = useQuery({
    queryKey: ['pro-tables'],
    queryFn: fetchProTables,
  });
  const records = useQuery({
    queryKey: ['glass-records'],
    queryFn: fetchGlassRecords,
  });

  const { register, handleSubmit, watch, reset } = useForm<GlassFormValues>({
    defaultValues: EMPTY,
  });

  const save = useMutation({
    mutationFn: createGlassRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['glass-records'] });
      reset(EMPTY);
    },
  });

  const mode = watch('mode');
  const glassType = watch('glass_type');
  const proTableId = Number(watch('pro_table_id'));
  const selectedSchedule =
    proTables.data?.find((t) => t.id === proTableId) ?? null;

  return (
    <div className="glass-log">
      <section aria-label="Record a glass firing">
        <h3>record a firing</h3>
        <form
          className="glass-form"
          onSubmit={handleSubmit((values) => save.mutate(toRecord(values)))}
        >
          <fieldset className="mode-toggle">
            <legend className="visually-hidden">Mode</legend>
            <label>
              <input type="radio" value="PRO" {...register('mode')} />
              <span>pro</span>
            </label>
            <label>
              <input type="radio" value="AUTO" {...register('mode')} />
              <span>auto</span>
            </label>
          </fieldset>

          {mode === 'PRO' && (
            <>
              <label className="field">
                <span>firing schedule</span>
                <select {...register('pro_table_id')}>
                  <option value="">choose…</option>
                  {proTables.data?.map((table) => (
                    <option key={table.id} value={table.id}>
                      {table.name}
                    </option>
                  ))}
                </select>
              </label>
              {proTables.isError && (
                <p className="kiln-note">schedules unavailable</p>
              )}
              {selectedSchedule && <ScheduleTable table={selectedSchedule} />}
            </>
          )}

          {mode === 'AUTO' && (
            <div className="field-row">
              <label className="field">
                <span>speed</span>
                <select {...register('auto_speed')}>
                  <option value="">-</option>
                  {AUTO_SPEEDS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>process</span>
                <select {...register('auto_process')}>
                  <option value="">-</option>
                  {AUTO_PROCESSES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>adjust temp (°F)</span>
                <input
                  type="number"
                  inputMode="numeric"
                  {...register('auto_mod_temp')}
                />
              </label>
              <label className="field">
                <span>adjust time</span>
                <span className="hm-pair">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    placeholder="hh"
                    {...register('auto_mod_hr')}
                  />
                  <input
                    type="number"
                    min="0"
                    max="59"
                    placeholder="mm"
                    {...register('auto_mod_m')}
                  />
                </span>
              </label>
            </div>
          )}

          <div className="field-row">
            <label className="field">
              <span>room temp (°F)</span>
              <input
                type="number"
                inputMode="numeric"
                {...register('room_temp')}
              />
            </label>
            <label className="field">
              <span>glass type</span>
              <select {...register('glass_type')}>
                {GLASS_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            {(glassType === 'OTHER' || glassType === 'MIXED') && (
              <label className="field">
                <span>which glass?</span>
                <input type="text" {...register('glass_type_other')} />
              </label>
            )}
            <label className="field">
              <span>total fire time</span>
              <span className="hm-pair">
                <input
                  type="number"
                  min="0"
                  max="23"
                  placeholder="hh"
                  {...register('fire_time_hr')}
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="mm"
                  {...register('fire_time_m')}
                />
              </span>
            </label>
          </div>

          <label className="field">
            <span>loading notes</span>
            <textarea rows={2} {...register('loading_notes')} />
          </label>
          <label className="field">
            <span>unloading notes</span>
            <textarea rows={2} {...register('unloading_notes')} />
          </label>

          <button
            type="submit"
            className="kiln-button kiln-button-fill"
            disabled={save.isPending}
          >
            {save.isPending ? 'saving…' : 'log firing'}
          </button>
          {save.isSuccess && (
            <p className="kiln-note" role="status">
              logged
            </p>
          )}
          {save.isError && (
            <p className="kiln-note" role="status">
              couldn&rsquo;t save, is the backend up?
            </p>
          )}
        </form>
      </section>

      <section className="kiln-history" aria-label="Past glass firings">
        <h3>past firings</h3>
        {records.isPending && <p className="kiln-note">loading…</p>}
        {records.isError && <p className="kiln-note">history unavailable</p>}
        {records.data?.length === 0 && (
          <p className="kiln-note">nothing logged yet</p>
        )}
        {records.data?.map((record) => {
          const schedule = proTables.data?.find(
            (t) => t.id === record.pro_table_id,
          );
          return (
            <details
              key={record.id}
              className="firing-card"
              name="glass-history"
            >
              <summary>
                <span>
                  {new Date(record.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
                <span className="firing-cone">
                  {record.glass_type?.toLowerCase() ?? 'glass'} ·{' '}
                  {record.mode === 'PRO' ? (schedule?.name ?? 'pro') : 'auto'}
                </span>
              </summary>
              <dl>
                {record.glass_type_other && (
                  <div>
                    <dt>glass</dt>
                    <dd>{record.glass_type_other}</dd>
                  </div>
                )}
                <div>
                  <dt>room temp</dt>
                  <dd>{record.room_temp ?? '-'}</dd>
                </div>
                {record.mode === 'AUTO' && (
                  <div>
                    <dt>auto</dt>
                    <dd>
                      {[record.auto_speed, record.auto_process]
                        .filter(Boolean)
                        .join(' · ') || '-'}
                    </dd>
                  </div>
                )}
                {(record.fire_time_hr != null ||
                  record.fire_time_m != null) && (
                  <div>
                    <dt>fire time</dt>
                    <dd>
                      {record.fire_time_hr ?? 0}h {record.fire_time_m ?? 0}m
                    </dd>
                  </div>
                )}
                {record.loading_notes && (
                  <div>
                    <dt>loading</dt>
                    <dd>{record.loading_notes}</dd>
                  </div>
                )}
                {record.unloading_notes && (
                  <div>
                    <dt>unloading</dt>
                    <dd>{record.unloading_notes}</dd>
                  </div>
                )}
              </dl>
            </details>
          );
        })}
      </section>
    </div>
  );
}

/** A pro table's segments, each row tinted by how far up the ramp it sits. */
function ScheduleTable({ table }: { table: ProTable }) {
  const segments = proTableSegments(table);
  return (
    <div className="schedule">
      <p className="schedule-meta">
        {table.name}
        {table.slot ? ` · slot ${table.slot}` : ''}
        {table.skip ? ` · skip ${table.skip}` : ''}
      </p>
      <table>
        <thead>
          <tr>
            <th>seg</th>
            <th>ramp °F/hr</th>
            <th>temp °F</th>
            <th>hold</th>
          </tr>
        </thead>
        <tbody>
          {segments.map(([ramp, temp, holdHr, holdMin], i) => (
            <tr
              key={i}
              style={
                { '--heat': i / Math.max(segments.length - 1, 1) } as never
              }
            >
              <td>{i + 1}</td>
              <td>{ramp || '-'}</td>
              <td>{temp || '-'}</td>
              <td>
                {holdHr || holdMin
                  ? `${holdHr ? `${holdHr}h ` : ''}${holdMin ? `${holdMin}m` : ''}`.trim()
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
