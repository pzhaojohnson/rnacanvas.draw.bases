import { SavableNucleobase } from './SavableNucleobase';

describe('SavableNucleobase class', () => {
  describe('toJSONSerializable method', () => {
    it('includes the nucleobase ID', () => {
      let savableNucleobase = new SavableNucleobase({ id: 'id-381984892147812' });

      expect(savableNucleobase.toJSONSerializable().id).toBe('id-381984892147812');
    });

    it('throws for a falsy nucleobase ID', () => {
      let savableNucleobase = new SavableNucleobase({ id: '' });

      expect(() => savableNucleobase.toJSONSerializable()).toThrow();
    });

    it('returns a JSON-serializable object', () => {
      let savableNucleobase = new SavableNucleobase({ id: 'id-7d8s7f837yf8y7ef' });

      expect(() => JSON.stringify(savableNucleobase.toJSONSerializable())).not.toThrow();
    });
  });
});
