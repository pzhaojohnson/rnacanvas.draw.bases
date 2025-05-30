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

  test('`deserialized()` method', () => {
    let b1 = Nucleobase.create('c');
    b1.domNode.id = 'id-907191287422';

    let parentDrawing = new DrawingMock();
    expect(parentDrawing.domNode.childNodes.length).toBeGreaterThanOrEqual(6);
    parentDrawing.domNode.insertBefore(b1.domNode, parentDrawing.domNode.childNodes[4]);

    // `SVGTextElement` is not defined by default by JSDOM
    expect(globalThis.SVGTextElement).toBeFalsy();
    globalThis.SVGTextElement = SVGElement;

    let b2 = Nucleobase.deserialized(b1.serialized(), parentDrawing);
    expect(b2.domNode).toBe(b1.domNode);
    expect(b2.domNode).toBeTruthy();

    // base IDs used to be saved as `textId`
    let b3 = Nucleobase.deserialized({ textId: 'id-907191287422' }, parentDrawing);
    expect(b3.domNode).toBe(b1.domNode);
    expect(b3.domNode).toBeTruthy();
  });

  test('domNode getter', () => {
    let textElement = createSVGTextElement();

    let b = new Nucleobase(textElement);

    expect(b.domNode).toBe(textElement);
    expect(textElement).toBeTruthy();
  });

  test('`serialized()` method', () => {
    let b = Nucleobase.create('C');

    b.domNode.id = 'id-47916281974';
    expect(b.serialized()).toStrictEqual({ id: 'id-47916281974' });

    b.domNode.id = '';
    expect(() => b.serialized()).toThrow();
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

  test('bringToFront method', () => {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    let b = Nucleobase.create('A');
    b.appendTo(svg);

    // add some elements to append after
    for (let i = 0; i < 5; i++) {
      svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
    }

    expect(svg.childNodes[0]).toBe(b.domNode);

    b.bringToFront();

    expect(svg.childNodes[5]).toBe(b.domNode);
    expect(svg.childNodes.length).toBe(6);
  });

  test('sendToBack method', () => {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    // add some elements to prepend before
    for (let i = 0; i < 10; i++) {
      svg.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'ellipse'));
    }

    let b = Nucleobase.create('G');
    b.appendTo(svg);

    expect(svg.childNodes[10]).toBe(b.domNode);

    b.sendToBack();

    expect(svg.childNodes[0]).toBe(b.domNode);
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

  test('setAttributes method', () => {
    let textElement = createSVGTextElement();
    let b = new Nucleobase(textElement);

    b.setAttributes({ 'fill': '#44ba72', 'font-size': '12.64cm' });

    expect(textElement.getAttribute('fill')).toBe('#44ba72');
    expect(textElement.getAttribute('font-size')).toBe('12.64cm');

    // invalid input
    expect(() => b.setAttributes('asdf')).not.toThrow();
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

  test('`isA()`', () => {
    expect(Nucleobase.create('A').isA()).toBe(true);
    expect(Nucleobase.create('a').isA()).toBe(true);
    expect(Nucleobase.create('U').isA()).toBe(false);
    expect(Nucleobase.create('g').isA()).toBe(false);
  });

  test('`isU()`', () => {
    expect(Nucleobase.create('U').isU()).toBe(true);
    expect(Nucleobase.create('u').isU()).toBe(true);
    expect(Nucleobase.create('C').isU()).toBe(false);
    expect(Nucleobase.create('a').isU()).toBe(false);
  });

  test('`isT()`', () => {
    expect(Nucleobase.create('T').isT()).toBe(true);
    expect(Nucleobase.create('t').isT()).toBe(true);
    expect(Nucleobase.create('G').isT()).toBe(false);
    expect(Nucleobase.create('a').isT()).toBe(false);
  });

  test('`isG()`', () => {
    expect(Nucleobase.create('G').isG()).toBe(true);
    expect(Nucleobase.create('g').isG()).toBe(true);
    expect(Nucleobase.create('A').isG()).toBe(false);
    expect(Nucleobase.create('c').isG()).toBe(false);
  });

  test('`isC()`', () => {
    expect(Nucleobase.create('C').isC()).toBe(true);
    expect(Nucleobase.create('c').isC()).toBe(true);
    expect(Nucleobase.create('U').isC()).toBe(false);
    expect(Nucleobase.create('t').isC()).toBe(false);
  });

  test('bbox getter', () => {
    let textElement = createSVGTextElement();
    textElement.getBBox = () => createDOMRect(-57.2, 88.4, 901.73, 1129.4);

    let b = new Nucleobase(textElement);

    let { x, y, width, height } = b.bbox;
    expect([x, y, width, height]).toStrictEqual([-57.2, 88.4, 901.73, 1129.4]);
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

    textElement.x = { baseVal: [{ value: 0 }] };
    textElement.y = { baseVal: [{ value: 0 }] };

    let b = new Nucleobase(textElement);

    b.setCenterPoint({ x: 4781.327, y: 0.3718 });

    expect(Number.parseFloat(b.domNode.getAttribute('x'))).toBeCloseTo(4781.327 - 6);
    expect(Number.parseFloat(b.domNode.getAttribute('y'))).toBeCloseTo(0.3718 - 9.25);
  });

  test('maintainingCenterPoint method', () => {
    let textElement = createSVGTextElement();

    textElement.setAttribute('x', '252');
    textElement.setAttribute('y', '-801');
    textElement.setAttribute('font-size', '28');

    textElement.getBBox = () => {
      let x = Number.parseFloat(textElement.getAttribute('x'));
      let y = Number.parseFloat(textElement.getAttribute('y'));
      let width = (2 / 3) * Number.parseFloat(textElement.getAttribute('font-size'));
      let height = Number.parseFloat(textElement.getAttribute('font-size'));
      return createDOMRect(x, y, width, height);
    };

    textElement.x = { baseVal: [{ value: 252 }] };
    textElement.y = { baseVal: [{ value: -801 }] };

    let b = new Nucleobase(textElement);

    b.maintainingCenterPoint(() => textElement.setAttribute('font-size', '87'));

    // adjusts `x` and `y` attributes to maintain the center point of the nucleobase
    expect(Number.parseFloat(textElement.getAttribute('x'))).toBeCloseTo(232.33333333333326);
    expect(Number.parseFloat(textElement.getAttribute('y'))).toBeCloseTo(-830.5);
  });

  test('boundingClientRect getter', () => {
    let textElement = createSVGTextElement();
    textElement.getBoundingClientRect = () => createDOMRect(52.82, 889.23, 501.27, 8003.74);

    let b = new Nucleobase(textElement);

    let { x, y, width, height } = b.boundingClientRect;
    expect([x, y, width, height]).toStrictEqual([52.82, 889.23, 501.27, 8003.74]);
  });

  test('clientCenterPoint getter', () => {
    let textElement = createSVGTextElement();
    textElement.getBoundingClientRect = () => createDOMRect(316, 601, 36, 23);

    let b = new Nucleobase(textElement);

    expect(b.clientCenterPoint.x).toBeCloseTo((316 + 352) / 2);
    expect(b.clientCenterPoint.y).toBeCloseTo((601 + 624) / 2);
  });

  test('getClientCenterPoint method', () => {
    let textElement = createSVGTextElement();
    textElement.getBoundingClientRect = () => createDOMRect(-58, 211, 17, 19);

    let b = new Nucleobase(textElement);

    expect(b.getClientCenterPoint().x).toBeCloseTo(((-58) + (-41)) / 2);
    expect(b.getClientCenterPoint().y).toBeCloseTo((211 + 230) / 2);
  });
});

class DrawingMock {
  constructor() {
    this.domNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'ellipse'));
    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
    this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'text'));
  }
}
