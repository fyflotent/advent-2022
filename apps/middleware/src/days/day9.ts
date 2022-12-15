import { getInput } from '../getInput';
import { splitLines } from './textUtils';
import { DayFunctions } from './types';

interface Position {
  x: number;
  y: number;
}

class PositionSetTracker {
  positionSet = new Set<string>();
  push(pos: Position) {
    this.positionSet.add(`${pos.x},${pos.y}`);
    return this;
  }
}

type Trackers = [Position, Position, PositionSetTracker];
type TrackersWithLongTail = [Position, Position[], PositionSetTracker];

type ChangePosition = (pos: Position) => Position;

const moveUp: ChangePosition = (pos) => ({ ...pos, y: pos.y + 1 });
const moveDown: ChangePosition = (pos) => ({ ...pos, y: pos.y - 1 });
const moveLeft: ChangePosition = (pos) => ({ ...pos, x: pos.x - 1 });
const moveRight: ChangePosition = (pos) => ({ ...pos, x: pos.x + 1 });

const getMove = ([dirString, moveCount]: [string, number]): [
  ChangePosition,
  number
] => {
  switch (dirString) {
    case 'R':
      return [moveRight, moveCount];
    case 'D':
      return [moveDown, moveCount];
    case 'L':
      return [moveLeft, moveCount];
    case 'U':
      return [moveUp, moveCount];
    default:
      return [moveUp, moveCount];
  }
};

const headNotTouchingTail = (head: Position, tail: Position): boolean => {
  return Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1;
};

// assumes they are not touching already
const moveTailToHead = (head: Position, tail: Position): Position => {
  if (head.x > tail.x) {
    if (head.y > tail.y) {
      tail = moveRight(tail);
      tail = moveUp(tail);
      return tail;
    } else if (head.y === tail.y) {
      return moveRight(tail);
    } else {
      tail = moveRight(tail);
      tail = moveDown(tail);
      return tail;
    }
  } else if (head.x === tail.x) {
    if (head.y > tail.y) {
      return moveUp(tail);
    } else {
      return moveDown(tail);
    }
  } else {
    if (head.y > tail.y) {
      tail = moveLeft(tail);
      tail = moveUp(tail);
      return tail;
    } else if (head.y === tail.y) {
      return moveLeft(tail);
    } else {
      tail = moveLeft(tail);
      tail = moveDown(tail);
      return tail;
    }
  }
};

const doAction = (
  numberOfTimes: number,
  changeFunc: ChangePosition,
  head: Position,
  tail: Position,
  tailTracker: PositionSetTracker
): Trackers => {
  for (let i = 0; i < numberOfTimes; i++) {
    head = changeFunc(head);
    if (headNotTouchingTail(head, tail)) {
      tail = moveTailToHead(head, tail);
      tailTracker = tailTracker.push(tail);
    }
  }
  return [head, tail, tailTracker];
};

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(9)))
    .map((line) => line.split(' '))
    .map<[string, number]>(([direction, numberToMove]) => [
      direction,
      parseInt(numberToMove),
    ])
    .map((a) => getMove(a))
    .reduce<Trackers>(
      ([headPos, tailPos, tracker], [changeFunc, numberOfTimes]) => {
        return doAction(numberOfTimes, changeFunc, headPos, tailPos, tracker);
      },
      [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        new PositionSetTracker().push({ x: 0, y: 0 }),
      ]
    );

  return input[2].positionSet.size.toString();
};

const doActionWithLongTail = (
  numberOfTimes: number,
  changeFunc: ChangePosition,
  head: Position,
  tail: Position[],
  tailTracker: PositionSetTracker
): TrackersWithLongTail => {
  for (let i = 0; i < numberOfTimes; i++) {
    head = changeFunc(head);
    if (headNotTouchingTail(head, tail[0])) {
      tail[0] = moveTailToHead(head, tail[0]);
    }

    for (let j = 1; j < tail.length; j++) {
      if (headNotTouchingTail(tail[j - 1], tail[j])) {
        tail[j] = moveTailToHead(tail[j - 1], tail[j]);
      }
    }
    tailTracker.push(tail[tail.length - 1]);
  }

  return [head, tail, tailTracker];
};

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(9)))
    .map((line) => line.split(' '))
    .map<[string, number]>(([direction, numberToMove]) => [
      direction,
      parseInt(numberToMove),
    ])
    .map((a) => getMove(a))
    .reduce<TrackersWithLongTail>(
      ([headPos, tailPos, tracker], [changeFunc, numberOfTimes]) => {
        return doActionWithLongTail(
          numberOfTimes,
          changeFunc,
          headPos,
          tailPos,
          tracker
        );
      },
      [
        { x: 0, y: 0 },
        [...new Array(9).keys()].map(() => ({ x: 0, y: 0 })),
        new PositionSetTracker().push({ x: 0, y: 0 }),
      ]
    );

  return input[2].positionSet.size.toString();
};

export const day9: DayFunctions = { part1, part2 };
