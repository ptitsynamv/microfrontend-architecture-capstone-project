import { UserGroup } from './auth/user';

/** An instrument is one tool of the platform, delivered by its own micro frontend. */
export interface Instrument {
  /** Route path in the shell, e.g. `/portfolio`. */
  path: string;
  /** Remote name: the key in `federation.manifest.json`. */
  remote: string;
  label: string;
  description: string;
  /** User groups the instrument is meant for. */
  groups: readonly UserGroup[];
}

export const INSTRUMENTS: readonly Instrument[] = [
  {
    path: 'portfolio',
    remote: 'portfolio',
    label: 'Portfolio',
    description:
      'Holdings, performance and allocation of investment portfolios.',
    groups: ['investor', 'fund-manager'],
  },
  {
    path: 'audit',
    remote: 'audit',
    label: 'Audit',
    description: 'Audit trails, reports and compliance checks.',
    groups: ['auditor'],
  },
];
