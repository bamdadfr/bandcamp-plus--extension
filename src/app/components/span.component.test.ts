import {SpanComponent} from './span.component';

describe('SpanComponent', () => {
  let span: SpanComponent;
  const defaultText = 'hello';
  const updateText = 'updated!!!';

  beforeEach(() => {
    span = new SpanComponent(defaultText);
  });

  describe('Props', () => {
    it('should be defined when optional props are not passed', () => {
      expect(span).toBeDefined();
    });

    it('should be defined when optional props are passed', () => {
      const spanWithProps = new SpanComponent(defaultText);
      expect(spanWithProps).toBeDefined();
    });
  });

  describe('Method: getNode', () => {
    it('should return a span element', () => {
      expect(span.getNode()).toBeInstanceOf(HTMLSpanElement);
    });

    it('should display the default text', () => {
      expect(span.getNode().textContent).toEqual(defaultText);
    });
  });

  describe('Method: update', () => {
    it('should update the text', () => {
      span.render(updateText);
      expect(span.getNode().textContent).toBe(updateText);
    });
  });

  describe('Method: reset', () => {
    it('should reset the text after an update', () => {
      span.render(updateText);
      span.reset();
      expect(span.getNode().textContent).toBe(defaultText);
    });
  });
});
