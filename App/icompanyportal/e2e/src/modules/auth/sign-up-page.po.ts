import { browser, element, by } from 'protractor';

export class SignUpPage {
  navigateTo() {
    return browser.get(browser.baseUrl + 'auth/sign-up');
  }

  async setInput(name: string, value: string) {
    await element(by.id(name)).sendKeys(value);
  }

  async clearInput(name: string) {
    await element(by.id(name)).clear();
  }

  async getValidationError(name: string, type: string) {
    await element(by.id(`error-${name}-${type}`)).getText();
  }

  async hasValidationError(name: string) {
    const attribute = await element(by.id(name)).getAttribute('class');
    return !!attribute.includes('ng-invalid');
  }

  async clickSubmit() {
    await element(by.id('submit-button')).click();
  }
}
