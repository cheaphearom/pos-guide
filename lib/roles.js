// Who can do what on the guide website. The server checks these on every request.
export const ROLES = {
  qa: 'QA',
  developer: 'Developer',
  manager: 'Manager',
  owner: 'Owner',
};

const RULES = {
  view: ['qa', 'developer', 'manager', 'owner'], // log in and read every page
  edit: ['owner'], // the admin portal: pages, blocks and cards
  users: ['owner'], // add people, set their role, reset passwords, remove them
};

export const can = (role, action) => !!RULES[action]?.includes(role);
export const permissions = (role) => Object.keys(RULES).filter((a) => can(role, a));
export const isRole = (r) => Object.hasOwn(ROLES, r);
