import { getInput } from '../getInput';
import { splitLines } from './textUtils';
import { DayFunctions } from './types';

type CrateStacks = Record<number, string[]>;

const getCrateInput = (inputArr: string[]) => {
  const crates = inputArr.slice(0, inputArr.indexOf(''));
  const lastRow = crates.pop();
  if (!lastRow) throw Error('no last row');
  const crateColumns: number[] = lastRow
    .trim()
    .split(/\s*/)
    .map((a) => parseInt(a));
  const crateRegex = new RegExp(crateColumns.map(() => '(...)').join(' '));

  const columnStacks: CrateStacks = crates.reverse().reduce(
    (currStacks, currRow) => {
      const results = crateRegex.exec(currRow);
      if (!results) throw Error('no result');

      const crateArray = results
        .slice(1)
        .map((crate) =>
          crate.trim() === '' ? undefined : crate.trim().charAt(1)
        );
      return crateColumns.reduce((curr, index) => {
        const t = crateArray[index - 1];
        return t ? { ...curr, [index]: [...curr[index], t] } : curr;
      }, currStacks);
    },
    crateColumns.reduce<CrateStacks>(
      (currRecord, column) => ({ ...currRecord, [column]: [] }),
      {}
    )
  );
  return columnStacks;
};

interface Move {
  numberToMove: number;
  from: number;
  to: number;
}

const getMoves = (inputArr: string[]): Move[] => {
  const moveStrings = inputArr
    .slice(inputArr.indexOf(''))
    .filter((a) => a !== '');
  const moveRegex = new RegExp(/move (\d+) from (\d+) to (\d+)/);
  const moves = moveStrings.map((moveString) => {
    const result = moveRegex.exec(moveString);
    if (!result) {
      console.error(moveString);
      throw Error('no move regex result');
    }

    return {
      numberToMove: parseInt(result[1]),
      from: parseInt(result[2]),
      to: parseInt(result[3]),
    };
  });
  return moves;
};

const doMove = (stacks: CrateStacks, move: Move): CrateStacks => {
  const _ = [...Array(move.numberToMove).keys()].forEach(() => {
    const crate = stacks[move.from].pop();
    if (!crate) {
      throw Error('Illegal move');
    }
    stacks[move.to].push(crate);
  });
  return stacks;
};

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(5)));
  const initialCrates = getCrateInput(input);
  const moves = getMoves(input);
  const finalStack: CrateStacks = moves.reduce<CrateStacks>(
    doMove,
    initialCrates
  );

  return [...Array(Object.keys(finalStack).length).keys()]
    .map((idx) => finalStack[idx + 1].pop())
    .join('');
};

const doMove9001 = (stacks: CrateStacks, move: Move): CrateStacks => {
  const chunk = stacks[move.from].length - move.numberToMove;
  const stackFrom = stacks[move.from].slice(0, chunk);
  const movedStack = stacks[move.from].slice(chunk);
  if (movedStack.length != move.numberToMove) {
    console.error('length, num', movedStack.length, move.numberToMove);
    throw Error('oops');
  }
  stacks[move.from] = stackFrom;
  stacks[move.to] = [...stacks[move.to], ...movedStack];
  return stacks;
};

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(5)));
  const initialCrates = getCrateInput(input);
  const moves = getMoves(input);
  const finalStack: CrateStacks = moves.reduce<CrateStacks>(
    doMove9001,
    initialCrates
  );

  return [...Array(Object.keys(finalStack).length).keys()]
    .map((idx) => finalStack[idx + 1].pop())
    .join('');
};

export const day5: DayFunctions = { part1, part2 };
