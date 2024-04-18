import { CulturalOperatorInterface } from '@/models/CulturalOperator.interface';
import { ModelBase } from '@/models/ModelBase';

/* eslint-disable max-classes-per-file */
export class MockCulturalOperator extends ModelBase implements CulturalOperatorInterface {
  public _id: string;
  public name: string;
}

export const MockCulturalOperators: MockCulturalOperator[] = [
  {
    _id: 'id_co_1',
    name: 'Bozar (Palais des Beaux-Arts)',
  },
  {
    _id: 'id_co_2',
    name: 'Les Ardentes',
  },
  {
    _id: 'id_co_3',
    name: 'Théâtre Royal de la Monnaie',
  },
  {
    _id: 'id_co_4',
    name: 'Théâtre National',
  },
  {
    _id: 'id_co_5',
    name: 'Ronquières Festival',
  },
  {
    _id: 'id_co_6',
    name: 'Théâtre Royal de Namur',
  },
  {
    _id: 'id_co_7',
    name: 'Théâtre de Liège',
  },
  {
    _id: 'id_co_8',
    name: 'Théâtre Jean Vilar',
  },
  {
    _id: 'id_co_9',
    name: 'Théâtre de la Place',
  },
  {
    _id: 'id_co_10',
    name: 'Nuits Botanique',
  },
  {
    _id: 'id_co_11',
    name: 'Brussels Summer Festival',
  },
  {
    _id: 'id_co_12',
    name: 'Le Bazaar',
  },
];
