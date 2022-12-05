import { syncReadFile } from '../../util/helpers';

export function getSolution() {
  const array = syncReadFile(require.resolve('./elfCalories.txt'));

  let currentTotal = 0;
  let caloriesPerElf = [];
  array
    .map((item) => (item === '' ? item : parseInt(item, 10)))
    .reduce((acc, curr, index) => {
      if (curr !== '') {
        currentTotal = currentTotal + curr;
      } else {
        caloriesPerElf.push(currentTotal);
        currentTotal = 0;
      }
    }, 0);

  const mostCalories = caloriesPerElf.reduce(
    (acc, curr) => (curr > acc ? curr : acc),
    0
  );

  const sortedCaloriesPerElf = caloriesPerElf.sort((a, b) => b - a);
  console.log({ sortedCaloriesPerElf });

  const caloriesTopThree =
    sortedCaloriesPerElf[0] + sortedCaloriesPerElf[1] + sortedCaloriesPerElf[2];

  console.log({ caloriesTopThree });
}
