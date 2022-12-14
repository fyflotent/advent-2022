import { getInput } from '../getInput';
import { splitLines } from './textUtils';
import { DayFunctions } from './types';

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(7)));
  return 'output';
};

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(7)));

  return 'output';
};

export const day7: DayFunctions = { part1, part2 };
