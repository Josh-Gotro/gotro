import { api } from '@/lib/api';

/**
 * gotrodb kiln endpoints — ceramic firings, glass firings, pro tables.
 *
 * Wire notes:
 * - `time` columns arrive as 'HH:MM:SS' strings, and several fields are
 *   nullable on in-progress records (v1's history crashed on those nulls).
 * - pro_table `rate_temp_hr_m_N` columns are int arrays:
 *   [ramp °F/hr, target °F, hold hours, hold minutes].
 */

// ---- ceramic ----

export interface CeramicFiring {
  id: number;
  cone_type: string | null;
  room_temp: string | null;
  low_fire_start_time: string | null;
  medium_fire_start_time: string | null;
  high_fire_start_time: string | null;
  kiln_turn_off_time: string | null;
  loading_notes: string | null;
  unloading_notes: string | null;
  rating: 'positive' | 'neutral' | 'negative' | null;
  firing_complete: boolean;
  created_at: string;
}

/** Answers accumulated by the wizard; id present once the record exists. */
export type CeramicDraft = Partial<Omit<CeramicFiring, 'id' | 'created_at'>> & {
  id?: number;
};

export function fetchCurrentCeramicFiring(): Promise<CeramicFiring | null> {
  // The endpoint 200s with an empty body when no firing is in progress;
  // react-query forbids undefined, so normalize to null.
  return api
    .get<CeramicFiring | undefined>('/current-ceramic-firing')
    .then((firing) => firing ?? null);
}

export function fetchCeramicFirings() {
  return api
    .get<CeramicFiring[]>('/ceramic-firings')
    .then((rows) =>
      rows.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    );
}

export function upsertCeramicFiring(draft: CeramicDraft) {
  return api.post<{ status: string; message: string; id: number }>(
    '/ceramic-firings',
    draft,
  );
}

// ---- glass ----

export const GLASS_TYPES = [
  'WINE',
  'BEER',
  'STAINED',
  '96COE',
  '90COE',
  'MIXED',
  'OTHER',
] as const;
export const AUTO_SPEEDS = ['SLo', 'MEd', 'FASt'] as const;
export const AUTO_PROCESSES = ['SLP', 'tAC', 'FULL'] as const;

export interface GlassRecord {
  id: number;
  mode: 'AUTO' | 'PRO';
  glass_type: (typeof GLASS_TYPES)[number] | null;
  glass_type_other: string | null;
  room_temp: string | null;
  loading_notes: string | null;
  unloading_notes: string | null;
  fire_time_hr: number | null;
  fire_time_m: number | null;
  auto_speed: (typeof AUTO_SPEEDS)[number] | null;
  auto_process: (typeof AUTO_PROCESSES)[number] | null;
  auto_mod_temp: string | null;
  auto_mod_hr: number | null;
  auto_mod_m: number | null;
  pro_table_id: number | null;
  created_at: string;
}

export type NewGlassRecord = Omit<Partial<GlassRecord>, 'id' | 'created_at'> & {
  mode: 'AUTO' | 'PRO';
};

export function fetchGlassRecords() {
  // Server orders by id DESC already.
  return api.get<GlassRecord[]>('/kiln-glass-records');
}

export function createGlassRecord(record: NewGlassRecord) {
  return api.post<GlassRecord>('/kiln-glass-records', record);
}

// ---- pro tables (firing schedules) ----

/** [ramp °F/hr, target °F, hold hours, hold minutes] */
export type ProSegment = [number, number, number, number];

export interface ProTable {
  id: number;
  name: string;
  slot: string | null;
  /** Stored as text upstream — '3', not 3. */
  segs: string | number;
  skip: string | null;
  add_time_hr: number | null;
  add_time_m: number | null;
  adjusted_temp: string | null;
  /** Segments arrive as Postgres array literals: the string '{300,1000,0,30}'. */
  rate_temp_hr_m_1: string | null;
  rate_temp_hr_m_2: string | null;
  rate_temp_hr_m_3: string | null;
  rate_temp_hr_m_4: string | null;
  rate_temp_hr_m_5: string | null;
  rate_temp_hr_m_6: string | null;
  rate_temp_hr_m_7: string | null;
  rate_temp_hr_m_8: string | null;
  created_at: string;
}

/** '{300,1000,0,30}' → [300, 1000, 0, 30] */
function parseSegment(literal: string | null): ProSegment {
  if (!literal) return [0, 0, 0, 0];
  const parts = literal
    .replace(/[{}]/g, '')
    .split(',')
    .map((n) => Number(n) || 0);
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0, parts[3] ?? 0];
}

export function proTableSegments(table: ProTable): ProSegment[] {
  return Array.from({ length: Number(table.segs) || 0 }, (_, i) =>
    parseSegment(
      table[`rate_temp_hr_m_${i + 1}` as keyof ProTable] as string | null,
    ),
  );
}

export function fetchProTables() {
  return api.get<ProTable[]>('/pro-table');
}
