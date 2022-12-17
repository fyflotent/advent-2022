import { getInput } from '../getInput';
import { sum } from './mathUtils';
import { splitLines } from './textUtils';
import { DayFunctions } from './types';

export const parseAndReturnArray = (line: string) => JSON.parse(line);

export const stringifyAndReturn = (line: string) => JSON.stringify(line);

const compareItem = (item1: unknown, item2: unknown): boolean | undefined => {
  if (typeof item1 === 'number' && typeof item2 === 'number') {
    return item1 === item2 ? undefined : item1 < item2;
  }
  if (Array.isArray(item1)) {
    const item2Array = Array.isArray(item2) ? item2 : [item2];
    return pairInOrder(item1, item2Array);
  }
  if (Array.isArray(item2)) {
    const item1Array = Array.isArray(item1) ? item1 : [item1];
    return pairInOrder(item1Array, item2);
  }
  return false;
};

export const pairInOrder = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array1: any[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  array2: any[]
): boolean | undefined => {
  const item1 = array1.at(0);
  const item2 = array2.at(0);
  // both arrays are equal to this point so if item1 is defined then it should be second
  if (item1 !== undefined && item2 === undefined) return false;
  // both arrays are equal but the right side is longer
  if (item1 === undefined && item2 !== undefined) return true;
  // both sides are equal length
  if (item1 === undefined && item2 === undefined) return undefined;
  const comparison = compareItem(item1, item2);
  if (comparison === false) return false;

  if (comparison === true) return true;
  return pairInOrder(array1.slice(1), array2.slice(1));
};

const part1 = async (optionalInput?: string) => {
  const input = optionalInput ?? (await getInput(13));
  const inputLines = input.split('\n\n');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputLinePairs: [number, any[][]][] = inputLines.map(
    (linePairs, index) => [
      index + 1,
      splitLines(linePairs).map((line) => {
        return parseAndReturnArray(line);
      }),
    ]
  );
  const output = inputLinePairs
    .map(([index, [array1, array2]]) => {
      return [index, pairInOrder(array1, array2) ?? true] as const;
    })
    .filter(([_, inOrder]) => inOrder)
    .map((tuple) => tuple[0]);

  return sum(output).toString();
};

const part2 = async (optionalInput?: string) => {
  const input = optionalInput ?? (await getInput(13));
  const inputLinePairs = input.split('\n\n');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const inputLines: any[][] = [
    ...inputLinePairs.flatMap((linePairs) =>
      splitLines(linePairs).map((line) => {
        return parseAndReturnArray(line);
      })
    ),
    [[2]],
    [[6]],
  ];

  inputLines.sort((a, b) => {
    const order = pairInOrder(a, b);
    return order === undefined ? 0 : order === false ? 1 : -1;
  });

  const indexDiv1 =
    inputLines.findIndex((a) => JSON.stringify(a) === '[[2]]') + 1;
  const indexDiv2 =
    inputLines.findIndex((a) => JSON.stringify(a) === '[[6]]') + 1;

  return `${indexDiv1 * indexDiv2}`;
};

export const day13: DayFunctions = { part1, part2 };
