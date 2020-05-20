export function formatString(str: string, variables: any) {
  const copy: any = {};
  // tslint:disable-next-line: forin
  for (const key in variables) {
    copy[`%${key}%`] = variables[key];
  }
  return str.replace(/%\w+%/g, (all) => copy[all] || all);
}
