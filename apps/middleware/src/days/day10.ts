import { getInput } from '../getInput';
import { splitLines } from './textUtils';
import { DayFunctions } from './types';

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(10)));

  return 'output';
};

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(10)));

  return 'output';
};

export const day10: DayFunctions = { part1, part2 };
