import { Translation } from '@/i18n/translation.interface';
import { ModelBase } from './ModelBase';

export class Audience extends ModelBase {
  name: string;
  termCode: string;
  version: number;
  public translations?: Translation[];
}
