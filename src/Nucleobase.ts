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
  constructor(private props: { text: SVG.Text }) {}

  /**
   * The text element of the nucleobase.
   */
  get text() {
    return this.props.text;
  }

  /**
   * The actual DOM node of the text element of this nucleobase.
   */
  get textDOMNode() {
    return this.text.node;
  }

  /**
   * The parent element containing this nucleobase.
   *
   * Will be nullish if this nucleobase is not a child of another element.
   */
  get parent() {
    return this.text.parent();
  }

  /**
   * Appends the nucleobase to the SVG element.
   */
  appendTo(ele: SVG.Element): void {
    this.text.addTo(ele);
  }

  /**
   * Removes the nucleobase from its parent container element.
   *
   * (Has no effect if the nucleobase was not a child of another element to begin with.)
   */
  remove(): void {
    this.text.remove();
  }

  /**
   * The center point of this nucleobase (in the coordinate system of its parent SVG document).
   *
   * Is the same as the center point of the text element of this nucleobase.
   */
  get centerPoint(): Point {
    let { cx, cy } = this.text.bbox();

    return { x: cx, y: cy };
  }

  set centerPoint(p) {
    this.text.center(p.x, p.y);
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
   * Is the same as the center client point of the text element of this nucleobase.
   */
  get centerClientPoint(): Point {
    let textBoundingClientRect = this.textDOMNode.getBoundingClientRect();

    return {
      x: mean([textBoundingClientRect.left, textBoundingClientRect.right]),
      y: mean([textBoundingClientRect.top, textBoundingClientRect.bottom]),
    };
  }

  getCenterClientPoint() {
    return this.centerClientPoint;
  }
}
