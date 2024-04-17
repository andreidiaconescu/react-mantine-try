import { CulturalCreatorInterface } from '@/models/CulturalCreator.interface';
import { ModelBase } from '@/models/ModelBase';

/* eslint-disable max-classes-per-file */
export class MockCulturalCreator extends ModelBase implements CulturalCreatorInterface {
  public _id: string;
  public name: string;
}

export const MockCulturalCreators: MockCulturalCreator[] = [
  {
    _id: 'id_cc_1',
    name: 'Angèle',
  },
  {
    _id: 'id_cc_2',
    name: 'Orelsan',
  },
  {
    _id: 'id_cc_3',
    name: 'Stromae',
  },
  {
    _id: 'id_cc_4',
    name: 'Charlotte De Witte',
  },
  {
    _id: 'id_cc_5',
    name: 'Jacques Brel',
  },
  {
    _id: 'id_cc_6',
    name: 'Damso',
  },
  {
    _id: 'id_cc_7',
    name: 'Girls in Hawaii',
  },
  {
    _id: 'id_cc_8',
    name: 'Iliona',
  },
];
