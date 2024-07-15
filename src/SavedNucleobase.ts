import { Nucleobase } from './Nucleobase';

type NonNullObject = { [name: string]: unknown };

interface Drawing {
  /**
   * The DOM node corresponding to the drawing and that the drawing represents
   * (in this case an SVG document).
   */
  readonly domNode: SVGSVGElement;
}

/**
 * Represents a saved nucleobase (e.g., in a file) that can be recreated.
 */
export class SavedNucleobase {
  #jsonSerializable: NonNullObject | unknown;

  #parentDrawing: Drawing;

  /**
   * @param jsonSerializable The saved form of the nucleobase (e.g., that was parsed from a file).
   * @param parentDrawing
   */
  constructor(jsonSerializable: NonNullObject | unknown, parentDrawing: Drawing) {
    this.#jsonSerializable = jsonSerializable;

    this.#parentDrawing = parentDrawing;
  }

  get #id(): string | never {
    let id: unknown = (this.#jsonSerializable as any)['id'];

    // the ID of a nucleobase used to be saved under the name `textId`
    id = id ?? (this.#jsonSerializable as any)['textId'];

    if (!id) {
      throw new Error('Unable to find nucleobase ID.');
    } else if (typeof id != 'string') {
      throw new Error('Nucleobase ID is not a string.');
    }

    return id;
  }

  get #domNode(): SVGTextElement | never {
    let id = this.#id;
    let domNode = this.#parentDrawing.domNode.querySelector(`#${id}`);

    if (!domNode) {
      throw new Error(`No DOM node in the drawing has the nucleobase ID "${id}".`);
    } else if (!(domNode instanceof SVGTextElement)) {
      throw new Error(`The DOM node with ID "${id}" is not an SVG text element.`);
    }

    return domNode;
  }

  /**
   * Recreates the saved nucleobase.
   *
   * Throws if unable to do so.
   */
  recreate(): Nucleobase | never {
    return new Nucleobase(this.#domNode);
  }
}
