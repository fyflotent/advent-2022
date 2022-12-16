import { parse } from 'yaml';
import { getInput } from '../getInput';
import { splitLines } from './textUtils';
import { DayFunctions } from './types';

export const parseAndReturnArray = (line: string) => parse(line);

const compareItem = (item1: unknown, item2: unknown): boolean => {
  if (typeof item1 === 'number' && typeof item2 === 'number') {
    return item1 <= item2;
  }
  if (Array.isArray(item1)) {
    const item2Array = Array.isArray(item2) ? item2 : [item2];
    // Pad the right side array with max number since we assume in
    // pairInOrder that the right side array ending is a failure.
    const item2ArrayWithFiller =
      item2Array.length < item1.length && item2Array.length !== 0
        ? item1.map(
            (_, index) => item2Array.at(index) ?? Number.MAX_SAFE_INTEGER
          )
        : item2Array;
    return pairInOrder(item1, item2ArrayWithFiller);
  }
  if (Array.isArray(item2)) {
    const item1Array = Array.isArray(item1) ? item1 : [item1];
    // Pad the right side array with max number since we assume in
    // pairInOrder that the right side array ending is a failure.
    const item2ArrayWithFiller =
      item2.length < item1Array.length && item2.length !== 0
        ? item1Array.map(
            (_, index) => item2.at(index) ?? Number.MAX_SAFE_INTEGER
          )
        : item2;
    return pairInOrder(item1Array, item2ArrayWithFiller);
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pairInOrder = (array1: any[], array2: any[]): boolean => {
  const item1 = array1.at(0);
  const item2 = array2.at(0);
  // both arrays are equal to this point so if item1 is defined then it should be second
  if (item1 !== undefined && item2 === undefined) return false;
  // both arrays are equal but the right side is longer
  if (item1 === undefined && item2 !== undefined) return true;
  // both sides are equal length
  if (item1 === undefined && item2 === undefined) return true;
  if (!compareItem(item1, item2)) return false;

  return pairInOrder(array1.slice(1), array2.slice(1));
};

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(13)));

  return 'output';
};

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(13)));

  return 'output';
};

export const day13: DayFunctions = { part1, part2 };
