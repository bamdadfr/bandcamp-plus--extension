import {GridChildren, GridComponent} from './grid.component';

describe('GridComponent', () => {
  let grid: GridComponent;

  beforeEach(() => {
    grid = new GridComponent();
  });

  describe('Method: getNode', () => {
    it('should return a div', () => {
      expect(grid.getNode()).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Method: populate', () => {
    const children: GridChildren = {
      first: document.createElement('span'),
      second: document.createElement('span'),
      third: document.createElement('input'),
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
