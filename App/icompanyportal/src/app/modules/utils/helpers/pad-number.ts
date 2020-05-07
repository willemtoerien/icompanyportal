export function padNumber(value: number) {
  let valueStr = value.toString();
  valueStr = valueStr.length === 1 ? '0' + valueStr : valueStr;
  return valueStr;
}
