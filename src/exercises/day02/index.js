import { syncReadFile } from '../../util/helpers';

const legend = {
  A: {
    id: 'rock',
    youPlay: 'X',
    score: 1,
  },
  B: {
    id: 'paper',
    youPlay: 'Y',
    score: 2,
  },
  C: {
    id: 'scissors',
    youPlay: 'Z',
    score: 3,
  },
};

// 0 if lost
// 3 if draw
// 6 if won

export function getSolution() {
  const scores = [];
  const array = syncReadFile(require.resolve('./strategy.txt'));

  // const test = array.map(item => {
  //     const round = item.split(" ")

  //     const opponent = round[0]
  //     const me = round[1]

  //     if(opponent === "A" && me === "X"){ //draw 3 + rock 1
  //         scores.push(4)
  //     } else if( opponent === "A" && me === "Y") { // win 6 + paper 2
  //         scores.push(8)
  //     } else if( opponent === "A" && me === "Z") { // loose 0 + scissors 3
  //         scores.push(3)
  //     } else if( opponent === "B" && me === "X") { // loose 0 + rock 1
  //         scores.push(1)
  //     } else if( opponent === "B" && me === "Y") { // draw 3 + paper 2
  //         scores.push(5)
  //     } else if( opponent === "B" && me === "Z") { // win 6 + scissors 3
  //         scores.push(9)
  //     } else if( opponent === "C" && me === "X") { // win 6 + rock 1
  //         scores.push(7)
  //     } else if( opponent === "C" && me === "Y") { // loose 0 + paper 2
  //         scores.push(2)
  //     } else if( opponent === "C" && me === "Z") { // draw 3 + scissors 3
  //         scores.push(6)
  //     }
  // })

  const test2 = array.map((item) => {
    const round = item.split(' ');

    const opponent = round[0];
    const me = round[1];

    // X - NEED TO LOOSE
    // Y - DRAW
    // Z - NEED TO WIN

    if (opponent === 'A' && me === 'X') {
      //need to looose, play scissors = 0 + 3
      scores.push(3);
    } else if (opponent === 'A' && me === 'Y') {
      // need to draw, play rock = 3 + 1
      scores.push(4);
    } else if (opponent === 'A' && me === 'Z') {
      // need to win, play paper = 6 + 2
      scores.push(8);
    } else if (opponent === 'B' && me === 'X') {
      // need to loose, play rock = 1 + 0
      scores.push(1);
    } else if (opponent === 'B' && me === 'Y') {
      // need to draw, play paper = 2 + 3
      scores.push(5);
    } else if (opponent === 'B' && me === 'Z') {
      // need to win, play scissors = 6 + 3
      scores.push(9);
    } else if (opponent === 'C' && me === 'X') {
      // need to loose, play paper = 0 + 2
      scores.push(2);
    } else if (opponent === 'C' && me === 'Y') {
      // need to draw, play scissors = 3 + 3
      scores.push(6);
    } else if (opponent === 'C' && me === 'Z') {
      // need to win, play rock = 6 + 1
      scores.push(7);
    }
  });

  const result = scores.reduce((acc, curr) => acc + curr, 0);
  console.log({ result });
}
