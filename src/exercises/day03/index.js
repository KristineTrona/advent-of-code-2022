import { syncReadFile } from '../../util/helpers';

const priorityMap = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
};

export function getSolution() {
  // Part 1
  const array = syncReadFile(require.resolve('./input.txt'));

  const scoresPart1 = [];

  array.map((bagItems) => {
    const firstHalf = bagItems.slice(0, bagItems.length / 2);
    const secondHalf = bagItems.slice(bagItems.length / 2, bagItems.length);

    const commonItem = [...firstHalf].find((character) =>
      [...secondHalf].some((el) => el === character)
    );

    const score = priorityMap[commonItem];

    if (!score) {
      throw new Error('Missing common item');
    }

    scoresPart1.push(score);
  });

  const totalScorePart1 = scoresPart1.reduce((acc, curr) => acc + curr, 0);

  console.log({ totalScorePart1 });

  //   Part 2
  let currentSectionIndex = 0;
  const groupedElfs = array.reduce((acc, curr, index) => {
    if (index % 3 === 0 && index !== 0) {
      currentSectionIndex += 1;
    }
    console.log({ currentSectionIndex });

    if (acc[currentSectionIndex]) {
      acc[currentSectionIndex].push(curr);
    } else {
      acc[currentSectionIndex] = [];
      acc[currentSectionIndex].push(curr);
    }
    return acc;
  }, []);

  const scoresPart2 = [];

  groupedElfs.map((elfGroup) => {
    const firstElf = elfGroup[0];
    const secondElf = elfGroup[1];
    const thirdElf = elfGroup[2];

    const commonItem = [...firstElf].find(
      (item) =>
        [...secondElf].some((el) => el === item) &&
        [...thirdElf].some((el) => el === item)
    );

    const score = priorityMap[commonItem];

    if (!score) {
      throw new Error('Missing common item');
    }

    scoresPart2.push(score);
  });

  const totalScorePart2 = scoresPart2.reduce((acc, curr) => acc + curr, 0);

  console.log({ totalScorePart2 });
}
