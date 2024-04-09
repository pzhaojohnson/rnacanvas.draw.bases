/**
 * @jest-environment jsdom
 */

import { Nucleobase } from './Nucleobase';

import * as SVG from '@svgdotjs/svg.js';

function createDOMRect(x, y, width, height) {
  let top = y;
  let right = x + width;
  let bottom = y + height;
  let left = x;

  return { x, y, width, height, top, right, bottom, left };
}

function createSVGTextElement() {
  let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

  if (!text.getBBox) {
    text.getBBox = () => createDOMRect(0, 0, 0, 0);
  }

  return text;
}

describe('Nucleobase class', () => {
  describe('create static method', () => {
    it('creates a nucleobase with the given text content', () => {
      let b = Nucleobase.create('aaCJOE_3819jdijf');
      expect(b.textContent).toBe('aaCJOE_3819jdijf');
    });

    /**
     * All nucleobases must have a unique ID to be recreatable
     * (when reopening a saved drawing, for instance).
     */
    it('assigns a UUID to the newly created nucleobase', () => {
      let b = Nucleobase.create('A');
      expect(b.id.length).toBeGreaterThanOrEqual(36);
    });

    it('assigns default attributes to the newly created nucleobase', () => {
      Nucleobase.defaultAttributes['font-family'] = 'Comic Sans';
      Nucleobase.defaultAttributes['font-size'] = '32.08725';

      let b = Nucleobase.create('A');

      expect(b.getAttribute('font-family')).toBe('Comic Sans');
      expect(b.getAttribute('font-size')).toBe('32.08725');
    });
  });

  test('domNode getter', () => {
    let textElement = createSVGTextElement();

    let b = new Nucleobase(textElement);

    expect(b.domNode).toBe(textElement);
    expect(textElement).toBeTruthy();
  });

  test('getAttribute method', () => {
    let textElement = createSVGTextElement();
    textElement.setAttribute('fill', '#ff632b');
    textElement.setAttribute('font-size', '12.82');

    let b = new Nucleobase(textElement);
    expect(b.getAttribute('fill')).toBe('#ff632b');
    expect(b.getAttribute('font-size')).toBe('12.82');
  });

  test('setAttribute method', () => {
    let textElement = createSVGTextElement();
    let b = new Nucleobase(textElement);

    b.setAttribute('fill', '#88ba29');
    b.setAttribute('font-weight', '200');

    expect(textElement.getAttribute('fill')).toBe('#88ba29');
    expect(textElement.getAttribute('font-weight')).toBe('200');
  });

  test('textContent getter', () => {
    let textElement = createSVGTextElement();
    textElement.textContent = 'Asmcvjiq 328rhf';

    let b = new Nucleobase(textElement);
    expect(b.textContent).toBe('Asmcvjiq 328rhf');
  });

  test('textContent setter', () => {
    let textElement = createSVGTextElement();

    let b = new Nucleobase(textElement);

    b.textContent = 'd8238fDFJIWef ijsoifwe';
    expect(textElement.textContent).toBe('d8238fDFJIWef ijsoifwe');
  });

  describe('id getter', () => {
    it('returns the ID of the text element that is the nucleobase', () => {
      let textElement = createSVGTextElement();
      textElement.setAttribute('id', 'text-element-281497847814');

      let b = new Nucleobase(textElement);
      expect(b.id).toBe('text-element-281497847814');
    });

    /**
     * Don't use the `id` method provided by the SVG.js library for SVG elements
     * (since it will auto-initialize the IDs of SVG elements).
     */
    it('does not auto-initialize an ID for the nucleobase', () => {
      let textElement = createSVGTextElement();
      expect(textElement.getAttribute('id')).toBeFalsy();

      let b = new Nucleobase(textElement);
      expect(b.id).toBeFalsy();

      // is still uninitialized
      expect(textElement.getAttribute('id')).toBeFalsy();
    });
  });

  test('assignUUID method', () => {
    let textElement = createSVGTextElement();

    let b = new Nucleobase(textElement);
    expect(b.id).toBeFalsy();

    b.assignUUID();
    expect(b.id.length).toBeGreaterThanOrEqual(36);

    // must start with a letter (per the rules for SVG element IDs)
    expect(b.id.charAt(0)).toMatch(/[A-Za-z]/);
  });

  describe('appendTo method', () => {
    it('appends the text element that is the nucleobase to the given container node', () => {
      let textElement = createSVGTextElement();
      let b = new Nucleobase(textElement);

      let container = (new SVG.Svg()).node;

      // add some elements to append after
      container.appendChild(createSVGTextElement());
      container.appendChild(createSVGTextElement());
      container.appendChild(createSVGTextElement());
      container.appendChild(createSVGTextElement());

      expect(container.contains(textElement)).toBeFalsy();
      b.appendTo(container);
      expect(container.childNodes[4]).toBe(textElement);
    });
  });

  describe('remove method', () => {
    it('removes the text element that is the nucleobase from any parent container node that it is in', () => {
      let textElement = createSVGTextElement();
      let b = new Nucleobase(textElement);

      let container = (new SVG.Svg()).node;
      b.appendTo(container);

      expect(container.contains(textElement)).toBeTruthy();
      b.remove();
      expect(container.contains(textElement)).toBeFalsy();
    });
  });

  test('isIn method', () => {
    let textElement = createSVGTextElement();
    let b = new Nucleobase(textElement);

    let container1 = (new SVG.Svg()).node;
    let container2 = (new SVG.Svg()).node;

    b.appendTo(container1);

    expect(b.isIn(container1)).toBe(true);
    expect(b.isIn(container2)).toBe(false);

    // should return false for the nucleobase (text element) itself
    // (cannot simply use the `contains` method of nodes and do nothing else)
    expect(b.isIn(textElement)).toBe(false);
  });

  test('hasParent method', () => {
    let b1 = Nucleobase.create('G');
    let b2 = Nucleobase.create('G');

    let container = (new SVG.Svg()).node;

    b1.appendTo(container);

    expect(b1.hasParent()).toBe(true);
    expect(b2.hasParent()).toBe(false);
  });

  test('bbox getter', () => {
    let textElement = createSVGTextElement();
    textElement.getBBox = () => createDOMRect(-57.2, 88.4, 901.73, 1129.4);

    let b = new Nucleobase(textElement);

    let { x, y, width, height } = b.bbox;
    expect([x, y, width, height]).toStrictEqual([-57.2, 88.4, 901.73, 1129.4]);
  });

  test('centerPoint getter', () => {
    let textElement = createSVGTextElement();
    textElement.getBBox = () => createDOMRect(45, 82, 18, 33);

    let b = new Nucleobase(textElement);

    expect(b.centerPoint.x).toBeCloseTo(54);
    expect(b.centerPoint.y).toBeCloseTo(98.5);
  });

  test('centerPoint setter', () => {
    let textElement = createSVGTextElement();
    textElement.getBBox = () => createDOMRect(0, 0, 22.3, 84);

    let b = new Nucleobase(textElement);

    b.centerPoint = { x: -6471.387, y: 38197.332 };

    expect(Number.parseFloat(b.domNode.getAttribute('x'))).toBeCloseTo(-6471.387 - (22.3 / 2));
    expect(Number.parseFloat(b.domNode.getAttribute('y'))).toBeCloseTo(38197.332 - (84 / 2));
  });

  test('getCenterPoint method', () => {
    let textElement = createSVGTextElement();

    textElement.getBBox = () => createDOMRect(4282.31 - 4.5, 7720.0271 - 3.1, 9, 6.2);

    let b = new Nucleobase(textElement);

    expect(b.getCenterPoint().x).toBeCloseTo(4282.31);
    expect(b.getCenterPoint().y).toBeCloseTo(7720.0271);
  });

  test('setCenterPoint method', () => {
    let textElement = createSVGTextElement();
    textElement.getBBox = () => createDOMRect(0, 0, 12, 18.5);

    let b = new Nucleobase(textElement);

    b.setCenterPoint({ x: 4781.327, y: 0.3718 });

    expect(Number.parseFloat(b.domNode.getAttribute('x'))).toBeCloseTo(4781.327 - 6);
    expect(Number.parseFloat(b.domNode.getAttribute('y'))).toBeCloseTo(0.3718 - 9.25);
  });

  test('boundingClientRect getter', () => {
    let textElement = createSVGTextElement();
    textElement.getBoundingClientRect = () => createDOMRect(52.82, 889.23, 501.27, 8003.74);

    let b = new Nucleobase(textElement);

    let { x, y, width, height } = b.boundingClientRect;
    expect([x, y, width, height]).toStrictEqual([52.82, 889.23, 501.27, 8003.74]);
  });

  test('centerClientPoint getter', () => {
    let textElement = createSVGTextElement();
    textElement.getBoundingClientRect = () => createDOMRect(316, 601, 36, 23);

    let b = new Nucleobase(textElement);

    expect(b.centerClientPoint.x).toBeCloseTo((316 + 352) / 2);
    expect(b.centerClientPoint.y).toBeCloseTo((601 + 624) / 2);
  });

  test('getCenterClientPoint method', () => {
    let textElement = createSVGTextElement();
    textElement.getBoundingClientRect = () => createDOMRect(-58, 211, 17, 19);

    let b = new Nucleobase(textElement);

    expect(b.getCenterClientPoint().x).toBeCloseTo(((-58) + (-41)) / 2);
    expect(b.getCenterClientPoint().y).toBeCloseTo((211 + 230) / 2);
  });
});
