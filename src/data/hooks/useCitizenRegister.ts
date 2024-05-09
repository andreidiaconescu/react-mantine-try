import { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Area } from '@/models/Area';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { CitizenProfilePreferences } from '@/models/CitizenProfilePreferences';
import { PreferenceType } from '@/models/preference-type';
import { PreferenceRating } from '@/models/PreferenceRating';
import { Category } from '@/models/Category';
import { Audience } from '@/models/Audience';
import { CulturalCreator } from '@/models/CulturalCreator';
import { CulturalOperator } from '@/models/CulturalOperator';

// operatorAccess: ["65ef1a3d78b86521cfb1d945"]
// link: "http://localhost:5173/citizen/create-profile/activate-citizen"
// citizenProfilePreferences: [
//   {
//     preferenceType: Area
//     genericPreference: {
//       termCode: "LOC12"
//       version: 1
//       entityTranslations: [{ locale: "en", fields: [{ field: "name", value: "Mons" }] }]
//     }
//     rating: 3
//   }
//   {
//     preferenceType: Area
//     genericPreference: {
//       termCode: "LOC11"
//       version: 1
//       entityTranslations: [{ locale: "en", fields: [{ field: "name", value: "Verviers" }] }]
//     }
//     rating: 4
//   }
// ]
const CITIZEN_REGISTER_WITH_PREFERENCES = `
  mutation citizenRegisterWithPreferences($citizenEmail: String!, $locale: String!) {
    citizenRegister(
      email: $citizenEmail
      locale: $locale
      link: #citizenActivationLink
      citizenProfilePreferences: #citizenProfilePreferences
    ) {
      _id
      activationCode
      active
      email
      citizenRole {
        _id
        name
        default
      }
    }
  }
`;

const buildAreasForGqlAddPrefs = (areas: Area[], locale: string): string => {
  const gqlAreas: string[] = areas.map((area: Area) => {
    const gqlArea: any = `{
      preferenceType: ${PreferenceType.Area},
      genericPreference: {
        termCode: "${area.termCode}",
        version: ${area.version},
        entityTranslations: [
          {
            locale: "${locale}",
            fields: [
              {
                field: "name",
                value: "${area.name}",
              },
            ],
          },
        ]
      },
      rating: ${PreferenceRating.Max}
    }`;
    return gqlArea;
  });

  // gqlCitizenAddPrefs.push(...gqlAreas);
  return `${gqlAreas.join(
    `,
    `
  )}`;
};

const buildCategsLvl1ForGqlAddPrefs = (categs: Category[], locale: string): string => {
  const gqlCategs: string[] = categs.map((categ: Category) => {
    const gqlCateg: any = `{
      preferenceType: ${PreferenceType.Category},
      genericPreference: {
        termCode: "${categ.termCode}",
        version: ${categ.version},
        entityTranslations: [
          {
            locale: "${locale}",
            fields: [
              {
                field: "name",
                value: "${categ.name}",
              },
            ],
          },
        ]
      },
      rating: ${PreferenceRating.Max}
    }`;
    return gqlCateg;
  });

  // gqlCitizenAddPrefs.push(...gqlAreas);
  return `${gqlCategs.join(
    `,
    `
  )}`;
};

const buildCategsLvl2ForGqlAddPrefs = (categs: Category[], locale: string): string => {
  const gqlCategs: string[] = categs.map((categ: Category) => {
    const gqlCateg: any = `{
      preferenceType: ${PreferenceType.Category},
      genericPreference: {
        termCode: "${categ.termCode}",
        version: ${categ.version},
        entityTranslations: [
          {
            locale: "${locale}",
            fields: [
              {
                field: "name",
                value: "${categ.name}",
              },
            ],
          },
        ],
        parentCategory: {
          termCode: "${categ.parentCategory.termCode}",
          version: ${categ.parentCategory.version},
          entityTranslations: [
            {
              locale: "${locale}",
              fields: [
                {
                  field: "name",
                  value: "${categ.parentCategory.name}"
                }
              ]
            }
          ]
        }
      },
      rating: ${PreferenceRating.Max}
    }`;
    return gqlCateg;
  });

  // gqlCitizenAddPrefs.push(...gqlAreas);
  return `${gqlCategs.join(
    `,
    `
  )}`;
};

const buildAudiencesForGqlAddPrefs = (audiences: Audience[], locale: string): string => {
  const gqlAudiences: string[] = audiences.map((audience: Audience) => {
    const gqlArea: any = `{
      preferenceType: ${PreferenceType.Audience},
      genericPreference: {
        termCode: "${audience.termCode}",
        version: ${audience.version},
        entityTranslations: [
          {
            locale: "${locale}",
            fields: [
              {
                field: "name",
                value: "${audience.name}",
              },
            ],
          },
        ]
      },
      rating: ${PreferenceRating.Max}
    }`;
    return gqlArea;
  });

  // gqlCitizenAddPrefs.push(...gqlAreas);
  return `${gqlAudiences.join(
    `,
    `
  )}`;
};

const buildCulturalCreatorsForGqlAddPrefs = (culturalCreators: CulturalCreator[]): string => {
  const gqlCulturalCreators: string[] = culturalCreators.map((culturalCreator: CulturalCreator) => {
    const gqlCulturalCreator: any = `{
      preferenceType: ${PreferenceType.CulturalCreator},
      specificPreference: "${culturalCreator._id}",
      rating: ${PreferenceRating.Max}
    }`;
    return gqlCulturalCreator;
  });

  // gqlCitizenAddPrefs.push(...gqlAreas);
  return `${gqlCulturalCreators.join(
    `,
    `
  )}`;
};

const buildCulturalOperatorsForGqlAddPrefs = (culturalOperators: CulturalOperator[]): string => {
  const gqlCulturalOperators: string[] = culturalOperators.map(
    (culturalOperator: CulturalOperator) => {
      const gqlCulturalOperator: any = `{
      preferenceType: ${PreferenceType.CulturalOperator},
      specificPreference: "${culturalOperator._id}",
      rating: ${PreferenceRating.Max}
    }`;
      return gqlCulturalOperator;
    }
  );

  // gqlCitizenAddPrefs.push(...gqlAreas);
  return `${gqlCulturalOperators.join(
    `,
    `
  )}`;
};

const buildGqlCitizenAddPrefs = (
  citizenPreferences: CitizenProfilePreferences,
  locale: string
): string => {
  const gqlCitizenAddPrefs: string[] = [];

  if (Array.isArray(citizenPreferences.areas)) {
    const areasGqlStr = buildAreasForGqlAddPrefs(citizenPreferences.areas, locale);
    gqlCitizenAddPrefs.push(areasGqlStr);
  }

  if (Array.isArray(citizenPreferences.categoriesLvl1)) {
    const categsLvl1GqlStr = buildCategsLvl1ForGqlAddPrefs(
      citizenPreferences.categoriesLvl1,
      locale
    );
    gqlCitizenAddPrefs.push(categsLvl1GqlStr);
  }

  if (Array.isArray(citizenPreferences.categoriesLvl2)) {
    const categsLvl2GqlStr = buildCategsLvl2ForGqlAddPrefs(
      citizenPreferences.categoriesLvl2,
      locale
    );
    gqlCitizenAddPrefs.push(categsLvl2GqlStr);
  }

  if (Array.isArray(citizenPreferences.audiences)) {
    const audiencesGqlStr = buildAudiencesForGqlAddPrefs(citizenPreferences.audiences, locale);
    gqlCitizenAddPrefs.push(audiencesGqlStr);
  }

  if (Array.isArray(citizenPreferences.culturalCreators)) {
    const culturalCreatorsGqlStr = buildCulturalCreatorsForGqlAddPrefs(
      citizenPreferences.culturalCreators
    );
    gqlCitizenAddPrefs.push(culturalCreatorsGqlStr);
  }

  if (Array.isArray(citizenPreferences.culturalOperators)) {
    const culturalOperatorsGqlStr = buildCulturalOperatorsForGqlAddPrefs(
      citizenPreferences.culturalOperators
    );
    gqlCitizenAddPrefs.push(culturalOperatorsGqlStr);
  }

  return `[${gqlCitizenAddPrefs.join(
    `,
    `
  )}]`;
};

export function useCitizenRegister(
  locale: string,
  citizenActivationLink: string
): {
  loading: boolean;
  error: any;
  data: any;
  runMutation: (options: any) => Promise<any>;
} {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { citizenPreferences, setCitizenPreferences } = useContext(CitizenProfileContext);

  const gqlCitizenAddPrefs: string = buildGqlCitizenAddPrefs(citizenPreferences, locale);
  console.log('useCitizenRegister gqlCitizenAddPrefs', gqlCitizenAddPrefs);

  let gqlMutation: string = CITIZEN_REGISTER_WITH_PREFERENCES.replace(
    '#citizenProfilePreferences',
    gqlCitizenAddPrefs
  );
  gqlMutation = gqlMutation.replace('#citizenActivationLink', `"${citizenActivationLink}"`);
  // gqlMutation = gqlMutation.replaceAll('"#PreferenceType.Area"', 'Area'); // GQL NAME NOT string in quotes

  console.log('useCitizenRegister gqlMutation', gqlMutation);

  const [runMutation, { data, loading, error }] = useMutation(gql`
    ${gqlMutation}
  `);

  // let data = null;
  // if (!loading && gqlData) {
  //   data = parseGqlData(gqlData, 'areas', Area, locale);
  // }
  return { loading, error, data, runMutation };
}
