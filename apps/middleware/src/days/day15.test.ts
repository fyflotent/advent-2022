import {
  day15,
  findImpossiblePositionsForBeacon,
  findImpossiblePositionsOnRow,
  getOuterRadiusPositions,
  readLine,
} from './day15';
import { hashPosition } from './position';
import { splitLines } from './textUtils';

const { part2 } = day15;

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

describe('getRadiusPositions', () => {
  /* 1 2 3 4 5 6 7
    1     0
    2   1 0 1
    3 0 0 x 0 0
    4   1 0 1
    5     0
    6       
    */
  it('should return radius if all are in bounds', () => {
    const position = { x: 3, y: 3 };
    const expected = [
      { x: 2, y: 4 }, // 3-1  3+1
      { x: 4, y: 4 }, // 3+1  3+1
      { x: 4, y: 2 }, // 3+1  3-1
      { x: 2, y: 2 }, // 3-1  3-1
      { x: 3, y: 5 }, // 3+2-2  3+2
      { x: 5, y: 3 }, // 3+2  3-2-2
      { x: 3, y: 1 }, // 3+2-2  3-2
      { x: 1, y: 3 }, // 3-2  3+2-2
    ].map(hashPosition);
    const results = getOuterRadiusPositions(position, 1, 20);
    results.sort();
    expected.sort();
    expect(results).toEqual(expected);
  });

  /*  1 2 3 4 5 6 7
    1       0
    2     2 0 1
    3   1 1 0 1 2
    4 0 0 0 x 0 0 0
    5   2 1 0 1 1
    6     1 0 2
    7       0
    */
  it('should return radius with an even innerRadius', () => {
    const position = { x: 4, y: 4 };
    const expected = [
      { x: 1, y: 4 },
      { x: 4, y: 7 },
      { x: 7, y: 4 },
      { x: 4, y: 1 },
      { x: 2, y: 3 },
      { x: 5, y: 2 },
      { x: 6, y: 5 },
      { x: 3, y: 6 },
      { x: 3, y: 2 },
      { x: 6, y: 3 },
      { x: 5, y: 6 },
      { x: 2, y: 5 },
    ].map(hashPosition);
    const results = getOuterRadiusPositions(position, 2, 20);
    results.sort();
    expected.sort();
    expect(results).toEqual(expected);
  });

  it('should have the expected value', () => {
    expect(getOuterRadiusPositions({ x: 14, y: 17 }, 5, 20)).toContain('14,11');
  });
});

describe('part2', () => {
  it('should', async () => {
    expect(await part2(input, 20)).toBe('56000011');
  });
});
