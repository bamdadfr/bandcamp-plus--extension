import {GridChildren, GridLayout} from './grid.layout';

describe('GridComponent', () => {
  let grid: GridLayout;

  beforeEach(() => {
    grid = new GridLayout();
  });

  describe('Method: getNode', () => {
    it('should return a div', () => {
      expect(grid.getNode()).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Method: populate', () => {
    const children: GridChildren = {
      leftButton: document.createElement('span'),
      topContent: document.createElement('span'),
      bottomContent: document.createElement('input'),
      rightButton: document.createElement('span'),
    };

    it('should succeed', (done) => {
      try {
        grid.populate(children);
        done();
      } catch (e) {
        done.fail(e);
      }
    });
  });
});
