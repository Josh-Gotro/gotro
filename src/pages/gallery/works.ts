/**
 * The gallery's works, in narrative order: pattern → cut & foil → assembly →
 * finished glass in the light. Adding a piece = add an import + an entry.
 *
 * lion.webp from v1 was deliberately dropped — it was the loading-spinner
 * illustration that v1's import.meta.glob accidentally swept into the gallery.
 */

import agave1 from '@/assets/gallery/agave1.webp';
import agave2 from '@/assets/gallery/agave2.webp';
import agave3 from '@/assets/gallery/agave3.webp';
import bear1 from '@/assets/gallery/bear1.webp';
import cacti1 from '@/assets/gallery/cacti1.webp';
import cacti2 from '@/assets/gallery/cacti2.webp';
import cactus1 from '@/assets/gallery/cactus1.webp';
import cactus2 from '@/assets/gallery/cactus2.webp';
import cactus3 from '@/assets/gallery/cactus3.webp';
import cactusprototype from '@/assets/gallery/cactusprototype.webp';
import chess1 from '@/assets/gallery/chess1.webp';
import chess2 from '@/assets/gallery/chess2.webp';
import chess3 from '@/assets/gallery/chess3.webp';

export interface Work {
  slug: string;
  src: string;
  title: string;
  /** Where the piece sits in the process, shown under the title. */
  phase: 'pattern' | 'cut & foil' | 'assembly' | 'finished';
  alt: string;
}

export const works: Work[] = [
  {
    slug: 'bear-pattern',
    src: bear1,
    title: 'Bear',
    phase: 'pattern',
    alt: 'Hand-drawn stained glass pattern of a bear, each segment numbered in marker.',
  },
  {
    slug: 'chess-layout',
    src: chess1,
    title: 'Chess board',
    phase: 'cut & foil',
    alt: 'Numbered stained glass squares for a chess board laid out on a workbench, held by nails.',
  },
  {
    slug: 'agave-foil',
    src: cactus1,
    title: 'Agave leaves',
    phase: 'cut & foil',
    alt: 'Copper-foiled green glass leaves and two red flower blossoms arranged on a blue cutting mat.',
  },
  {
    slug: 'leaf-stacks',
    src: cacti2,
    title: 'Leaf sets',
    phase: 'cut & foil',
    alt: 'Three stacks of copper-foiled green glass leaf segments on a black desk beside a craft knife.',
  },
  {
    slug: 'chess-fitting',
    src: chess2,
    title: 'Chess board',
    phase: 'assembly',
    alt: 'Stained glass chess board squares fitted together on the bench, pinned square by nails.',
  },
  {
    slug: 'chess-border',
    src: chess3,
    title: 'Chess board',
    phase: 'assembly',
    alt: 'Chess board tray taking shape: soldered border walls rising around the patchwork glass field.',
  },
  {
    slug: 'cactus-prototype',
    src: cactusprototype,
    title: 'Cactus study',
    phase: 'pattern',
    alt: 'Wire-frame cactus prototype in a white planter on a windowsill, next to a blue glass vase.',
  },
  {
    slug: 'three-cacti',
    src: cacti1,
    title: 'Three cacti',
    phase: 'finished',
    alt: 'Three stained glass cacti with wire spines in concrete and ceramic pots on the workshop bench.',
  },
  {
    slug: 'cactus-bloom',
    src: cactus2,
    title: 'Blooming cactus',
    phase: 'finished',
    alt: 'Green stained glass cactus with a red glass bloom, potted in a white planter by a window.',
  },
  {
    slug: 'bloom-overhead',
    src: cactus3,
    title: 'Bloom, overhead',
    phase: 'finished',
    alt: 'Looking down on a stained glass cactus flower with red, orange and pink petals.',
  },
  {
    slug: 'agave-crown',
    src: agave1,
    title: 'Agave crown',
    phase: 'finished',
    alt: 'Classical bust planter wearing a crown of green and yellow stained glass agave leaves, backlit by the sun.',
  },
  {
    slug: 'agave-window',
    src: agave2,
    title: 'Agave crown',
    phase: 'finished',
    alt: 'The bust planter on a table in front of a bright window, glass agave leaves glowing green.',
  },
  {
    slug: 'agave-close',
    src: agave3,
    title: 'Agave crown',
    phase: 'finished',
    alt: 'Close view of the bust planter, stained glass agave leaves catching warm afternoon light.',
  },
];
