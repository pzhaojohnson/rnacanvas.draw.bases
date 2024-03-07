import { Nucleobase } from './Nucleobase';

describe('Nucleobase class', () => {
  test('text getter', () => {
    let text = {};

    let b = new Nucleobase({ text });

    expect(b.text).toBe(text);
    expect(text).toBeTruthy();
  });
});
