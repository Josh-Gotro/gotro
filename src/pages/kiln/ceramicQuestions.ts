/** The ceramic firing wizard's steps, ported from v1 unchanged. */

export interface CeramicQuestion {
  key:
    | 'cone_type'
    | 'room_temp'
    | 'low_fire_start_time'
    | 'loading_notes'
    | 'medium_fire_start_time'
    | 'high_fire_start_time'
    | 'kiln_turn_off_time'
    | 'unloading_notes'
    | 'rating';
  text: string;
  type: 'select' | 'text' | 'time' | 'textarea';
  options?: readonly string[];
}

export const ceramicQuestions: readonly CeramicQuestion[] = [
  {
    key: 'cone_type',
    text: 'cone',
    type: 'select',
    options: ['020', '04', '05', '6', 'other'],
  },
  { key: 'room_temp', text: 'room temp (°F)', type: 'text' },
  { key: 'low_fire_start_time', text: 'low fire started', type: 'time' },
  { key: 'loading_notes', text: 'loading notes', type: 'textarea' },
  { key: 'medium_fire_start_time', text: 'medium fire started', type: 'time' },
  { key: 'high_fire_start_time', text: 'high fire started', type: 'time' },
  { key: 'kiln_turn_off_time', text: 'kiln turned off around', type: 'text' },
  { key: 'unloading_notes', text: 'unloading notes', type: 'textarea' },
  {
    key: 'rating',
    text: 'rate this firing',
    type: 'select',
    options: ['positive', 'neutral', 'negative'],
  },
];

/** 'HH:MM[:SS]' → 'h:MM AM/PM'; passes through anything unparseable. */
export function formatTime12h(value: string | null | undefined): string {
  if (!value) return '-';
  const match = /^(\d{1,2}):(\d{2})/.exec(value);
  if (!match) return value;
  const hours = Number(match[1]);
  const period = hours < 12 ? 'AM' : 'PM';
  return `${hours % 12 || 12}:${match[2]} ${period}`;
}

export function currentTimeHHMM(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes(),
  ).padStart(2, '0')}`;
}
