/**
 * @jest-environment jsdom
 */

import { SavedNucleobase } from './SavedNucleobase';

class DrawingMock {
  constructor(elements) {
    this.elements = elements;
  }

  getSVGTextElementWithID(id) {
    let text = this.elements.find(ele => ele.id === id && ele.tagName === 'text');

    if (!text) {
      throw new Error(`This drawing does not contain an SVG text element with the ID: ${id}.`);
    }

    return text;
  }
}

describe('SavedNucleobase class', () => {
  describe('recreate method', () => {
    it('retrieves the correct SVG text element', () => {
      let id = 'id-839178219748274332';

      let jsonSerializable = { id };

      let domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      domNode.id = id;

      let parentDrawing = new DrawingMock([
        document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
        document.createElementNS('http://www.w3.org/2000/svg', 'text'),
        document.createElementNS('http://www.w3.org/2000/svg', 'text'),
        domNode,
        document.createElementNS('http://www.w3.org/2000/svg', 'ellipse'),
      ]);

      let savedNucleobase = new SavedNucleobase(jsonSerializable, parentDrawing);

      expect(savedNucleobase.recreate().domNode).toBe(domNode);
    });

    it('checks if the nucleobase ID has been saved under the property name `textId`', () => {
      let id = 'id-4287f872f839fu293uf';

      let jsonSerializable = { textId: id };

      let domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      domNode.id = id;

      let parentDrawing = new DrawingMock([
        document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
        domNode,
        document.createElementNS('http://www.w3.org/2000/svg', 'text'),
        document.createElementNS('http://www.w3.org/2000/svg', 'ellipse'),
        document.createElementNS('http://www.w3.org/2000/svg', 'text'),
      ]);

      let savedNucleobase = new SavedNucleobase(jsonSerializable, parentDrawing);

      expect(savedNucleobase.recreate().domNode).toBe(domNode);
    });

    it('throws if the nucleobase ID was not saved', () => {
      let jsonSerializable = {};

      let parentDrawing = new DrawingMock([
        document.createElementNS('http://www.w3.org/2000/svg', 'circle'),
        document.createElementNS('http://www.w3.org/2000/svg', 'text'),
        document.createElementNS('http://www.w3.org/2000/svg', 'text'),
      ]);

      let savedNucleobase = new SavedNucleobase(jsonSerializable, parentDrawing);

      expect(() => savedNucleobase.recreate()).toThrow();
    });
  });
});
