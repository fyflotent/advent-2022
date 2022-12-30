import { getInput } from '../getInput';
import { getRange } from './arrayUtils';
import { dehashPosition, hashPosition } from './position';
import { splitLines } from './textUtils';
import { Position } from './types';

interface SensorData {
  sensor: Position;
  beacon: Position;
  distance: number;
}

const getManhattanDistance = (p1: Position, p2: Position) =>
  Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);

const sensorRegex = new RegExp(
  /Sensor at x=(-?\d*), y=(-?\d*): closest beacon is at x=(-?\d*), y=(-?\d*)/
);
export const readLine = (line: string): SensorData => {
  const sensorData = sensorRegex.exec(line);
  if (sensorData === null) throw Error('Sensor regex returned null');
  const sensor = { x: parseInt(sensorData[1]), y: parseInt(sensorData[2]) };
  const beacon = { x: parseInt(sensorData[3]), y: parseInt(sensorData[4]) };
  return {
    sensor,
    beacon,
    distance: getManhattanDistance(sensor, beacon),
  };
};

export const findImpossiblePositionsForBeacon = (
  row: number,
  sensorData: SensorData
): Position[] => {
  const distance = Math.abs(sensorData.sensor.y - row);
  const distanceRadius = sensorData.distance - distance;
  if (distanceRadius < 0) return [];
  return getRange(
    sensorData.sensor.x - distanceRadius,
    sensorData.sensor.x + distanceRadius
  ).map((newX) => ({ x: newX, y: row }));
};

export const findImpossiblePositionsOnRow = (
  row: number,
  sensorData: SensorData[]
) => {
  const positions = sensorData.flatMap((data) => {
    return findImpossiblePositionsForBeacon(row, data);
  });
  const beaconSet = sensorData.reduce<Set<string>>(
    (set, { beacon }) => set.add(hashPosition(beacon)),
    new Set()
  );
  return positions.reduce<Set<string>>((sensorSet, position) => {
    return !beaconSet.has(hashPosition(position))
      ? sensorSet.add(hashPosition(position))
      : sensorSet;
  }, new Set());
};

const part1 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(15)));
  const sensorData = input.map(readLine);
  const positions = findImpossiblePositionsOnRow(2000000, sensorData);
  return positions.size.toString();
};

export const getOuterRadiusPositions = (
  position: Position,
  innerRadius: number,
  maxRange: number
): Array<string> => {
  const radius = innerRadius + 1;
  const { x, y } = position;
  return getRange(0, innerRadius).flatMap((n) => {
    const positions = [
      { x: x - radius + n, y: y - n },
      { x: x - n, y: y + radius - n },
      { x: x + radius - n, y: y + n },
      { x: x + n, y: y - radius + n },
    ]
      .filter(({ x, y }) => x >= 0 && x <= maxRange && y >= 0 && y <= maxRange)
      .map(hashPosition);
    return positions;
  });
};

const part2 = async (optionalInput?: string, maxRange = 4000000) => {
  const input = splitLines(optionalInput ?? (await getInput(15)));
  const sensorData = input.map(readLine);
  const beaconSet = new Set(
    sensorData.map((data) => hashPosition(data.beacon))
  );

  let pos: Position | undefined = undefined;
  for (const data of sensorData) {
    const newPositions = getOuterRadiusPositions(
      data.sensor,
      data.distance,
      maxRange
    );

    const foundPosition = newPositions.find((hashedPosition) => {
      const position = dehashPosition(hashedPosition);

      const result1 = !beaconSet.has(hashedPosition);
      const result2 = sensorData.every(
        (sd) => getManhattanDistance(sd.sensor, position) > sd.distance
      );

      return result1 && result2;
    });
    if (foundPosition) {
      pos = dehashPosition(foundPosition);
      break;
    }
  }

  return pos ? `${4000000 * pos.x + pos.y}` : 'failed';
};

export const day15 = { part1, part2 };
