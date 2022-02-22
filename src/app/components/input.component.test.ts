import {InputComponent, InputProps} from './input.component';

describe('InputComponent', () => {
  let input: InputComponent;
  const defaultProps: InputProps = {
    value: 0.5,
    id: 'lol',
    min: -5,
    max: 5,
    step: 0.1,
  };

  beforeEach(() => {
    input = new InputComponent({value: defaultProps.value});
  });

  describe('Props', () => {
    it('should be defined when optional parameters are not passed', () => {
      expect(input).toBeDefined();
    });

    it('should be defined when optional parameters are passed', () => {
      input = new InputComponent(defaultProps);
      expect(input).toBeDefined();
    });
  });

  describe('Method: getNode', () => {
    it('should return an input', () => {
      expect(input.getNode()).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Method: onInput', () => {
    it('should add a callback to the oninput listener', () => {
      const callback = jest.fn();
      input.onChange(callback);
      input.getNode().dispatchEvent(new Event('input'));
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('Method: updateValue', () => {
    it('should update the value and call onInput', () => {
      const newValue = 0.7;
      const callback = jest.fn();
      input.onChange(callback);
      input.updateValue(newValue);
      expect(input.getNode().value).toBe(newValue.toString());
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('Method: resetValue', () => {
    it('should reset the value to the default and call onInput', () => {
      const newValue = 0.7;
      const callback = jest.fn();
      input.onChange(callback);
      input.updateValue(newValue);
      input.resetValue();
      expect(input.getNode().value).toBe(defaultProps.value.toString());
      expect(callback).toHaveBeenCalled();
    });
  });
});
