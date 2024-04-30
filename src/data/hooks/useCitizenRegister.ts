import { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';

import { getCurrentLocale } from '@/i18n/currentLocale';
import { Area } from '@/models/Area';
import { CitizenProfileContext } from '@/state/CitizenProfile.context';
import { CitizenProfilePreferences } from '@/models/CitizenProfilePreferences';
import { PreferenceType } from '@/models/preference-type';
import { PreferenceRating } from '@/models/PreferenceRating';

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

const buildAreasForGqlAddPrefs = (
  areas: Area[],
  gqlCitizenAddPrefs: any[],
  locale: string
): string => {
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

const buildGqlCitizenAddPrefs = (
  citizenPreferences: CitizenProfilePreferences,
  locale: string
): string => {
  const gqlCitizenAddPrefs: string[] = [];
  if (Array.isArray(citizenPreferences.areas)) {
    const areasGqlStr = buildAreasForGqlAddPrefs(
      citizenPreferences.areas,
      gqlCitizenAddPrefs,
      locale
    );
    gqlCitizenAddPrefs.push(areasGqlStr);
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
