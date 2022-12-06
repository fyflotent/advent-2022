import { getInput } from '../getInput';
import { DayFunctions } from './types';

const allUniq = (str: string[]) => {
  return new Set(str).size === str.length;
};

const findFirstBuffer = (buffer: string) => {
  return buffer.split('').reduce<number>((finalIndex, _, index) => {
    if (finalIndex !== 0) return finalIndex;
    if (index < 4) return finalIndex;
    if (allUniq(buffer.split('').slice(index - 4, index))) return index;
    return 0;
  }, 0);
};

const part1 = async (optionalInput?: string) => {
  const input = optionalInput ?? (await getInput(6));

  return findFirstBuffer(input).toString();
};

const findFirstBufferMessage = (buffer: string) => {
  return buffer.split('').reduce<number>((finalIndex, _, index) => {
    if (finalIndex !== 0) return finalIndex;
    if (index < 14) return finalIndex;
    if (allUniq(buffer.split('').slice(index - 14, index))) return index;
    return 0;
  }, 0);
};

const part2 = async (optionalInput?: string) => {
  const input = optionalInput ?? (await getInput(6));

  return findFirstBufferMessage(input).toString();
};

export const day6: DayFunctions = { part1, part2 };
