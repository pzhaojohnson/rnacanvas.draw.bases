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
}
