import { initializeDocuments } from './documents.js';
import { initializeResizers } from './resizer.js';
import { initializeZoneButtons } from './zone-buttons.js';
import { initializeZones } from './zones.js';

export const initializeTable = () => {
  initializeDocuments();
  initializeResizers();
  initializeZoneButtons();
  initializeZones();
};
