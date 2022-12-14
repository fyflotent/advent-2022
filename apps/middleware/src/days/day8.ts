import { getInput } from '../getInput';
import { sum } from './mathUtils';
import { splitCharacters, splitLines } from './textUtils';
import { DayFunctions } from './types';

const getTreeMatrix = (lines: string[]): number[][] =>
  lines.map((line) => splitCharacters(line).map((tree) => parseInt(tree, 10)));

const getTreeColumn = (
  treeMatrix: number[][],
  columnNumber: number
): number[] => treeMatrix.map((row) => row[columnNumber]);

const findVisibleTrees = (treeArray: number[]): boolean[] =>
  treeArray.reduce<[boolean[], number]>(
    ([count, tallestTree], tree) => {
      if (tree > tallestTree) return [[...count, true], tree];

      return [[...count, false], tallestTree];
    },
    [[], -1]
  )[0];

const orRows = (boolRow1: boolean[], boolRow2: boolean[]) =>
  boolRow1.map((b1, index) => b1 || boolRow2[index]);

const rotateClockWise = <T>(matrix: T[][]) =>
  matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());

const getAllVisibility = (treeMatrix: number[][]) => {
  const leftVisibility = treeMatrix.map(findVisibleTrees);
  const treeMatrix90 = rotateClockWise(treeMatrix);
  const leftDownVisibility = rotateClockWise(leftVisibility).map(
    (currRow, idx) => orRows(findVisibleTrees(treeMatrix90[idx]), currRow)
  );
  const treeMatrix180 = rotateClockWise(treeMatrix90);
  const leftDownRightVisibility = rotateClockWise(leftDownVisibility).map(
    (currRow, idx) => orRows(findVisibleTrees(treeMatrix180[idx]), currRow)
  );
  const treeMatrix270 = rotateClockWise(treeMatrix180);
  const allVisibility = rotateClockWise(leftDownRightVisibility).map(
    (currRow, idx) => orRows(findVisibleTrees(treeMatrix270[idx]), currRow)
  );

  return rotateClockWise(allVisibility);
};

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(8)));

  const treeMatrix = getTreeMatrix(input);
  const allVisibility = getAllVisibility(treeMatrix);

  return `${sum(
    allVisibility.map((row) => sum(row.map((bool) => (bool ? 1 : 0))))
  )}`;
};

const countVisibleTrees = (treeArray: number[], treeToCheck: number): number =>
  treeArray.reduce<[number, number]>(
    ([count, tallestTree], tree) => {
      if (treeToCheck >= tree && treeToCheck > tallestTree) {
        return [count + 1, tree > tallestTree ? tree : tallestTree];
      }
      if (treeToCheck > tallestTree) {
        return [count + 1, tree > tallestTree ? tree : tallestTree];
      }

      return [count, tallestTree];
    },
    [0, -1]
  )[0];

const calculateBothDirections = (
  treeArray: number[],
  currTreeIndex: number
) => {
  //Reverse to see from currTree perspective
  const columnSlice1 = treeArray.slice(0, currTreeIndex).reverse();

  const columnSlice2 = treeArray.slice(currTreeIndex + 1);
  return (
    countVisibleTrees(columnSlice1, treeArray[currTreeIndex]) *
    countVisibleTrees(columnSlice2, treeArray[currTreeIndex])
  );
};

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(8)));

  const treeMatrix = getTreeMatrix(input);
  const final = treeMatrix.map((row, rowNumber) =>
    row.map((_, columnNumber) => {
      const treeColumn = getTreeColumn(treeMatrix, columnNumber);
      const upDown = calculateBothDirections(treeColumn, rowNumber);
      const leftRight = calculateBothDirections(row, columnNumber);
      return upDown * leftRight;
    })
  );
  return Math.max(...final.map((row) => Math.max(...row))).toString();
};

export const day8: DayFunctions = { part1, part2 };
