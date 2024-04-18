import { AreaInterface } from './Area.interface';
import { AudienceInterface } from './Audience.interface';
import { CategoryInterface } from './Category.interface';
import { CulturalCreatorInterface } from './CulturalCreator.interface';
import { CulturalOperatorInterface } from './CulturalOperator.interface';

export class CitizenProfilePreferences {
  areas?: AreaInterface[];
  categoriesLvl1?: CategoryInterface[];
  categoriesLvl2?: CategoryInterface[];
  audiences?: AudienceInterface[];
  culturalCreators?: CulturalCreatorInterface[];
  culturalOperators?: CulturalOperatorInterface[];
}
