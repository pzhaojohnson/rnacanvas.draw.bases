/**
 * @jest-environment jsdom
 */

import { BasePair } from './BasePair';

import { Nucleobase } from './Nucleobase';

describe('`class BasePair`', () => {
  test('`constructor()`', () => {
    let base1 = Nucleobase.create('G');
    let base2 = Nucleobase.create('C');

    let bp = new BasePair(base1, base2);

    expect(bp.base1).toBe(base1);
    expect(bp.base2).toBe(base2);
  });

  test('`[Symbol.iterator]()`', () => {
    let base1 = Nucleobase.create('A');
    let base2 = Nucleobase.create('U');

    let bp = new BasePair(base1, base2);

    expect([...bp]).toStrictEqual([base1, base2]);
  });

  test('`isAU()`', () => {
    expect((new BasePair(Nucleobase.create('A'), Nucleobase.create('U'))).isAU()).toBe(true);
    expect((new BasePair(Nucleobase.create('u'), Nucleobase.create('a'))).isAU()).toBe(true);
    expect((new BasePair(Nucleobase.create('A'), Nucleobase.create('C'))).isAU()).toBe(false);
    expect((new BasePair(Nucleobase.create('g'), Nucleobase.create('a'))).isAU()).toBe(false);
  });

  test('`isAT()`', () => {
    expect((new BasePair(Nucleobase.create('a'), Nucleobase.create('t'))).isAT()).toBe(true);
    expect((new BasePair(Nucleobase.create('T'), Nucleobase.create('A'))).isAT()).toBe(true);
    expect((new BasePair(Nucleobase.create('A'), Nucleobase.create('g'))).isAT()).toBe(false);
    expect((new BasePair(Nucleobase.create('c'), Nucleobase.create('T'))).isAT()).toBe(false);
  });

  test('`isGC()`', () => {
    expect((new BasePair(Nucleobase.create('G'), Nucleobase.create('C'))).isGC()).toBe(true);
    expect((new BasePair(Nucleobase.create('c'), Nucleobase.create('g'))).isGC()).toBe(true);
    expect((new BasePair(Nucleobase.create('G'), Nucleobase.create('A'))).isGC()).toBe(false);
    expect((new BasePair(Nucleobase.create('U'), Nucleobase.create('C'))).isGC()).toBe(false);
  });

  test('`isGU()`', () => {
    expect((new BasePair(Nucleobase.create('G'), Nucleobase.create('U'))).isGU()).toBe(true);
    expect((new BasePair(Nucleobase.create('u'), Nucleobase.create('g'))).isGU()).toBe(true);
    expect((new BasePair(Nucleobase.create('G'), Nucleobase.create('c'))).isGU()).toBe(false);
    expect((new BasePair(Nucleobase.create('A'), Nucleobase.create('U'))).isGU()).toBe(false);
  });

  test('`isGT()`', () => {
    expect((new BasePair(Nucleobase.create('G'), Nucleobase.create('T'))).isGT()).toBe(true);
    expect((new BasePair(Nucleobase.create('t'), Nucleobase.create('g'))).isGT()).toBe(true);
    expect((new BasePair(Nucleobase.create('G'), Nucleobase.create('U'))).isGT()).toBe(false);
    expect((new BasePair(Nucleobase.create('A'), Nucleobase.create('T'))).isGT()).toBe(false);
  });
});
