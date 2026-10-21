export type UserGroup = 'investor' | 'auditor' | 'fund-manager';

export interface User {
  name: string;
  group: UserGroup;
}

export const USER_GROUPS: readonly UserGroup[] = [
  'investor',
  'auditor',
  'fund-manager',
];

export const USER_GROUP_LABELS: Readonly<Record<UserGroup, string>> = {
  investor: 'Investor',
  auditor: 'Auditor',
  'fund-manager': 'Fund manager',
};
