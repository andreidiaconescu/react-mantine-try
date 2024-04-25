import { TranslationField } from './translation-field.interface';

export interface Translation {
  locale: string;
  fields: TranslationField[];
}
