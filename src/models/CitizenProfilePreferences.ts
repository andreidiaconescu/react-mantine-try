import { Area } from './Area.interface';
import { Category } from './Category.interface';

export class CitizenProfilePreferences {
  areas?: Area[];
  categoriesLvl1?: Category[];
  categoriesLvl2?: Category[];
}
