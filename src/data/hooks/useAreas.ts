import { useQuery, gql } from '@apollo/client';

import { getCurrentLocale } from '@/i18n/currentLocale';
import { Area } from '@/models/Area';

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

export interface TranslationField {
  field: string;
  value: string;
}
export interface Translation {
  locale: string;
  fields: TranslationField[];
}

const parseGqlTranslations = (item: any, locale: string): any => {
  if (!Array.isArray(item.translations)) {
    return item;
  }

  item.translations.forEach((translation: Translation) => {
    if (translation.locale !== locale) {
      return;
    }

    if (!Array.isArray(translation.fields)) {
      return;
    }

    translation.fields.forEach((field: TranslationField) => {
      item[field.field] = field.value;
    });
  });

  return item;
};

const parseGqlData = <TItem>(
  gqlData: any,
  holderName: string,
  TItem: new (initData: any) => TItem,
  locale: string = getCurrentLocale()
): any[] => {
  if (!gqlData[holderName]) {
    return [];
  }

  const rawItems: any[] = gqlData[holderName].items;
  return rawItems.map((rawItem: any) => {
    const itemObj = (TItem as any).newInstance(rawItem);
    parseGqlTranslations(itemObj, locale);
    return itemObj;
  });
  // return [];
};

export function useAreas(locale: string = getCurrentLocale()): {
  loading: boolean;
  error: any;
  data: any;
} {
  const { loading, error, data: gqlData } = useQuery(GET_AREAS);

  let data = null;
  if (!loading && gqlData) {
    data = parseGqlData(gqlData, 'areas', Area, locale);
  }
  return { loading, error, data };
}
