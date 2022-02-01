import {isFirefox} from './is-firefox';

describe('isFirefox', () => {
  it('should return false if the browser is not Firefox', () => {
    // Mozilla/5.0 (linux) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/16.7.0
    expect(isFirefox()).toBe(false);
  });
});
