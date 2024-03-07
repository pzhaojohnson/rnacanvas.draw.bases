import { Nucleobase } from './Nucleobase';

describe('Nucleobase class', () => {
  test('text getter', () => {
    let text = {};

    let b = new Nucleobase({ text });

    expect(b.text).toBe(text);
    expect(text).toBeTruthy();
  });

  test('textDOMNode getter', () => {
    let text = { node: {} };

    let b = new Nucleobase({ text });

    expect(b.textDOMNode).toBe(text.node);
    expect(text.node).toBeTruthy();
  });

  test('centerPoint getter', () => {
    let text = { bbox: () => ({ cx: 823.317, cy: -81246.3636 }) };

    let b = new Nucleobase({ text });

    expect(b.centerPoint).toStrictEqual({ x: 823.317, y: -81246.3636 });
  });

  test('centerPoint setter', () => {
    let centerPoint = null;

    let text = { center: (x, y) => centerPoint = { x, y } };

    let b = new Nucleobase({ text });

    b.centerPoint = { x: -6471.387, y: 38197.332 };

    expect(centerPoint).toStrictEqual({ x: -6471.387, y: 38197.332 });
  });

  test('getCenterPoint method', () => {
    let text = { bbox: () => ({ cx: 4282.31, cy: 7720.0271 }) };

    let b = new Nucleobase({ text });

    expect(b.getCenterPoint()).toStrictEqual({ x: 4282.31, y: 7720.0271 });
  });

  test('setCenterPoint method', () => {
    let centerPoint = null;

    let text = { center: (x, y) => centerPoint = { x, y } };

    let b = new Nucleobase({ text });

    b.setCenterPoint({ x: 4781.327, y: 0.3718 });

    expect(centerPoint).toStrictEqual({ x: 4781.327, y: 0.3718 });
  });
});
