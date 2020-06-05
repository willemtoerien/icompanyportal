import { SignUpPage } from './sign-up-page.po';
import { logging, browser } from 'protractor';

describe('SignUpPage', () => {
  let page: SignUpPage;

  beforeEach(async () => {
    page = new SignUpPage();
    await page.navigateTo();
  });

  const validateOther = async (name: string, type: string, invalidValue: string, expectedErrorMessage: string) => {
    await page.setInput(name, invalidValue);
    const text = await page.getValidationError(name, type);
    expect(text).toBe(expectedErrorMessage);
  };

  const validateRequired = async (name: string, defaultValue = 'test') => {
    await page.setInput(name, defaultValue);
    let hasValidationError = await page.hasValidationError(name);
    expect(hasValidationError).toBeFalse();
    await page.clearInput(name);
    hasValidationError = await page.hasValidationError(name);
    expect(hasValidationError).toBeTrue();
    const text = await page.getValidationError(name, 'required');
    expect(text).toBe('This field is required');
    await page.setInput(name, defaultValue);
  };

  it('form validation is handled correctly', async () => {
    await validateRequired('firstName', 'FirstName');
    // await validateRequired('lastName', 'LastName');

    // await validateOther('email', 'email', 'test', 'This is not a valid email address.');
    // await validateRequired('email', 'test@test.com');

    // await validateRequired('password', 'Password');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});
