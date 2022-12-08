import { syncReadFile } from '../../util/helpers';

const getCurrentDirectory = (nestedObj, pathArr) => {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== 'undefined' ? obj[key] : undefined),
    nestedObj
  );
};

// NOTE - not the prettiest, but it works :D
const generateFileSystemTree = () => {
  const fileSystem = {};
  let currentDirectoryTree = [];
  const array = syncReadFile(require.resolve('./input.txt'));

  for (let i = 0; i < array.length; i++) {
    const currentItem = array[i];
    if (currentItem.startsWith('$ cd ') && currentItem !== '$ cd ..') {
      const dirName = currentItem.split('$ cd ')[1];
      if (
        !getCurrentDirectory(fileSystem, [...currentDirectoryTree, dirName])
      ) {
        getCurrentDirectory(fileSystem, currentDirectoryTree)[dirName] = {};
      }

      currentDirectoryTree.push(dirName);
    } else if (currentItem.startsWith('$ cd ..')) {
      currentDirectoryTree = currentDirectoryTree.slice(
        0,
        currentDirectoryTree.length - 1
      );
    } else if (currentItem === '$ cd /') {
      currentDirectoryTree = ['/'];
    } else if (currentItem.startsWith('$ ls')) {
      const remainingArray = array.slice(i + 1, array.length);
      const nextCommandIndex = remainingArray.findIndex((el) =>
        el.startsWith('$')
      );

      const directoryContent = remainingArray.slice(
        0,
        nextCommandIndex > -1 ? nextCommandIndex : remainingArray.length + 1
      );

      directoryContent.map((item) => {
        if (item.startsWith('dir')) {
          const directoryName = item.split('dir ')[1];
          if (
            !getCurrentDirectory(fileSystem, currentDirectoryTree)[
              directoryName
            ]
          ) {
            getCurrentDirectory(fileSystem, currentDirectoryTree)[
              directoryName
            ] = {};
          }
        } else {
          const fileSize = parseInt(item.split(' ')[0], 10);
          const fileName = item.split(' ')[1];

          if (!getCurrentDirectory(fileSystem, currentDirectoryTree).files) {
            getCurrentDirectory(fileSystem, currentDirectoryTree).files = [
              { fileSize, fileName },
            ];
          } else {
            getCurrentDirectory(fileSystem, currentDirectoryTree).files.push({
              fileSize,
              fileName,
            });
          }
        }
      });

      if (getCurrentDirectory(fileSystem, currentDirectoryTree).files) {
        const fileSize = getCurrentDirectory(
          fileSystem,
          currentDirectoryTree
        ).files.reduce((acc, curr) => acc + curr.fileSize, 0);
        getCurrentDirectory(fileSystem, currentDirectoryTree).fileSize =
          fileSize;
      }
    }
  }
  return fileSystem;
};

//   For directories that have total cumulative file size of no more than 100000
let directorySizes = [];
const thresholdPart1 = 100000;

const getFileSystemDirectorySizes = (currDir) => {
  let currentDirSize = 0;
  for (const [key, value] of Object.entries(currDir)) {
    if (key === 'fileSize') {
      currentDirSize = currentDirSize + value;
    } else if (key !== 'files') {
      const directorySize = getFileSystemDirectorySizes(currDir[key]);
      currentDirSize = currentDirSize + directorySize;
    }
  }
  // For solution in part 1
  if (currentDirSize <= thresholdPart1 && currentDirSize !== 0) {
    directorySizes.push(currentDirSize);
  }
  //For solution in part 2
  currDir.totalSize = currentDirSize;
  return currentDirSize;
};

export function getSolutionPart1() {
  const fileSystem = generateFileSystemTree();
  getFileSystemDirectorySizes(fileSystem['/']);
  const resultPart1 = directorySizes.reduce((acc, curr) => acc + curr, 0);
  console.log({ resultPart1 });
}

let smallestDeletableDirectorySize;

const getSmallestDeletableDirectory = (currDir, needToFreeDiskSpace) => {
  Object.entries(currDir).forEach(([key, value]) => {
    if (key !== 'files' && key !== 'fileSize' && key !== 'totalSize') {
      getSmallestDeletableDirectory(currDir[key], needToFreeDiskSpace, key);
    } else if (
      key === 'totalSize' &&
      value >= needToFreeDiskSpace &&
      (!smallestDeletableDirectorySize ||
        value < smallestDeletableDirectorySize)
    ) {
      smallestDeletableDirectorySize = value;
    }
  });

  return smallestDeletableDirectorySize;
};

export function getSolutionPart2() {
  const fileSystem = generateFileSystemTree();
  const totalInitialDiskSpace = getFileSystemDirectorySizes(fileSystem['/']);
  const maxAvailableDiskSpace = 70000000 - 30000000;
  const needToFreeDiskSpace = totalInitialDiskSpace - maxAvailableDiskSpace;

  const smallestDeletableDirectorySize = getSmallestDeletableDirectory(
    fileSystem['/'],
    needToFreeDiskSpace
  );

  console.log({ resultpart2: smallestDeletableDirectorySize });
}
