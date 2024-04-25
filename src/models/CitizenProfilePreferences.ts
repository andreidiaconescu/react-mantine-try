import { Area } from './Area';
import { AudienceInterface } from './Audience.interface';
import { Category } from './Category';
import { CulturalCreatorInterface } from './CulturalCreator.interface';
import { CulturalOperatorInterface } from './CulturalOperator.interface';

export class CitizenProfilePreferences {
  areas?: Area[];
  categoriesLvl1?: Category[];
  categoriesLvl2?: Category[];
  audiences?: AudienceInterface[];
  culturalCreators?: CulturalCreatorInterface[];
  culturalOperators?: CulturalOperatorInterface[];
  registerEmail?: string;
  acceptUseExistingEmail?: boolean;
  acceptShareProfileWithOperator?: boolean;
}
