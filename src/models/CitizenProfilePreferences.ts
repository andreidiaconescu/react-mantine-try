import { Area } from './Area';
import { Audience } from './Audience';
import { Category } from './Category';
import { CulturalCreatorInterface } from './CulturalCreator.interface';
import { CulturalOperatorInterface } from './CulturalOperator.interface';

export class CitizenProfilePreferences {
  areas?: Area[];
  categoriesLvl1?: Category[];
  categoriesLvl2?: Category[];
  audiences?: Audience[];
  culturalCreators?: CulturalCreatorInterface[];
  culturalOperators?: CulturalOperatorInterface[];
  registerEmail?: string;
  acceptUseExistingEmail?: boolean;
  acceptShareProfileWithOperator?: boolean;
}
