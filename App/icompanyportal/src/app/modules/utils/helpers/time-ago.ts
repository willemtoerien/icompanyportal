const templates = {
  prefix: '',
  suffix: ' ago',
  seconds: 'Less than a minute',
  minute: 'About a minute',
  minutes: '%d minutes',
  hour: 'About an hour',
  hours: 'About %d hours',
  day: 'A day',
  days: '%d days',
  month: 'About a month',
  months: '%d months',
  year: 'About a year',
  years: '%d years'
};

function getTemplate(name: string, value: number) {
  return templates[name] && templates[name].replace(/%d/i, Math.abs(Math.round(value)));
}

export function timeAgo(date: Date) {
  const now = new Date();
  // tslint:disable-next-line: no-bitwise
  const seconds = ((now.getTime() - date.getTime()) * 0.001) >> 0;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;

  return (
    templates.prefix +
    ((seconds < 45 && getTemplate('seconds', seconds)) ||
      (seconds < 90 && getTemplate('minute', 1)) ||
      (minutes < 45 && getTemplate('minutes', minutes)) ||
      (minutes < 90 && getTemplate('hour', 1)) ||
      (hours < 24 && getTemplate('hours', hours)) ||
      (hours < 42 && getTemplate('day', 1)) ||
      (days < 30 && getTemplate('days', days)) ||
      (days < 365 && getTemplate('months', days / 30)) ||
      (years < 1.5 && getTemplate('year', 1)) ||
      getTemplate('years', years)) +
    templates.suffix
  );
}
