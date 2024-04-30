import { Translation } from '@/i18n/translation.interface';
import { ModelBase } from './ModelBase';

export class Area extends ModelBase {
  public name: string;
  public termCode: string;
  public version: number;
  public translations?: Translation[];
}
