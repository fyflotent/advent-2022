import {
  day15,
  findImpossiblePositionsForBeacon,
  findImpossiblePositionsOnRow,
  readLine,
} from './day15';
import { splitLines } from './textUtils';

const { part1, part2 } = day15;

export const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`;

describe('readLine', () => {
  it('should return the sensor location the closest beacon and distance', () => {
    expect(
      readLine('Sensor at x=2, y=18: closest beacon is at x=-2, y=15')
    ).toEqual({
      beacon: {
        x: -2,
        y: 15,
      },
      sensor: {
        x: 2,
        y: 18,
      },
      distance: 7,
    });
  });
});

describe('findImpossiblePositionsForBeacon', () => {
  it('should return positions if the row is 4 places away and max distance is 6', () => {
    expect(
      findImpossiblePositionsForBeacon(4, {
        sensor: { x: 0, y: 0 },
        beacon: { x: 0, y: 6 },
        distance: 6,
      })
    ).toEqual([
      { x: -2, y: 4 },
      { x: -1, y: 4 },
      { x: 0, y: 4 },
      { x: 1, y: 4 },
      { x: 2, y: 4 },
    ]);
  });
  it('should return no positions if row is out of range', () => {
    expect(
      findImpossiblePositionsForBeacon(500, {
        sensor: { x: 0, y: 0 },
        beacon: { x: 0, y: 6 },
        distance: 6,
      })
    ).toEqual([]);
  });
});

describe('findImpossiblePositionsOnRow', () => {
  it('should correct data for example', () => {
    const inputLines = splitLines(input);
    const sensorData = inputLines.map(readLine);
    const positions = findImpossiblePositionsOnRow(10, sensorData);
    expect(positions.size).toBe(26);
  });
});

describe('part2', () => {
  it('should', async () => {
    expect(await part2()).toBe('100');
  });
});
