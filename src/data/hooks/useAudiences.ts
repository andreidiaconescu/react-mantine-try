import { useQuery, gql } from '@apollo/client';

import { getCurrentLocale } from '@/i18n/currentLocale';
import { appConfig } from '@/config';
import { MockAudiences } from '../mock/mock-audiences';
import { parseGqlData } from '../gql/gql-utils';
import { Audience } from '@/models/Audience';

const sorting = `
  sort: [
    {
      field: "multiLanguageContent.en.name",
      direction: ASC
    }
  ]
`;

const GET_AUDIENCES = `
  query GetAudiences {
    audiences(criteria: {${sorting}}) {
      items {
        _id
        name
        termCode
        version
        translations {
          locale
          fields {
            field
            value
          }
        }
      }
      meta {
        total
      }
    }
  }
`;

export function useAudiences(locale: string = getCurrentLocale()): {
  loading: boolean;
  error: any;
  data: any;
} {
  if (appConfig.useMockData) {
    return { loading: false, error: null, data: MockAudiences };
  }

  const gqlQuery = GET_AUDIENCES.replace(
    'multiLanguageContent.en.name',
    `multiLanguageContent.${locale}.name`
  );
  const {
    loading,
    error,
    data: gqlData,
  } = useQuery(
    gql`
      ${gqlQuery}
    `,
    { fetchPolicy: 'no-cache' }
  );

  let data = null;
  if (!loading && gqlData) {
    data = parseGqlData(gqlData, 'audiences', Audience, locale);
  }
  return { loading, error, data };
}
