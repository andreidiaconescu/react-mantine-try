export class ModelBase {
  [propName: string]: any;

  public static newInstance(initData: Record<string, any> = {}) {
    const newInstance = new this();
    const propNames: string[] = Object.keys(initData);
    propNames.forEach((propName: string) => {
      // @ts-ignore
      newInstance[propName] = initData[propName];
    });
    return newInstance;
  }
}
