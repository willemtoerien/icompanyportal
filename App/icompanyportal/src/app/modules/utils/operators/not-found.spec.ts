import { Observable } from 'rxjs';
import { notFound } from './not-found';

describe('notFound', () => {
  it('non-404 will be thrown', () => {
    const observable = new Observable<string>((subscriber) => {
      subscriber.error({
        status: 500
      });
    });
    let notFoundActioned = false;
    let errorThrown = false;
    observable.pipe(notFound(() => (notFoundActioned = true))).subscribe(
      () => {},
      () => (errorThrown = true)
    );
    expect(notFoundActioned).toBeFalse();
    expect(errorThrown).toBeTrue();
  });
  it('404 will be handled', () => {
    const observable = new Observable<string>((subscriber) => {
      subscriber.error({
        status: 404
      });
    });
    let notFoundActioned = false;
    let errorThrown = false;
    observable.pipe(notFound(() => (notFoundActioned = true))).subscribe(
      () => {},
      () => (errorThrown = true)
    );
    expect(notFoundActioned).toBeTrue();
    expect(errorThrown).toBeFalse();
  });
});
