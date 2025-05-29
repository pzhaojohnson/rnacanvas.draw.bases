import { seqSorted } from './seqSorted';

test('`function seqSorted()`', () => {
  var parentSeq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => new NucleobaseMock());

  var b1 = parentSeq[0];
  var b2 = parentSeq[1];
  var b3 = parentSeq[2];
  var b4 = parentSeq[3];
  var b5 = parentSeq[4];
  var b6 = parentSeq[5];
  var b7 = parentSeq[6];
  var b8 = parentSeq[7];
  var b9 = parentSeq[8];
  var b10 = parentSeq[9];

  expect(seqSorted([], [])).toStrictEqual([]);

  // empty target bases array
  expect(seqSorted([], parentSeq)).toStrictEqual([]);

  expect(seqSorted([b5, b3, b8, b2, b1, b10], parentSeq)).toStrictEqual([b1, b2, b3, b5, b8, b10]);

  // repeat bases
  expect(seqSorted([b3, b8, b3, b2, b9, b7, b6, b2, b1], parentSeq)).toStrictEqual([b1, b2, b2, b3, b3, b6, b7, b8, b9]);

  // returns a new array and does not modify the target bases array
  var targetBases = [b6, b2, b3, b7];
  expect(seqSorted(targetBases, parentSeq)).toStrictEqual([b2, b3, b6, b7]);
  expect(seqSorted(targetBases, parentSeq)).not.toBe(targetBases);
  expect(targetBases).toStrictEqual([b6, b2, b3, b7]); // was not modified
});

class NucleobaseMock {
  // make each base unique
  id = Math.random();
}
