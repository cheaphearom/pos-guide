// Copyright (c) 2026 Chea Phearom. All rights reserved.
// Proprietary and confidential: see the LICENSE file.
// Content packs: pages added once to every guide database (new or existing). Add a pack here to ship a new page.
import howTo from './how-to.js';
import setup from './setup.js';
import troubleshoot from './troubleshoot.js';
import faq from './faq.js';
import glossary from './glossary.js';
import releaseNotes from './release-notes.js';
import training from './training.js';
import quickReference from './quick-reference.js';

export const PACKS = [
  { key: 'how-to-v1', page: howTo },
  { key: 'setup-v1', page: setup },
  { key: 'troubleshoot-v1', page: troubleshoot },
  { key: 'faq-v1', page: faq },
  { key: 'glossary-v1', page: glossary },
  { key: 'release-notes-v1', page: releaseNotes },
  { key: 'training-v1', page: training },
  { key: 'quick-reference-v1', page: quickReference },
];
