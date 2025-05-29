/**
 * Returns a new array containing the target bases
 * sorted to match their order in the parent sequence array.
 *
 * This function assumes that all target bases
 * are present in the parent sequence array.
 */
export function seqSorted<Nucleobase>(targetBases: Nucleobase[], parentSeq: Nucleobase[]): Nucleobase[] {
  let indices = new Map<Nucleobase, number>();

  parentSeq.forEach((b, i) => indices.set(b, i));

  // make a new array
  let sortedBases = [...targetBases];

  sortedBases.sort((b1, b2) => {
    let i1 = indices.get(b1) ?? -1;
    let i2 = indices.get(b2) ?? -1;
    return i1 - i2;
  });

  return sortedBases;
}
