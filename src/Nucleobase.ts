import * as SVG from '@svgdotjs/svg.js';

import { assignUUID } from '@rnacanvas/draw.svg';

import { mean } from '@rnacanvas/math';

/**
 * A two-dimensional point.
 */
export type Point = {
  x: number;
  y: number;
};

/**
 * A nucleobase in a two-dimensional nucleic acid structure drawing.
 */
export class Nucleobase {
  /**
   * Creates a nucleobase with the given text content.
   */
  static create(textContent: string): Nucleobase {
    let textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    textElement.textContent = textContent;

    let b = new Nucleobase(textElement);

    // all nucleobases must have a unique ID to be recreatable
    // (when reopening a saved drawing, for instance)
    b.assignUUID();

    return b;
  }

  /**
   * @param textElement The text element that is the nucleobase.
   */
  constructor(private textElement: SVGTextElement) {}

  /**
   * The actual DOM node of the text element that is the nucleobase.
   */
  get domNode() {
    return this.textElement;
  }

  /**
   * The text content of the text element that is the nucleobase.
   */
  get textContent() {
    return this.domNode.textContent;
  }

  set textContent(textContent) {
    this.domNode.textContent = textContent;
  }

  /**
   * The ID of the text element that is the nucleobase.
   */
  get id() {
    // don't use the `id` method provided by the SVG.js library for SVG elements
    // (since it will auto-initialize the IDs of SVG elements)
    return this.domNode.id;
  }

  /**
   * Assigns a UUID to the nucleobase.
   *
   * (Overwrites any preexisting ID that the nucleobase had.)
   */
  assignUUID(): void {
    assignUUID(this.domNode);
  }

  /**
   * Appends the text element that is the nucleobase to the given container node.
   */
  appendTo(container: Node): void {
    container.appendChild(this.domNode);
  }

  /**
   * Removes the text element that is the nucleobase from its parent container node.
   *
   * Has no effect if the nucleobase (text element) was not a child of a parent container node to begin with.
   */
  remove(): void {
    this.domNode.remove();
  }

  /**
   * Returns true if the given node is a parent (or grandparent, great-grandparent, etc.)
   * of the text element that is the nucleobase.
   *
   * Returns false otherwise, including for the nucleobase (text element) itself.
   */
  isIn(container: Node): boolean {
    return container.contains(this.domNode) && container !== this.domNode;
  }

  /**
   * The center point of the nucleobase (in the coordinate system of its parent SVG document).
   */
  get centerPoint(): Point {
    let { cx, cy } = (new SVG.Text(this.domNode)).bbox();

    return { x: cx, y: cy };
  }

  set centerPoint(p) {
    (new SVG.Text(this.domNode)).center(p.x, p.y);
  }

  getCenterPoint() {
    return this.centerPoint;
  }

  setCenterPoint(p: Point): void {
    this.centerPoint = p;
  }

  /**
   * The center point of the nucleobase in the client coordinate system
   * (i.e., the same coordinate system used by methods such as `getBoundingClientRect`).
   */
  get centerClientPoint(): Point {
    let boundingClientRect = this.domNode.getBoundingClientRect();

    return {
      x: mean([boundingClientRect.left, boundingClientRect.right]),
      y: mean([boundingClientRect.top, boundingClientRect.bottom]),
    };
  }

  getCenterClientPoint() {
    return this.centerClientPoint;
  }
}
