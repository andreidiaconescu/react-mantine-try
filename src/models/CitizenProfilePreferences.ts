import { AreaInterface } from './Area.interface';
import { AudienceInterface } from './Audience.interface';
import { CategoryInterface } from './Category.interface';

export class CitizenProfilePreferences {
  areas?: AreaInterface[];
  categoriesLvl1?: CategoryInterface[];
  categoriesLvl2?: CategoryInterface[];
  audiences?: AudienceInterface[];
}
