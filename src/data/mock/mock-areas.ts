import { AreaInterface } from '@/models/Area.interface';
import { ModelBase } from '@/models/ModelBase';

/* eslint-disable max-classes-per-file */
export class MockArea extends ModelBase implements AreaInterface {
  public name: string;
  public termCode: string;
  public version: number;
}

export const MockAreas: MockArea[] = [
  {
    name: 'Région de Bruxelles-Capitale',
    termCode: 'LOC01',
    version: 1,
  },
  {
    name: 'Province de Liège',
    termCode: 'LOC02',
    version: 1,
  },
  {
    name: 'Province de Hainaut',
    termCode: 'LOC03',
    version: 1,
  },
  {
    name: 'Province de Namur',
    termCode: 'LOC04',
    version: 1,
  },
  {
    name: 'Province du Brabant Wallon',
    termCode: 'LOC05',
    version: 1,
  },
  {
    name: 'Province de Luxembourg',
    termCode: 'LOC06',
    version: 1,
  },
  {
    name: 'Liège',
    termCode: 'LOC07',
    version: 1,
  },
];
