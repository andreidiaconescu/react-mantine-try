import { CategoryInterface } from '@/models/Category.interface';
import { ModelBase } from '@/models/ModelBase';

/* eslint-disable max-classes-per-file */
export class MockCategory extends ModelBase implements CategoryInterface {
  public name: string;
  public termCode: string;
  public version: number;
  parentCategory?: CategoryInterface;
}

export const getCategsLvl1 = (): CategoryInterface[] =>
  MockCategs.filter((categ: CategoryInterface) => !categ.parentCategory);

export const MockCategs: MockCategory[] = [
  {
    name: 'CONCERTS',
    termCode: 'CAT01-00',
    version: 1,
  },
  {
    name: 'THÉATRE / SPECTACLES',
    termCode: 'CAT02-00',
    version: 1,
  },
  {
    name: 'EXPOS',
    termCode: 'CAT03-00',
    version: 1,
  },
  {
    name: 'ÉVÉNEMENTS POUR ENFANTS',
    termCode: 'CAT04-00',
    version: 1,
  },
  {
    name: 'CONFÉRENCES / DÉBATS',
    termCode: 'CAT05-00',
    version: 1,
  },
  {
    name: 'CONTES / LITTÉRATURES',
    termCode: 'CAT06-00',
    version: 1,
  },
  {
    name: 'CINÉMA',
    termCode: 'CAT07-00',
    version: 1,
  },
  {
    name: 'ESCAPADES / DÉCOUVERTES / PATRIMOINE',
    termCode: 'CAT08-00',
    version: 1,
  },
  {
    name: 'STAGES / COURS',
    termCode: 'CAT09-00',
    version: 1,
  },
  {
    name: 'SOIRÉES',
    termCode: 'CAT10-00',
    version: 1,
  },
  {
    name: 'ACTIVITÉS DIVERSES',
    termCode: 'CAT11-00',
    version: 1,
  },
  {
    name: 'SALONS / FOIRES',
    termCode: 'CAT12-00',
    version: 1,
  },
  {
    name: 'MARCHÉS ET BROCANTES',
    termCode: 'CAT13-00',
    version: 1,
  },
  {
    name: 'FÊTES / FOLKLORE',
    termCode: 'CAT14-00',
    version: 1,
  },
  {
    name: 'SPORTS',
    termCode: 'CAT15-00',
    version: 1,
  },
  {
    name: "CONCERTS - accompagnement musical d'un film",
    termCode: 'CAT01-01',
    version: 1,
    parentCategory: {
      name: 'CONCERTS',
      termCode: 'CAT01-00',
      version: 1,
    },
  },
  {
    name: 'CONCERTS - blues / country / folk',
    termCode: 'CAT01-02',
    version: 1,
    parentCategory: {
      name: 'CONCERTS',
      termCode: 'CAT01-00',
      version: 1,
    },
  },
  {
    name: 'CONCERTS - café-concert',
    termCode: 'CAT01-03',
    version: 1,
    parentCategory: {
      name: 'CONCERTS',
      termCode: 'CAT01-00',
      version: 1,
    },
  },
  {
    name: 'CONCERTS - chanson française',
    termCode: 'CAT01-04',
    version: 1,
    parentCategory: {
      name: 'CONCERTS',
      termCode: 'CAT01-00',
      version: 1,
    },
  },
  {
    name: 'CONCERTS - chanson',
    termCode: 'CAT01-05',
    version: 1,
    parentCategory: {
      name: 'CONCERTS',
      termCode: 'CAT01-00',
      version: 1,
    },
  },
  {
    name: 'CONCERTS - néerlandophone',
    termCode: 'CAT01-06',
    version: 1,
    parentCategory: {
      name: 'CONCERTS',
      termCode: 'CAT01-00',
      version: 1,
    },
  },
  {
    name: 'CONCERTS - chants / gospels classique / contemporain / baroque / carillons',
    termCode: 'CAT01-07',
    version: 1,
    parentCategory: {
      name: 'CONCERTS',
      termCode: 'CAT01-00',
      version: 1,
    },
  },
  {
    name: 'THÉATRE / SPECTACLES - professionnel',
    termCode: 'CAT02-02',
    version: 1,
    parentCategory: {
      name: 'THÉATRE',
      termCode: 'CAT02-00',
      version: 1,
    },
  },
  {
    name: 'THÉATRE / SPECTACLES - cabaret',
    termCode: 'CAT02-03',
    version: 1,
    parentCategory: {
      name: 'THÉATRE',
      termCode: 'CAT02-00',
      version: 1,
    },
  },
  {
    name: 'THÉATRE / SPECTACLES - comédie musicale',
    termCode: 'CAT02-05',
    version: 1,
    parentCategory: {
      name: 'THÉATRE',
      termCode: 'CAT02-00',
      version: 1,
    },
  },
  {
    name: 'THÉATRE / SPECTACLES - danse',
    termCode: 'CAT02-06',
    version: 1,
    parentCategory: {
      name: 'THÉATRE',
      termCode: 'CAT02-00',
      version: 1,
    },
  },
  {
    name: 'THÉATRE / SPECTACLES - dialectal',
    termCode: 'CAT02-07',
    version: 1,
    parentCategory: {
      name: 'THÉATRE',
      termCode: 'CAT02-00',
      version: 1,
    },
  },
  {
    name: 'THÉATRE / SPECTACLES - amateur',
    termCode: 'CAT02-01',
    version: 1,
    parentCategory: {
      name: 'THÉATRE',
      termCode: 'CAT02-00',
      version: 1,
    },
  },
  {
    name: 'THÉATRE / SPECTACLES - cirque',
    termCode: 'CAT02-04',
    version: 1,
    parentCategory: {
      name: 'THÉATRE',
      termCode: 'CAT02-00',
      version: 1,
    },
  },
];
