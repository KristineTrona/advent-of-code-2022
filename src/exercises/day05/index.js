import { syncReadFile } from '../../util/helpers';

const formattedCratesPart1 = [
  ['F', 'C', 'J', 'P', 'H', 'T', 'W'],
  ['G', 'R', 'V', 'F', 'Z', 'J', 'B', 'H'],
  ['H', 'P', 'T', 'R'],
  ['Z', 'S', 'N', 'P', 'H', 'T'],
  ['N', 'V', 'F', 'Z', 'H', 'J', 'C', 'D'],
  ['P', 'M', 'G', 'F', 'W', 'D', 'Z'],
  ['M', 'V', 'Z', 'W', 'S', 'J', 'D', 'P'],
  ['N', 'D', 'S'],
  ['D', 'Z', 'S', 'F', 'M'],
];

const formattedCratesPart2 = [
  ['F', 'C', 'J', 'P', 'H', 'T', 'W'],
  ['G', 'R', 'V', 'F', 'Z', 'J', 'B', 'H'],
  ['H', 'P', 'T', 'R'],
  ['Z', 'S', 'N', 'P', 'H', 'T'],
  ['N', 'V', 'F', 'Z', 'H', 'J', 'C', 'D'],
  ['P', 'M', 'G', 'F', 'W', 'D', 'Z'],
  ['M', 'V', 'Z', 'W', 'S', 'J', 'D', 'P'],
  ['N', 'D', 'S'],
  ['D', 'Z', 'S', 'F', 'M'],
];

const getInstructions = () => {
  const instructions = syncReadFile(require.resolve('./input.txt'));

  const formattedInstructions = instructions.map((instruction) => {
    const numberOfCreates = parseInt(
      instruction.split('move ')[1].split(' ')[0],
      10
    );

    const startStack =
      parseInt(instruction.split('from ')[1].charAt(0), 10) - 1;

    const endStack = parseInt(instruction.split('to ')[1].charAt(0), 10) - 1;

    return { numberOfCreates, startStack, endStack };
  });
  return formattedInstructions;
};

export function getSolutionPart1() {
  const instructions = getInstructions();

  instructions.map(({ numberOfCreates, startStack, endStack }) => {
    let cratesToHandle = numberOfCreates;

    while (cratesToHandle > 0) {
      const startPile = formattedCratesPart1[startStack];

      formattedCratesPart1[endStack].push(startPile[startPile.length - 1]);
      formattedCratesPart1[startStack] = startPile.slice(
        0,
        startPile.length - 1
      );
      cratesToHandle -= 1;
    }
  });

  const result = formattedCratesPart1.map((item) => item[item.length - 1]);
  console.log({ result });
}

export function getSolutionPart2() {
  const instructions = getInstructions();

  instructions.map(({ numberOfCreates, startStack, endStack }) => {
    const startPile = formattedCratesPart2[startStack];

    const sectionToBeMoved = startPile.slice(
      startPile.length - numberOfCreates,
      startPile.length
    );

    formattedCratesPart2[endStack].push(...sectionToBeMoved);
    formattedCratesPart2[startStack] = startPile.slice(
      0,
      startPile.length - numberOfCreates
    );
  });

  const result = formattedCratesPart2.map((item) => item[item.length - 1]);
  console.log({ result });
}
