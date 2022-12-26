import { getInput } from '../getInput';
import { sum } from './mathUtils';
import { splitCharacters, splitLines } from './textUtils';
import { DayFunctions } from './types';

const readSNAFUDigit = (snafuDigit: string) => {
  switch (snafuDigit) {
    case '2':
      return 2;
    case '1':
      return 1;
    case '0':
      return 0;
    case '-':
      return -1;
    case '=':
      return -2;
    default:
      throw Error('Not a SNAFU digit');
  }
};

const readDigitAsSnafu = (snafuDigit: number): string => {
  switch (snafuDigit) {
    case 2:
      return '2';
    case 1:
      return '1';
    case 0:
      return '0';
    case -1:
      return '-';
    case -2:
      return '=';
    default:
      throw Error('Not a SNAFU digit');
  }
};

export const readSNAFUNumber = (snafu: string): number => {
  return sum(
    snafu
      .split('')
      .slice()
      .reverse()
      .map((snafuDigit, idx) => {
        return readSNAFUDigit(snafuDigit) * 5 ** idx;
      })
  );
};

const convertBase5ToSNAFU = (base: number) => {
  switch (base) {
    case 0:
    case 1:
    case 2:
      return `${base}`;
    case 3:
      return '1=';
    case 4:
      return '1-';
    default:
      throw new Error(`Cannot convert to SNAFU ${base}`);
  }
};

export const addSNAFUs = (snafu1: string, snafu2: string): string => {
  const op1 =
    snafu1.length > snafu2.length
      ? splitCharacters(snafu1).slice().reverse()
      : splitCharacters(snafu2).slice().reverse();
  const op2 =
    snafu1.length <= snafu2.length
      ? splitCharacters(snafu1).slice().reverse()
      : splitCharacters(snafu2).slice().reverse();
  const [finalCarry, result] = op1.reduce<[number, string]>(
    ([carry, curr], newPlace, idx) => {
      const snafu2AtPlace = readSNAFUDigit(op2.at(idx) ?? '0');
      const snafu1AtPlace = readSNAFUDigit(newPlace);
      const total = carry + snafu1AtPlace + snafu2AtPlace;
      if (total > 2) {
        return [1, `${readDigitAsSnafu(total - 5)}${curr}`];
      }
      if (total < -2) {
        return [-1, `${readDigitAsSnafu(5 + total)}${curr}`];
      }
      return [0, `${readDigitAsSnafu(total)}${curr}`];
    },
    [0, '']
  );
  return finalCarry === 0 ? result : finalCarry + result;
};

export const convertToSNAFUNumber = (num: number): string => {
  let currNum = num;
  let snafuNum = '0';
  let position = 0;

  while (currNum !== 0 && position < 50) {
    const newNum = currNum % 5;
    currNum = (currNum - newNum) / 5;
    const newSnafu =
      convertBase5ToSNAFU(newNum) + new Array(position).fill(0).join('');
    snafuNum = addSNAFUs(newSnafu, snafuNum);
    position += 1;
  }
  return snafuNum;
};

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(25)));
  const digitSum = sum(input.map(readSNAFUNumber));
  return convertToSNAFUNumber(digitSum);
};

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(25)));

  return 'output';
};

export const day25: DayFunctions = { part1, part2 };
