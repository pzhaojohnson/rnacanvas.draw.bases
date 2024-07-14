import type { Nucleobase } from './Nucleobase';

type NonNullObject = { [name: string]: unknown };

/**
 * Represents a nucleobase that can be saved (e.g., in a file)
 * for future drawing.
 */
export class SavableNucleobase {
  readonly #nucleobase: Nucleobase;

  /**
   * @param nucleobase A nucleobase to wrap.
   */
  constructor(nucleobase: Nucleobase) {
    this.#nucleobase = nucleobase;
  }

  /**
   * Returns an object that can be serialized to a JSON string
   * and that is the saved representation of the nucleobase.
   *
   * Throws if the nucleobase has a falsy ID.
   */
  toJSONSerializable(): NonNullObject | never {
    if (!this.#nucleobase.id) {
      throw new Error('Nucleobase has a falsy ID.');
    }

    return {
      id: this.#nucleobase.id,
    };
  }
}
