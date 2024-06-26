import { AudienceInterface } from '@/models/Audience.interface';
import { ModelBase } from '@/models/ModelBase';

/* eslint-disable max-classes-per-file */
export class MockAudience extends ModelBase implements AudienceInterface {
  public name: string;
  public termCode: string;
  public version: number;
}

export const MockAudiences: MockAudience[] = [
  {
    name: 'Amis',
    termCode: 'AUD01',
    version: 1,
  },
  {
    name: 'Conjoint',
    termCode: 'AUD02',
    version: 1,
  },
  {
    name: 'Enfants (0 à 6 ans)',
    termCode: 'AUD03',
    version: 1,
  },
  {
    name: 'Enfants (7 à 11 ans)',
    termCode: 'AUD04',
    version: 1,
  },
  {
    name: 'Étudiants',
    termCode: 'AUD06',
    version: 1,
  },
  {
    name: 'Séniors',
    termCode: 'AUD07',
    version: 1,
  },
  {
    name: 'Seul',
    termCode: 'AUD08',
    version: 1,
  },
  {
    name: 'Enfants (12 ans +)',
    termCode: 'AUD05',
    version: 1,
  },
];
