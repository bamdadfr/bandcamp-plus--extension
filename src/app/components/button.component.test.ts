import {ButtonComponent} from './button.component';

describe('ButtonComponent', () => {
  const text = 'hello jest';
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
});
