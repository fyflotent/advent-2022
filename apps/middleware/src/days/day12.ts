import { getInput } from '../getInput';
import { splitCharacters, splitLines } from './textUtils';
import { DayFunctions } from './types';

interface Position {
  x: number;
  y: number;
}

export enum PositionType {
  Start,
  Goal,
  Position,
}

interface Moves {
  positionType: PositionType;
  up?: Position;
  right?: Position;
  left?: Position;
  down?: Position;
}

const hashPosition = (position: Position) => `${position.x},${position.y}`;

export const checkValidMove = (
  char1: string,
  char2: string | undefined
): boolean | undefined => {
  if (!char2) return undefined;
  if (char1 === 'E') return undefined;
  if (char2 === 'E') return char1 === 'y' || char1 === 'z';
  const char1Code = char1 === 'S' ? 'a'.charCodeAt(0) : char1.charCodeAt(0);
  const char2Code = char2 === 'S' ? 'a'.charCodeAt(0) : char2.charCodeAt(0);
  if (char1Code + 1 === char2Code || char2Code <= char1Code) return true;
  return false;
};

const getLetterAtPosition = (
  x: number,
  y: number,
  rawInputLines: string[]
): string | undefined => rawInputLines[y]?.charAt(x);

const getMovesAtPosition = (x: number, y: number, moves: Moves[][]): Moves =>
  moves[y][x];

export const convertPositionToMove = (
  position: Position,
  rawInputLines: string[]
): Moves => {
  const positionLetter = getLetterAtPosition(
    position.x,
    position.y,
    rawInputLines
  );
  if (positionLetter === undefined) throw Error('Got undefined position');
  const positionType: PositionType =
    positionLetter === 'E'
      ? PositionType.Goal
      : positionLetter === 'S'
      ? PositionType.Start
      : PositionType.Position;

  const returnMove = (x: number, y: number) => {
    return checkValidMove(
      positionLetter,
      getLetterAtPosition(x, y, rawInputLines)
    )
      ? { x, y }
      : undefined;
  };
  const up = returnMove(position.x, position.y - 1);
  const right = returnMove(position.x + 1, position.y);
  const left = returnMove(position.x - 1, position.y);
  const down = returnMove(position.x, position.y + 1);
  return {
    positionType,
    up,
    right,
    left,
    down,
  };
};

export const convertLinesToMoveMatrix = (
  input: string[]
): [Position, Position, Moves[][]] =>
  input.reduce<[Position, Position, Moves[][]]>(
    ([start, end, matrix], currLine, currY) => {
      const [foundStart, foundEnd, newMoveLine] = splitCharacters(
        currLine
      ).reduce<[Position | undefined, Position | undefined, Moves[]]>(
        ([newStart, newEnd, newLine], _, currX) => {
          const move = convertPositionToMove({ x: currX, y: currY }, input);
          return [
            move.positionType === PositionType.Start
              ? { x: currX, y: currY }
              : newStart,
            move.positionType === PositionType.Goal
              ? { x: currX, y: currY }
              : newEnd,
            [...newLine, move],
          ];
        },
        [undefined, undefined, []]
      );
      return [foundStart ?? start, foundEnd ?? end, [...matrix, newMoveLine]];
    },
    [{ x: 0, y: 0 }, { x: 0, y: 0 }, []]
  );

const potentialMoves: Array<
  keyof Pick<Moves, 'up' | 'down' | 'right' | 'left'>
> = ['up', 'down', 'right', 'left'];

const moveSearch = (
  moveMatrix: Moves[][],
  startPosition: Position
): Map<string, number> => {
  const moveSet: Set<string> = new Set([hashPosition(startPosition)]);
  let moveQueue: Position[] = [startPosition];
  const distances: Map<string, number> = new Map();
  distances.set(hashPosition(startPosition), 0);

  while (moveQueue.length > 0) {
    const currPosition = moveQueue[0];
    moveQueue = moveQueue.slice(1);
    const currMoves = getMovesAtPosition(
      currPosition.x,
      currPosition.y,
      moveMatrix
    );
    const possibleMoves = potentialMoves
      .map((m) => {
        return currMoves[m];
      })
      .filter((p): p is Position => p !== undefined)
      .filter((p) => !moveSet.has(hashPosition(p)));
    for (const pmove of possibleMoves) {
      if (!moveSet.has(hashPosition(pmove))) {
        moveSet.add(hashPosition(pmove));
        const distanceToCurr = distances.get(hashPosition(currPosition));
        distances.set(hashPosition(pmove), (distanceToCurr ?? 0) + 1);
        moveQueue = [...moveQueue, pmove];
      }
    }
  }
  return distances;
};

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(12)));
  const [start, end, moveMatrix] = convertLinesToMoveMatrix(input);
  const distances = moveSearch(moveMatrix, start);

  return distances.get(hashPosition(end))?.toString() ?? '-1';
};

export const convertLinesToMoveMatrixAStart = (
  input: string[]
): [Position[], Position, Moves[][]] =>
  input.reduce<[Position[], Position, Moves[][]]>(
    ([start, end, matrix], currLine, currY) => {
      const [foundStart, foundEnd, newMoveLine] = splitCharacters(
        currLine
      ).reduce<[Position[], Position | undefined, Moves[]]>(
        ([newStart, newEnd, newLine], _, currX) => {
          const move = convertPositionToMove({ x: currX, y: currY }, input);
          return [
            move.positionType === PositionType.Start ||
            getLetterAtPosition(currX, currY, input) === 'a'
              ? [...newStart, { x: currX, y: currY }]
              : newStart,
            move.positionType === PositionType.Goal
              ? { x: currX, y: currY }
              : newEnd,
            [...newLine, move],
          ];
        },
        [[], undefined, []]
      );
      return [
        [...start, ...foundStart],
        foundEnd ?? end,
        [...matrix, newMoveLine],
      ];
    },
    [[], { x: 0, y: 0 }, []]
  );

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(12)));
  const [starts, end, moveMatrix] = convertLinesToMoveMatrixAStart(input);
  const distancesArr = starts.map((start) => moveSearch(moveMatrix, start));

  const minDistance = Math.min(
    ...distancesArr.map(
      (d) => d.get(hashPosition(end)) ?? Number.MAX_SAFE_INTEGER
    )
  );
  return `${minDistance}`;
};

export const day12: DayFunctions = { part1, part2 };
