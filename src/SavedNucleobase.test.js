/**
 * @jest-environment jsdom
 */

import { SavedNucleobase } from './SavedNucleobase';

beforeEach(() => {
  window.SVGTextElement = SVGElement;
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

describe('SavedNucleobase class', () => {
  describe('recreate method', () => {
    it('retrieves the correct SVG text element', () => {
      let id = 'id-839178219748274332';

      let jsonSerializable = { id };

      let domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      domNode.id = id;

      let parentDrawing = new DrawingMock();
      parentDrawing.domNode.insertBefore(domNode, parentDrawing.domNode.childNodes[4]);

      let savedNucleobase = new SavedNucleobase(jsonSerializable, parentDrawing);

      expect(savedNucleobase.recreate().domNode).toBe(domNode);
    });

    it('checks if the nucleobase ID has been saved under the name `textId`', () => {
      let id = 'id-4287f872f839fu293uf';

      let jsonSerializable = { textId: id };

      let domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      domNode.id = id;

      let parentDrawing = new DrawingMock();
      parentDrawing.domNode.insertBefore(domNode, parentDrawing.domNode.childNodes[5]);

      let savedNucleobase = new SavedNucleobase(jsonSerializable, parentDrawing);

      expect(savedNucleobase.recreate().domNode).toBe(domNode);
    });

    it('throws if the nucleobase ID was not saved', () => {
      let jsonSerializable = {};

      let parentDrawing = new DrawingMock();

      let savedNucleobase = new SavedNucleobase(jsonSerializable, parentDrawing);

      expect(() => savedNucleobase.recreate()).toThrow();
    });

    it('throws if no DOM node in the drawing has the nucleobase ID', () => {
      let jsonSerializable = { id: 'id-1984u1982ur928' };

      let parentDrawing = new DrawingMock();

      let savedNucleobase = new SavedNucleobase(jsonSerializable, parentDrawing);

      expect(() => savedNucleobase.recreate()).toThrow();
    });
  });
});
