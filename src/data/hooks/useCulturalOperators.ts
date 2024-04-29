import { useQuery, gql } from '@apollo/client';

import { appConfig } from '@/config';
import { MockCulturalOperators } from '../mock/mock-cultural-operators';
import { parseGqlData } from '../gql/gql-utils';
import { CulturalOperator } from '@/models/CulturalOperator';

const GET_CULTURAL_OPERATORS = `
query getCulturalOperators {
  culturalOperators(criteria: {
    sort: [
      {
        field: "name",
        direction: ASC
      }
    ]
  }) {
    items {
      _id
      name
      location {
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
      keywords {
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
        parentCategory {
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
      }
    }
  }
}
`;

export function useCulturalOperators(): {
  loading: boolean;
  error: any;
  data: any;
} {
  if (appConfig.useMockData) {
    return { loading: false, error: null, data: MockCulturalOperators };
  }

  const {
    loading,
    error,
    data: gqlData,
  } = useQuery(
    gql`
      ${GET_CULTURAL_OPERATORS}
    `,
    { fetchPolicy: 'no-cache' }
  );

  let data = null;
  if (!loading && gqlData) {
    data = parseGqlData(gqlData, 'culturalOperators', CulturalOperator);
    console.log('useCulturalOperators data', data);
  }
  return { loading, error, data };
}
