import { Translation } from '@/i18n/translation.interface';
import { ModelBase } from './ModelBase';

export class Category extends ModelBase {
  name: string;
  termCode: string;
  version: number;
  parentCategory?: Category;
  public translations?: Translation[];
}
