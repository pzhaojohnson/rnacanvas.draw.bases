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

  test('appendTo method', () => {
    let text = { addTo: jest.fn() };

    let b = new Nucleobase({ text });

    let ele = {};

    expect(text.addTo).not.toHaveBeenCalled();

    b.appendTo(ele);

    expect(text.addTo).toHaveBeenCalledTimes(1);
    expect(text.addTo.mock.calls[0][0]).toBe(ele);
    expect(ele).toBeTruthy();
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

  test('centerClientPoint getter', () => {
    let text = { node: { getBoundingClientRect: () => ({ left: 316, right: 352, top: 601, bottom: 624 }) } };

    let b = new Nucleobase({ text });

    expect(b.centerClientPoint.x).toBeCloseTo((316 + 352) / 2);
    expect(b.centerClientPoint.y).toBeCloseTo((601 + 624) / 2);
  });

  test('getCenterClientPoint method', () => {
    let text = { node: { getBoundingClientRect: () => ({ left: -58, right: -41, top: 211, bottom: 230 }) } };

    let b = new Nucleobase({ text });

    expect(b.getCenterClientPoint().x).toBeCloseTo(((-58) + (-41)) / 2);
    expect(b.getCenterClientPoint().y).toBeCloseTo((211 + 230) / 2);
  });
});
