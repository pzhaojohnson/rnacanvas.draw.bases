import { Nucleobase } from './Nucleobase';

describe('Nucleobase class', () => {
  test('text getter', () => {
    let text = {};

    let b = new Nucleobase({ text });

    expect(b.text).toBe(text);
    expect(text).toBeTruthy();
  });

  test('textDOMNode getter', () => {
    let text = { node: {} };

    let b = new Nucleobase({ text });

    expect(b.textDOMNode).toBe(text.node);
    expect(text.node).toBeTruthy();
  });
});
