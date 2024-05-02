import { useQuery, gql } from '@apollo/client';

import { getCurrentLocale } from '@/i18n/currentLocale';
import { appConfig } from '@/config';
import { parseGqlData } from '../gql/gql-utils';
import { getCategsLvl1, getCategsLvl2 } from '../mock/mock-categs';
import { Category } from '@/models/Category';

const sorting = `
  sort: [
    {
      field: "multiLanguageContent.en.name",
      direction: ASC
    }
  ]
`;

export const GET_CATEGORIES = `
  query GetCategories {
    categories(criteria: {${sorting}}) {
      items {
        _id
        termCode
        version
        name
        parentCategory {
          _id
          termCode
          version
          translations {
            fields {
              field
              value
            }
            locale
          }
        }
        translations {
          fields {
            field
            value
          }
          locale
        }
      }
    }
  }
`;

export const GET_CATEGORIES_LEVEL_1 = `
  query GetCategories {
    categories(
      criteria: {
        pagination: { page: 1, perPage: 200 }
        filters: { parentCategory: { operation: NONE, value: "dummy" } }
        ${sorting}
      }
    ) {
      items {
        _id
        termCode
        version
        name
        parentCategory {
          _id
          termCode
          version
          translations {
            fields {
              field
              value
            }
            locale
          }
        }
        translations {
          fields {
            field
            value
          }
          locale
        }
      }
    }
  }
`;

export const GET_CATEGORIES_LEVEL_2 = `
  query GetCategories {
    categories(
      criteria: {
        pagination: { page: 1, perPage: 200 }
        filters: { parentCategory: { operation: HAS_VALUE, value: "dummy" } }
        ${sorting}
      }
    ) {
      items {
        _id
        termCode
        version
        name
        parentCategory {
          _id
          termCode
          version
          translations {
            fields {
              field
              value
            }
            locale
          }
        }
        translations {
          fields {
            field
            value
          }
          locale
        }
      }
    }
  }
`;

export function useCategs(
  level: number,
  locale: string = getCurrentLocale()
): {
  loading: boolean;
  error: any;
  data: any;
} {
  if (appConfig.useMockData) {
    return {
      loading: false,
      error: null,
      data: level === 1 ? getCategsLvl1() : level === 2 ? getCategsLvl2() : [],
    };
  }

  const gqlQuery =
    level === 1 ? GET_CATEGORIES_LEVEL_1 : level === 2 ? GET_CATEGORIES_LEVEL_2 : GET_CATEGORIES;
  gqlQuery.replace('multiLanguageContent.en.name', `multiLanguageContent.${locale}.name`);

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
    data = parseGqlData(gqlData, 'categories', Category, locale, 'parentCategory');
  }
  return { loading, error, data };
}
