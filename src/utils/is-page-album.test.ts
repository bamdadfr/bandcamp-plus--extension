import {isPageAlbum} from './is-page-album';

describe('isPageAlbum', () => {
  it('should return true if location is a true album page', () => {
    // https://github.com/facebook/jest/issues/5124#issuecomment-415494099
    // noinspection JSConstantReassignment
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://myLabel.bandcamp.com/album/myAlbum',
      },
    });

    expect(isPageAlbum()).toBe(true);
  });
});