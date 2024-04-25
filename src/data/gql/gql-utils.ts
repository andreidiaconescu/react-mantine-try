import { getCurrentLocale } from '@/i18n/currentLocale';
import { TranslationField } from '@/i18n/translation-field.interface';
import { Translation } from '@/i18n/translation.interface';

export const parseGqlData = <TItem>(
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

export const parseGqlTranslations = (item: any, locale: string): any => {
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
