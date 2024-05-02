import { ModelBase } from './ModelBase';
import { Permissions } from './permissions';

export class CitizenRole extends ModelBase {
  public _id: string;
  public name: string;
  public description: string;
  public permissions?: Permissions[];
  public default: boolean;
}
