import * as SVG from '@svgdotjs/svg.js';

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
   * @param textElement The text element for the nucleobase to wrap.
   */
  constructor(readonly textElement: SVG.Text) {}

  /**
   * The actual DOM node of the text element for this nucleobase.
   */
  get textElementDOMNode() {
    return this.textElement.node;
  }

  /**
   * The parent element containing this nucleobase.
   *
   * Will be nullish if this nucleobase is not a child of another element.
   */
  get parent() {
    return this.textElement.parent();
  }

  /**
   * The actual DOM node of the parent for this nucleobase.
   *
   * Will be nullish if this nucleobase has no parent.
   */
  get parentDOMNode() {
    let parent = this.parent;

    return parent ? parent.node : null;
  }

  /**
   * Appends the nucleobase to the SVG element.
   */
  appendTo(ele: SVG.Element): void {
    this.textElement.addTo(ele);
  }

  /**
   * Removes the nucleobase from its parent container element.
   *
   * (Has no effect if the nucleobase was not a child of another element to begin with.)
   */
  remove(): void {
    this.textElement.remove();
  }

  /**
   * Returns true if the given node is a parent (or grandparent, great-grandparent, etc.)
   * of the text element of this nucleobase.
   *
   * Returns false otherwise.
   */
  isIn(node: Node): boolean {
    return node.contains(this.textElementDOMNode);
  }

  /**
   * The center point of this nucleobase (in the coordinate system of its parent SVG document).
   *
   * Is the same as the center point of the text element for this nucleobase.
   */
  get centerPoint(): Point {
    let { cx, cy } = this.textElement.bbox();

    return { x: cx, y: cy };
  }

  set centerPoint(p) {
    this.textElement.center(p.x, p.y);
  }

  getCenterPoint() {
    return this.centerPoint;
  }

  setCenterPoint(p: Point): void {
    this.centerPoint = p;
  }

  /**
   * The center point of this nucleobase in the client coordinate system
   * (i.e., the same coordinate system used by methods such as `getBoundingClientRect`).
   *
   * Is the same as the center client point of the text element for this nucleobase.
   */
  get centerClientPoint(): Point {
    let boundingClientRect = this.textElementDOMNode.getBoundingClientRect();

    return {
      x: mean([boundingClientRect.left, boundingClientRect.right]),
      y: mean([boundingClientRect.top, boundingClientRect.bottom]),
    };
  }

  getCenterClientPoint() {
    return this.centerClientPoint;
  }
}
