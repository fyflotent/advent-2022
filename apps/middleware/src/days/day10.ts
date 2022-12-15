import { getInput } from '../getInput';
import { last } from './arrayUtils';
import { sum } from './mathUtils';
import { splitLines } from './textUtils';
import { DayFunctions } from './types';

const noop = (current: number[]): number[] => {
  const lastRegister = last(current);
  if (lastRegister === undefined) throw Error('Last register not set noop');
  return [...current, lastRegister];
};

const addx = (current: number[], input: number): number[] => {
  const lastRegister = last(current);
  if (lastRegister === undefined) throw Error('Last register not set addx');
  return [...current, lastRegister, lastRegister + input];
};

const commandToAction = (
  current: number[],
  command: string,
  input: number
): number[] => {
  switch (command) {
    case 'addx':
      return addx(current, input);
    case 'noop':
      return noop(current);
    default:
      return noop(current);
  }
};

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(10)));
  const initialTape = [1];
  const states = input.reduce<number[]>((currentTape, currentLine) => {
    const [command, numberString] = currentLine.split(' ');
    return commandToAction(currentTape, command, parseInt(numberString));
  }, initialTape);
  const totalKeys = [
    ...new Array(Math.floor((states.length - 20) / 40) + 1).keys(),
  ]
    .map((index) => index * 40 + 20)
    .map((index) => states[index - 1] * index);
  return `${sum(totalKeys)}`;
};

const checkOverlap = (sprite: number, position: number) => {
  return position >= sprite - 1 && position <= sprite + 1;
};

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(10)));
  const initialTape = [1];
  const states = input.reduce<number[]>((currentTape, currentLine) => {
    const [command, numberString] = currentLine.split(' ');
    return commandToAction(currentTape, command, parseInt(numberString));
  }, initialTape);
  const drawing = states.map((spriteCenter, unmodulatedPosition) => {
    const currentPosition = unmodulatedPosition % 40;
    if (checkOverlap(spriteCenter, currentPosition))
      return '#' + (currentPosition === 39 ? '\n' : '');
    return '.' + (currentPosition === 39 ? '\n' : '');
  });

  return drawing.join('');
};

export const day10: DayFunctions = { part1, part2 };
