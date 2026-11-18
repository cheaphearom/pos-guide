// Who can do what in the guide portal. Change the lists here to change the rules (the server checks them on every request).
export const ROLES = {
  user: 'Simple User',
  qa: 'QA',
  developer: 'Developer',
  manager: 'Manager',
  owner: 'Owner',
};

const RULES = {
  view: ['user', 'qa', 'developer', 'manager', 'owner'], // log in, see everything (also hidden drafts)
  'cards.edit': ['qa', 'developer', 'manager', 'owner'], // change a card's title, text, tag and page address
  'cards.manage': ['developer', 'manager', 'owner'], // add, move, hide, move to another section, delete cards
  sections: ['developer', 'manager', 'owner'], // add, edit, move, hide, delete sections
  users: ['manager', 'owner'], // add users, change their role or password, remove them
  owners: ['owner'], // add, change or remove Owners, or give the Owner role
};

export const can = (role, action) => !!RULES[action]?.includes(role);
export const permissions = (role) => Object.keys(RULES).filter((a) => can(role, a));
export const isRole = (r) => Object.hasOwn(ROLES, r);
