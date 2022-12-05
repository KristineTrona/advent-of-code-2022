import { syncReadFile } from '../../util/helpers';

export function getSolution() {
  const array = syncReadFile(require.resolve('./input.txt'));

  let resultPart1 = 0;
  let resultPart2 = 0;

  array.map((item) => {
    const firstElf = item.split(',')[0];
    const secondElf = item.split(',')[1];

    const firstElfStart = parseInt(firstElf.split('-')[0], 10);
    const firstElfEnd = parseInt(firstElf.split('-')[1], 10);

    const secondElfStart = parseInt(secondElf.split('-')[0], 10);
    const secondElfEnd = parseInt(secondElf.split('-')[1], 10);

    if (
      (firstElfStart >= secondElfStart && firstElfEnd <= secondElfEnd) ||
      (secondElfStart >= firstElfStart && secondElfEnd <= firstElfEnd)
    ) {
      resultPart1 += 1;
    }
  });

  console.log({ resultPart1 });

  array.map((item) => {
    const firstElf = item.split(',')[0];
    const secondElf = item.split(',')[1];

    const firstElfStart = parseInt(firstElf.split('-')[0], 10);
    const firstElfEnd = parseInt(firstElf.split('-')[1], 10);

    const secondElfStart = parseInt(secondElf.split('-')[0], 10);
    const secondElfEnd = parseInt(secondElf.split('-')[1], 10);

    if (
      (firstElfStart >= secondElfStart && firstElfStart <= secondElfEnd) ||
      (secondElfStart >= firstElfStart && secondElfStart <= firstElfEnd) ||
      (firstElfStart <= secondElfEnd && firstElfStart >= secondElfStart) ||
      (secondElfStart <= firstElfEnd && secondElfStart >= firstElfStart)
    ) {
      resultPart2 += 1;
    }
  });

  console.log({ resultPart2 });
}
