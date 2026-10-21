import { computed, inject, Signal } from '@angular/core';
import { AuthService, UserGroup } from '@fp/shared/auth';

/** An instrument is one tool of the platform, delivered by its own micro frontend. */
export interface Instrument {
  /** Route path in the shell, e.g. `/portfolio`. */
  path: string;
  /** Remote name: the key in `federation.manifest.json`. */
  remote: string;
  label: string;
  description: string;
  /** User groups allowed to open the instrument. */
  groups: readonly UserGroup[];
}

export const INSTRUMENTS: readonly Instrument[] = [
  {
    path: 'portfolio',
    remote: 'portfolio',
    label: 'Portfolio',
    description:
      'Holdings, performance and allocation of investment portfolios.',
    groups: ['investor', 'fund-manager', 'auditor'],
  },
  {
    path: 'audit',
    remote: 'audit',
    label: 'Audit',
    description: 'Audit trails, reports and compliance checks.',
    groups: ['auditor'],
  },
];

/**
 * Instruments the current user may open, updated when the user changes.
 * Must be called in an injection context (e.g. a field initializer).
 */
export function injectAvailableInstruments(): Signal<readonly Instrument[]> {
  const auth = inject(AuthService);
  return computed(() =>
    INSTRUMENTS.filter((instrument) => auth.hasAnyGroup(instrument.groups)),
  );
}
