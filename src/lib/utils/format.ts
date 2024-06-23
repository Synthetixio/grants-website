export function formatNumber(
  num?: number | string,
  maxDigit = 2,
  minDigit?: number
) {
  let value = num;
  if (value == null) return '--';
  if (typeof value === 'string') value = Number(num);
  return `${value.toLocaleString('en-US', { minimumFractionDigits: minDigit, maximumFractionDigits: maxDigit })}`;
}
