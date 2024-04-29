import { useQuery, gql } from '@apollo/client';

import { getCurrentLocale } from '@/i18n/currentLocale';
import { Area } from '@/models/Area';
import { appConfig } from '@/config';
import { MockAreas } from '../mock/mock-areas';
import { parseGqlData } from '../gql/gql-utils';

const GET_AREAS = gql`
  query GetAreas {
    areas(criteria: {}) {
      items {
        _id
        name
        termCode
        version
        dateCreated
        dateUpdated
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

export function useAreas(locale: string = getCurrentLocale()): {
  loading: boolean;
  error: any;
  data: any;
} {
  if (appConfig.useMockData) {
    return { loading: false, error: null, data: MockAreas };
  }

  const { loading, error, data: gqlData } = useQuery(GET_AREAS, { fetchPolicy: 'no-cache' });

  let data = null;
  if (!loading && gqlData) {
    data = parseGqlData(gqlData, 'areas', Area, locale);
  }
  return { loading, error, data };
}
