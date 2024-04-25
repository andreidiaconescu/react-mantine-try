import { ModelBase } from './ModelBase';

export class Category extends ModelBase {
  name: string;
  termCode: string;
  version: number;
  parentCategory?: Category;
}
