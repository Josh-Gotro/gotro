import { api } from '@/lib/api';

/**
 * gotrodb plaster endpoints. Postgres `numeric` columns arrive as strings, so
 * rows get parsed to numbers at the boundary (v1 did the same in its hook).
 */

interface PlasterRowWire {
  id: number;
  length: string;
  width: string;
  height: string;
  volume: string;
  water: string;
  plaster_lbs: string;
  plaster_oz: string;
}

export interface PlasterRecord {
  id: number;
  length: number;
  width: number;
  height: number;
  volume: number;
  water: number;
  plasterLbs: number;
  plasterOz: number;
}

function parseRow(row: PlasterRowWire): PlasterRecord {
  return {
    id: row.id,
    length: parseFloat(row.length),
    width: parseFloat(row.width),
    height: parseFloat(row.height),
    volume: parseFloat(row.volume),
    water: parseFloat(row.water),
    plasterLbs: parseFloat(row.plaster_lbs),
    plasterOz: parseFloat(row.plaster_oz),
  };
}

/** Most recent first, capped like v1's "recently viewed" list. */
export async function fetchPlasterHistory(limit = 6): Promise<PlasterRecord[]> {
  const rows = await api.get<PlasterRowWire[]>('/plaster-calculations');
  return rows.map(parseRow).reverse().slice(0, limit);
}

export interface SavePlasterInput {
  length: number;
  width: number;
  height: number;
  volume: number;
  water: number;
  plaster_lbs: number;
  plaster_oz: number;
}

export async function savePlasterCalculation(input: SavePlasterInput) {
  // Note: the v1 backend crashes (500) on duplicate dimensions — its 23505
  // handler references out-of-scope variables. Callers treat any failure as
  // "not saved" and keep the locally computed result on screen.
  return api.post<PlasterRowWire>('/plaster-calculation', input);
}
