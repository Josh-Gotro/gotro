export const questions = [
  {
    id: 1,
    text: 'Select Cone',
    options: ['020', '04', '05', '6', 'other'],
    type: 'select',
    key: 'cone_type',
  },
  {
    id: 2,
    text: 'What is the room temp?',
    type: 'text',
    key: 'room_temp',
  },
  {
    id: 3,
    text: 'What time did you start the kiln?',
    type: 'time',
    key: 'low_fire_start_time',
  },
  {
    id: 4,
    text: 'Loading Notes?',
    type: 'textarea',
    key: 'loading_notes',
  },
  {
    id: 76,
    text: 'About what time did the kiln turn off?',
    type: 'text',
    key: 'kiln_turn_off_time',
  },
  {
    id: 8,
    text: 'Unloading Notes?',
    type: 'textarea',
    key: 'unloading_notes',
  },
  {
    id: 9,
    text: 'Rate this firing',
    type: 'select',
    key: 'rating',
    options: ['positive', 'neutral', 'negative'],
  },
];
