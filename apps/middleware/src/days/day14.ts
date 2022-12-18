import { getInput } from '../getInput';
import { sum } from './mathUtils';
import { splitLines } from './textUtils';
import { DayFunctions, Position } from './types';

export enum Obstacles {
  SPACE = 'space',
  ROCK = 'rock',
  SAND = 'sand',
}

export const getCoordinates = (inputLine: string): Position[] => {
  return inputLine.split(' -> ').map((coordString) => {
    const coordArr = coordString.split(',');
    const f = { x: parseInt(coordArr[0]), y: parseInt(coordArr[1]) };
    return f;
  });
};

const getRange = (num1: number, num2: number) => {
  const start = num1 > num2 ? num2 : num1;
  const end = num1 < num2 ? num2 : num1;
  return [...new Array(end - start + 1).keys()].map((index) => index + start);
};

const getPositionsLine = (p1: Position, p2: Position): Position[] => {
  return p1.x - p2.x === 0
    ? getRange(p1.y, p2.y).map((y) => ({
        x: p1.x,
        y,
      }))
    : getRange(p1.x, p2.x).map((x) => ({
        y: p1.y,
        x,
      }));
};

export const getLineCoordinates = (positions: Position[]): Position[] => {
  return positions
    .slice(1)
    .flatMap((p, index) => getPositionsLine(p, positions[index]));
};

export const drawMap = (
  input: string[],
  width = 600,
  height = 200
): Obstacles[][] => {
  const initialMap: Obstacles[][] = new Array(height)
    .fill(0)
    .map(() => new Array(width).fill(Obstacles.SPACE));
  const rockCoordinates = input.map(getCoordinates).map(getLineCoordinates);

  const mapWithRocks = rockCoordinates
    .flat()
    .reduce((latestMap, rockCoordinate) => {
      latestMap[rockCoordinate.y][rockCoordinate.x] = Obstacles.ROCK;
      return latestMap;
    }, initialMap);
  return mapWithRocks;
};

const getPosition =
  (map: Obstacles[][]) =>
  ({ x, y }: Position) =>
    map.at(y)?.at(x);

export const simulateNextMove = (
  map: Obstacles[][],
  sandPosition: Position
): Position | undefined => {
  const getObstacle = getPosition(map);
  const downPosition = { x: sandPosition.x, y: sandPosition.y + 1 };
  if (getObstacle(downPosition) === undefined) return undefined;
  if (getObstacle(downPosition) === Obstacles.SPACE) return downPosition;

  const leftDownPosition = { x: sandPosition.x - 1, y: sandPosition.y + 1 };
  if (getObstacle(leftDownPosition) === Obstacles.SPACE)
    return leftDownPosition;
  const rightDownPosition = { x: sandPosition.x + 1, y: sandPosition.y + 1 };
  if (getObstacle(rightDownPosition) === Obstacles.SPACE)
    return rightDownPosition;
  // nowhere to so time to stop
  return sandPosition;
};

export const simulateSand = (
  map: Obstacles[][],
  start: Position = { x: 500, y: 0 }
): Obstacles[][] | undefined => {
  let currentPosition = start;
  map[currentPosition.y][currentPosition.x] = Obstacles.SAND;
  let down = simulateNextMove(map, start);
  while (
    down !== undefined &&
    (currentPosition.x !== down?.x || currentPosition.y !== down?.y)
  ) {
    map[currentPosition.y][currentPosition.x] = Obstacles.SPACE;
    map[down.y][down.x] = Obstacles.SAND;
    currentPosition = down;
    down = simulateNextMove(map, currentPosition);
  }

  // we are done sand is off the map
  if (down === undefined) return undefined;

  return map;
};

const mapToString = (map: Obstacles[][]) =>
  map
    .map((a) =>
      a
        .map((t) =>
          t === Obstacles.ROCK ? '#' : t === Obstacles.SAND ? 'o' : '.'
        )
        .join('')
    )
    .join('\n');

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(14)));
  let map: Obstacles[][] = drawMap(input);
  let newMap: Obstacles[][] | undefined = map;
  let count = 0;
  while (newMap !== undefined) {
    newMap = simulateSand(map);
    if (newMap !== undefined) {
      count += 1;
      map = newMap;
    }
  }

  return count.toString();
};

export const drawMapWithFloor = (
  input: string[],
  width = 2000, // Just bump the number way higher than it needs to be rather than deal with infinity
  height = 200
) => {
  const map = drawMap(input, width, height);
  const lastLineWithRock = map.reduce(
    (lastSeenRock, currentLine, index) =>
      currentLine.find((a) => a === Obstacles.ROCK) ? index : lastSeenRock,
    0
  );
  map[lastLineWithRock + 2] = new Array(width).fill(Obstacles.ROCK);
  return map;
};

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(14)));
  let map: Obstacles[][] = drawMapWithFloor(input);
  let newMap: Obstacles[][] | undefined = map;
  let count = 0;

  while (map[0][500] !== Obstacles.SAND && count < 2000 * 200) {
    newMap = simulateSand(map);
    if (newMap !== undefined) {
      count += 1;
      map = newMap;
    }
  }

  return count.toString();
};

export const day14: DayFunctions = { part1, part2 };
