import { ModelBase } from './ModelBase';

export const arePrefsEqual = (somePref: ModelBase, otherPref: ModelBase): boolean =>
  (somePref.termCode && somePref.termCode === otherPref.termCode) ||
  (somePref._id && somePref._id === otherPref._id);
