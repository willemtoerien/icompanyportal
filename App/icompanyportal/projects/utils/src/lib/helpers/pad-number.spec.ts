import { padNumber } from './pad-number';

describe('padNumber', () => {
  it('single diget is padded', () => {
    const actual = padNumber(1);
    expect(actual).toBe('01');
  });

  it('double diget is not padded', () => {
    const actual = padNumber(11);
    expect(actual).toBe('11');
  });
});
