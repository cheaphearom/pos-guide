// Content packs: pages added once to every guide database (new or existing). Add a pack here to ship a new page.
import howTo from './how-to.js';
import setup from './setup.js';
import troubleshoot from './troubleshoot.js';

export const PACKS = [
  { key: 'how-to-v1', page: howTo },
  { key: 'setup-v1', page: setup },
  { key: 'troubleshoot-v1', page: troubleshoot },
];
