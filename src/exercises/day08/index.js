import { syncReadFile } from '../../util/helpers';

const getTreeGrid = () => {
  const treeGrid = syncReadFile(require.resolve('./input.txt'));
  return treeGrid
    .map((item) => [...item])
    .map((row) => row.map((item) => parseInt(item, 10)));
};

const treeGrid = getTreeGrid();

const isTreeVisible = (
  row,
  rowIndex,
  tree,
  treeIndex,
  horizontalLength,
  verticalLength
) => {
  const sameRowBefore = row.slice(0, treeIndex);
  const sameRowAfter = row.slice(treeIndex + 1, row.length);
  const sameColumnBefore = treeGrid.filter((_, index) => index < rowIndex);
  const sameColumnAfter = treeGrid.filter((_, index) => index > rowIndex);
  if (
    rowIndex === 0 ||
    treeIndex === 0 ||
    rowIndex === verticalLength - 1 ||
    treeIndex === horizontalLength - 1
  ) {
    return true;
  } else if (
    sameRowBefore.every((item) => item < tree) ||
    sameRowAfter.every((item) => item < tree) ||
    sameColumnBefore.every((gridRow) => gridRow[treeIndex] < tree) ||
    sameColumnAfter.every((gridRow) => gridRow[treeIndex] < tree)
  ) {
    return true;
  }
};

export function getSolutionPart1() {
  let visibleTreeCount = 0;

  treeGrid.map((row, rowIndex) => {
    row.map((tree, treeIndex) => {
      if (
        isTreeVisible(
          row,
          rowIndex,
          tree,
          treeIndex,
          row.length,
          treeGrid.length
        )
      ) {
        visibleTreeCount += 1;
      }
    });
  });

  console.log({ answerPart1: visibleTreeCount });
}

const getTreeScore = (
  row,
  rowIndex,
  tree,
  treeIndex,
  horizontalLength,
  verticalLength
) => {
  const sameRowBefore = row.slice(0, treeIndex).reverse();
  const sameRowAfter = row.slice(treeIndex + 1, row.length);
  const sameColumnBefore = treeGrid
    .filter((_, index) => index < rowIndex)
    .map((gridRow) => gridRow[treeIndex])
    .reverse();
  const sameColumnAfter = treeGrid
    .filter((_, index) => index > rowIndex)
    .map((gridRow) => gridRow[treeIndex]);

  const leftCutOffIndex = sameRowBefore.findIndex((item) => item >= tree);
  const left =
    treeIndex === 0
      ? 0
      : leftCutOffIndex === -1
      ? sameRowBefore.length
      : sameRowBefore.slice(0, leftCutOffIndex + 1).length;

  const rightCutOffIndex = sameRowAfter.findIndex((item) => item >= tree);
  const right =
    treeIndex === horizontalLength - 1
      ? 0
      : rightCutOffIndex === -1
      ? sameRowAfter.length
      : sameRowAfter.slice(0, rightCutOffIndex + 1).length;

  const upCutOffIndex = sameColumnBefore.findIndex((item) => item >= tree);
  const up =
    rowIndex === 0
      ? 0
      : upCutOffIndex === -1
      ? sameColumnBefore.length
      : sameColumnBefore.slice(0, upCutOffIndex + 1).length;

  const downCutOffIndex = sameColumnAfter.findIndex((item) => item >= tree);
  const down =
    rowIndex === verticalLength - 1
      ? 0
      : downCutOffIndex === -1
      ? sameColumnAfter.length
      : sameColumnAfter.slice(0, downCutOffIndex + 1).length;

  return left * right * up * down;
};

export function getSolutionPart2() {
  const treeScoreArrays = treeGrid.map((row, rowIndex) => {
    return row.map((tree, treeIndex) => {
      const score = getTreeScore(
        row,
        rowIndex,
        tree,
        treeIndex,
        row.length,
        treeGrid.length
      );
      return score;
    });
  });

  const highestScoresPerRow = treeScoreArrays.map((rowOfScores) =>
    Math.max(...rowOfScores)
  );

  const highestScore = Math.max(...highestScoresPerRow);

  console.log({ answerPart2: highestScore });
}
