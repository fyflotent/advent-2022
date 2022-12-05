import { getInput } from '../getInput';
import { splitLines } from './textUtils';
import { DayFunctions } from './types';

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(5)));

  return '';
};

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(5)));
  return '';
};

export const day5: DayFunctions = { part1, part2 };
