import { useQuery, gql } from '@apollo/client';

import { appConfig } from '@/config';
import { MockCulturalCreators } from '../mock/mock-cultural-creators';
import { parseGqlData } from '../gql/gql-utils';
import { CulturalCreator } from '@/models/CulturalCreator';

const GET_CULTURAL_CREATORS = `
query getCulturalCreators {
  culturalCreators(criteria: {
    sort: [
      {
        field: "name",
        direction: ASC
      },
      {
        field: "firstName",
        direction: ASC
      },
      {
        field: "lastName",
        direction: ASC
      },
      {
        field: "additionalName",
        direction: ASC
      },
    ]
  }){
    items {
      _id
      name
      type
      sameAs
      additionalName
      firstName
      lastName
      keywords {
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

export function useCulturalCreators(): {
  loading: boolean;
  error: any;
  data: any;
} {
  if (appConfig.useMockData) {
    return { loading: false, error: null, data: MockCulturalCreators };
  }

  const {
    loading,
    error,
    data: gqlData,
  } = useQuery(gql`
    ${GET_CULTURAL_CREATORS}
  `);

  let data = null;
  if (!loading && gqlData) {
    data = parseGqlData(gqlData, 'culturalCreators', CulturalCreator);
  }
  return { loading, error, data };
}
