import { formatString } from './format-string';

describe('formatString', () => {
  it('values are replaced correctly', () => {
    const actual = formatString('My first name is %firstName% and my last name is %lastName%.', {
      firstName: 'John',
      lastName: 'Doe'
    });
    expect(actual).toBe('My first name is John and my last name is Doe.');
  });
});
