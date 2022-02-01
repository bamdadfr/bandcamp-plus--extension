import {SpanComponent, SpanProps} from './span.component';

describe('SpanComponent', () => {
  let span: SpanComponent;
  const defaultProps: SpanProps = {
    text: 'hello',
    id: 'bonjour',
  };
  const updateText = 'updated!!!';

  beforeEach(() => {
    span = new SpanComponent({text: defaultProps.text});
  });

  describe('Props', () => {
    it('should be defined when optional props are not passed', () => {
      expect(span).toBeDefined();
    });

    it('should be defined when optional props are passed', () => {
      const spanWithProps = new SpanComponent(defaultProps);
      expect(spanWithProps).toBeDefined();
    });
  });

  describe('Method: getNode', () => {
    it('should return a span element', () => {
      expect(span.getNode()).toBeInstanceOf(HTMLSpanElement);
    });

    it('should display the default text', () => {
      expect(span.getNode().textContent).toEqual(defaultProps.text);
    });
  });

  describe('Method: update', () => {
    it('should update the text', () => {
      span.update(updateText);
      expect(span.getNode().textContent).toBe(updateText);
    });
  });

  describe('Method: reset', () => {
    it('should reset the text after an update', () => {
      span.update(updateText);
      span.reset();
      expect(span.getNode().textContent).toBe(defaultProps.text);
    });
  });
});
