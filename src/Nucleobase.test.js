/**
 * @jest-environment jsdom
 */

import { Nucleobase } from './Nucleobase';

import * as SVG from '@svgdotjs/svg.js';

describe('Nucleobase class', () => {
  test('textElementDOMNode getter', () => {
    let textElement = { node: {} };

    let b = new Nucleobase(textElement);

    expect(b.textElementDOMNode).toBe(textElement.node);
    expect(textElement.node).toBeTruthy();
  });

  test('textContent getter', () => {
    let textElement = new SVG.Text();
    textElement.node.textContent = 'Asmcvjiq 328rhf';

    let b = new Nucleobase(textElement);
    expect(b.textContent).toBe('Asmcvjiq 328rhf');
  });

  test('textContent setter', () => {
    let textElement = new SVG.Text();

    let b = new Nucleobase(textElement);

    b.textContent = 'd8238fDFJIWef ijsoifwe';
    expect(textElement.text()).toBe('d8238fDFJIWef ijsoifwe');
  });

  test('id getter', () => {
    let textElement = new SVG.Text();
    textElement.attr('id', 'text-element-281497847814');

    let b = new Nucleobase(textElement);
    expect(b.id).toBe('text-element-281497847814');
  });

  test('parent getter', () => {
    let parent = {};

    let textElement = { parent: () => parent };

    let b = new Nucleobase(textElement);

    expect(b.parent).toBe(parent);
    expect(parent).toBeTruthy();
  });

  describe('parentDOMNode getter', () => {
    test('when the nucleobase has a parent', () => {
      let parentDOMNode = {};
      let parent = { node: parentDOMNode };

      let textElement = { parent: () => parent };

      let b = new Nucleobase(textElement);

      expect(b.parentDOMNode).toBe(parentDOMNode);
      expect(parentDOMNode).toBeTruthy();
    });

    test('when the nucleobase has no parent', () => {
      let textElement = { parent: () => null };

      let b = new Nucleobase(textElement);

      expect(b.parentDOMNode).toBe(null);
    });
  });

  test('appendTo method', () => {
    let textElement = { addTo: jest.fn() };

    let b = new Nucleobase(textElement);

    let ele = {};

    expect(textElement.addTo).not.toHaveBeenCalled();

    b.appendTo(ele);

    expect(textElement.addTo).toHaveBeenCalledTimes(1);
    expect(textElement.addTo.mock.calls[0][0]).toBe(ele);
    expect(ele).toBeTruthy();
  });

  test('remove method', () => {
    let textElement = { remove: jest.fn() };

    let b = new Nucleobase(textElement);

    expect(textElement.remove).not.toHaveBeenCalled();

    b.remove();

    expect(textElement.remove).toHaveBeenCalledTimes(1);
  });

  test('isIn method', () => {
    let textDOMNode = {};
    let textElement = { node: textDOMNode };

    let b = new Nucleobase(textElement);

    let node1 = {
      contains: other => {
        expect(other).toBeTruthy();
        return other === textDOMNode;
      },
    };

    let node2 = { contains: () => false };

    expect(b.isIn(node1)).toBe(true);
    expect(b.isIn(node2)).toBe(false);
  });

  test('centerPoint getter', () => {
    let textElement = { bbox: () => ({ cx: 823.317, cy: -81246.3636 }) };

    let b = new Nucleobase(textElement);

    expect(b.centerPoint).toStrictEqual({ x: 823.317, y: -81246.3636 });
  });

  test('centerPoint setter', () => {
    let centerPoint = null;

    let textElement = { center: (x, y) => centerPoint = { x, y } };

    let b = new Nucleobase(textElement);

    b.centerPoint = { x: -6471.387, y: 38197.332 };

    expect(centerPoint).toStrictEqual({ x: -6471.387, y: 38197.332 });
  });

  test('getCenterPoint method', () => {
    let textElement = { bbox: () => ({ cx: 4282.31, cy: 7720.0271 }) };

    let b = new Nucleobase(textElement);

    expect(b.getCenterPoint()).toStrictEqual({ x: 4282.31, y: 7720.0271 });
  });

  test('setCenterPoint method', () => {
    let centerPoint = null;

    let textElement = { center: (x, y) => centerPoint = { x, y } };

    let b = new Nucleobase(textElement);

    b.setCenterPoint({ x: 4781.327, y: 0.3718 });

    expect(centerPoint).toStrictEqual({ x: 4781.327, y: 0.3718 });
  });

  test('centerClientPoint getter', () => {
    let textElement = { node: { getBoundingClientRect: () => ({ left: 316, right: 352, top: 601, bottom: 624 }) } };

    let b = new Nucleobase(textElement);

    expect(b.centerClientPoint.x).toBeCloseTo((316 + 352) / 2);
    expect(b.centerClientPoint.y).toBeCloseTo((601 + 624) / 2);
  });

  test('getCenterClientPoint method', () => {
    let textElement = { node: { getBoundingClientRect: () => ({ left: -58, right: -41, top: 211, bottom: 230 }) } };

    let b = new Nucleobase(textElement);

    expect(b.getCenterClientPoint().x).toBeCloseTo(((-58) + (-41)) / 2);
    expect(b.getCenterClientPoint().y).toBeCloseTo((211 + 230) / 2);
  });
});
