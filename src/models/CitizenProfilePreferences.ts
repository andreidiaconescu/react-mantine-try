import { AreaInterface } from './Area.interface';
import { CategoryInterface } from './Category.interface';

export class CitizenProfilePreferences {
  areas?: AreaInterface[];
  categoriesLvl1?: CategoryInterface[];
  categoriesLvl2?: CategoryInterface[];
}
