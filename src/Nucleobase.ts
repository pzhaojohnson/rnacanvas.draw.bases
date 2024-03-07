import * as SVG from '@svgdotjs/svg.js';

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
}
