import {ButtonComponent} from './button.component';
import {TIMEOUT} from '../constants';

describe('ButtonComponent', () => {
  const text = 'hello jest';
  const activeText = 'active!!';
  let button: ButtonComponent;

  beforeEach(() => {
    button = new ButtonComponent(text);
  });

  describe('Prop: text', () => {
    it('should be defined', () => {
      expect(button.getNode().textContent).toBeDefined();
    });

    it('should be equal to the text passed in the constructor', () => {
      expect(button.getNode().textContent).toBe(text);
    });
  });

  describe('Method: getNode', () => {
    it('should return a span', () => {
      expect(button.getNode()).toBeInstanceOf(HTMLSpanElement);
    });
  });

  describe('Method: onClick', () => {
    it('should call the onClick callback', () => {
      const callback = jest.fn();
      button.onClick(activeText, callback);
      button.getNode().click();
      expect(callback).toHaveBeenCalled();
    });

    describe('Callback returns false', () => {
      it('should not change the span content', () => {
        const cb = jest.fn(() => false);
        button.onClick(activeText, cb);
        button.getNode().click();
        expect(button.getNode().textContent).toBe(text);
      });
    });

    describe('Callback returns true', () => {
      it('should change the span content', () => {
        const cb = jest.fn(() => true);
        button.onClick(activeText, cb);
        button.getNode().click();
        expect(button.getNode().textContent).toBe(activeText);
      });

      it('should display the default text after timeout constant', (done) => {
        const cb = jest.fn(() => true);
        button.onClick(activeText, cb);
        button.getNode().click();
        expect(button.getNode().textContent).toBe(activeText);

        setTimeout(() => {
          expect(button.getNode().textContent).toBe(text);
          done();
        }, TIMEOUT);
      });
    });
  });
});
