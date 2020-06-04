export class BreadcrumbItem {
  constructor(public text: string, public route?: string) {}

  static parse(value: string) {
    const values = value.split('|');
    return new BreadcrumbItem(values[0], values[1]);
  }
}
