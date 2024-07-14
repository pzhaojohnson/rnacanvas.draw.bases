import { Nucleobase } from './Nucleobase';

type NonNullObject = { [name: string]: unknown };

interface Drawing {
  /**
   * Returns the SVG text element in the drawing with the specified ID.
   *
   * Throws if there is no SVG text element in the drawing with the specified ID.
   */
  getSVGTextElementWithID(id: string): SVGTextElement | never;
}

/**
 * Represents a saved nucleobase (e.g., in a file) that can be recreated.
 */
export class SavedNucleobase {
  #jsonSerializable: NonNullObject | unknown;

  #parentDrawing: Drawing;

  /**
   * The saved representation of a nucleobase is supposed to be a JSON-serializable object.
   *
   * The parent drawing is expected to contain the SVG text element that is the nucleobase.
   *
   * @param jsonSerializable The saved representation of the nucleobase.
   * @param parentDrawing
   */
  constructor(jsonSerializable: NonNullObject | unknown, parentDrawing: Drawing) {
    this.#jsonSerializable = jsonSerializable;

    this.#parentDrawing = parentDrawing;
  }

  /**
   * Recreates the saved nucleobase.
   *
   * Throws if unable to do so.
   */
  recreate(): Nucleobase | never {
    let id: unknown = (this.#jsonSerializable as any).id;

    // the ID of a nucleobase used to be saved under the property name `textId`
    id = id ?? (this.#jsonSerializable as any).textId;

    if (!id) {
      throw new Error('Unable to find nucleobase ID.');
    } else if (typeof id != 'string') {
      throw new Error('Nucleobase ID must be a string.');
    }

    let domNode = this.#parentDrawing.getSVGTextElementWithID(id);

    return new Nucleobase(domNode);
  }
}
