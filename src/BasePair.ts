export class BasePair<B extends Nucleobase> {
  constructor(readonly base1: B, readonly base2: B) {}

  [Symbol.iterator]() {
    return [this.base1, this.base2].values();
  }

  /**
   * Returns true if and only if the base-pair is an A:U pair.
   */
  isAU(): boolean {
    return (
      (this.base1.isA() && this.base2.isU())
      || (this.base1.isU() && this.base2.isA())
    );
  }

  /**
   * Returns true if and only if the base-pair is an A:T pair.
   */
  isAT(): boolean {
    return (
      (this.base1.isA() && this.base2.isT())
      || (this.base1.isT() && this.base2.isA())
    );
  }

  /**
   * Returns true if and only if the base-pair is a G:C pair.
   */
  isGC(): boolean {
    return (
      (this.base1.isG() && this.base2.isC())
      || (this.base1.isC() && this.base2.isG())
    );
  }

  /**
   * Returns true if and only if the base-pair is a G:U pair.
   */
  isGU(): boolean {
    return (
      (this.base1.isG() && this.base2.isU())
      || (this.base1.isU() && this.base2.isG())
    );
  }

  /**
   * Returns true if and only if the base-pair is a G:T pair.
   */
  isGT(): boolean {
    return (
      (this.base1.isG() && this.base2.isT())
      || (this.base1.isT() && this.base2.isG())
    );
  }
}

/**
 * The `Nucleobase` interface used by the `BasePair` class.
 */
interface Nucleobase {
  isA(): boolean;
  isU(): boolean;
  isT(): boolean;
  isG(): boolean;
  isC(): boolean;
}
