import { getInput } from '../getInput';
import { getRange } from './arrayUtils';
import { sum } from './mathUtils';
import { splitLines } from './textUtils';
import { DayFunctions, Position } from './types';

interface SensorData {
  sensor: Position;
  beacon: Position;
  distance: number;
}

const hashPosition = (position: Position) => `${position.x},${position.y}`;
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

const part2 = async (optionalInput?: string) => {
  const input = splitLines(optionalInput ?? (await getInput(15)));
  const sensorData = input.map(readLine);
  // Get the perimeter dumby

  return '';
};

export const day15: DayFunctions = { part1, part2 };
