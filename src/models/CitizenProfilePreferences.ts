import { Area } from './Area';
import { Audience } from './Audience';
import { Category } from './Category';
import { CulturalCreator } from './CulturalCreator';
import { CulturalOperator } from './CulturalOperator';

export class CitizenProfilePreferences {
  areas?: Area[];
  categoriesLvl1?: Category[];
  categoriesLvl2?: Category[];
  audiences?: Audience[];
  culturalCreators?: CulturalCreator[];
  culturalOperators?: CulturalOperator[];
  registerEmail?: string;
  acceptUseExistingEmail?: boolean;
  acceptShareProfileWithOperator?: boolean;
}
