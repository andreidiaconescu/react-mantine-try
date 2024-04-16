export interface CategoryInterface {
  name: string;
  termCode: string;
  version: number;
  parentCategory?: CategoryInterface;
}
