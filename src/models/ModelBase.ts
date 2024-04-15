export class ModelBase {
  [propName: string]: any;
  constructor(initData: Record<string, any> = {}) {
    const propNames: string[] = Object.keys(initData);
    propNames.forEach((propName: string) => {
      // @ts-ignore
      this[propName] = initData[propName];
    });
  }
}
