import { Area } from './Area';
import { Audience } from './Audience';
import { Category } from './Category';
import { CulturalCreator } from './CulturalCreator';
import { CulturalOperatorInterface } from './CulturalOperator.interface';

export class CitizenProfilePreferences {
  areas?: Area[];
  categoriesLvl1?: Category[];
  categoriesLvl2?: Category[];
  audiences?: Audience[];
  culturalCreators?: CulturalCreator[];
  culturalOperators?: CulturalOperatorInterface[];
  registerEmail?: string;
  acceptUseExistingEmail?: boolean;
  acceptShareProfileWithOperator?: boolean;
}
