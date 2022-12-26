import {
  day14,
  drawMap,
  drawMapWithFloor,
  getCoordinates,
  getLineCoordinates,
  Obstacles,
  simulateNextMove,
  simulateSand,
} from './day14';

const { part1, part2 } = day14;

const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

describe('getCoordinates', () => {
  it('should return one coordinate', () => {
    expect(getCoordinates('1,2')).toEqual([{ x: 1, y: 2 }]);
  });

  it('should return multiple coordinates', () => {
    expect(getCoordinates('1,2 -> 4,2')).toEqual([
      { x: 1, y: 2 },
      { x: 4, y: 2 },
    ]);
  });

  it('should return coordinates from example input line 1', () => {
    expect(getCoordinates('498,4 -> 498,6 -> 496,6')).toEqual([
      { x: 498, y: 4 },
      { x: 498, y: 6 },
      { x: 496, y: 6 },
    ]);
  });

  it('should return coordinates from example input line 2', () => {
    expect(getCoordinates('503,4 -> 502,4 -> 502,9 -> 494,9')).toEqual([
      { x: 503, y: 4 },
      { x: 502, y: 4 },
      { x: 502, y: 9 },
      { x: 494, y: 9 },
    ]);
  });
});

describe('getLineCoordinates', () => {
  it('should return a vertical line', () => {
    expect(
      getLineCoordinates([
        { x: 0, y: 0 },
        { x: 0, y: 3 },
      ])
    ).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ]);
  });

  it('should return a horizontal line', () => {
    expect(
      getLineCoordinates([
        { x: 3, y: 0 },
        { x: 0, y: 0 },
      ])
    ).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ]);
  });

  it('should return a complex line', () => {
    expect(
      getLineCoordinates([
        { x: 0, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 2 },
      ])
    ).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ]);
  });

  it('should draw the input from line 1', () => {
    expect(
      getLineCoordinates([
        { x: 498, y: 4 },
        { x: 498, y: 6 },
        { x: 496, y: 6 },
      ])
    ).toEqual([
      { x: 498, y: 4 },
      { x: 498, y: 5 },
      { x: 498, y: 6 },
      { x: 496, y: 6 },
      { x: 497, y: 6 },
      { x: 498, y: 6 },
    ]);
  });

  it('should draw the input from line 2', () => {
    expect(
      getLineCoordinates([
        { x: 503, y: 4 },
        { x: 502, y: 4 },
        { x: 502, y: 9 },
        { x: 494, y: 9 },
      ])
    ).toEqual([
      { x: 502, y: 4 },
      { x: 503, y: 4 },
      { x: 502, y: 4 },
      { x: 502, y: 5 },
      { x: 502, y: 6 },
      { x: 502, y: 7 },
      { x: 502, y: 8 },
      { x: 502, y: 9 },
      { x: 494, y: 9 },
      { x: 495, y: 9 },
      { x: 496, y: 9 },
      { x: 497, y: 9 },
      { x: 498, y: 9 },
      { x: 499, y: 9 },
      { x: 500, y: 9 },
      { x: 501, y: 9 },
      { x: 502, y: 9 },
    ]);
  });
});

describe('drawMap', () => {
  it('should draw a map with rocks', () => {
    expect(drawMap(['0,0 -> 1,0'], 2, 2)).toEqual([
      [Obstacles.ROCK, Obstacles.ROCK],
      [Obstacles.SPACE, Obstacles.SPACE],
    ]);
  });

  it('should draw a map with multiple lines', () => {
    expect(drawMap(['0,0 -> 1,0', '1,1 -> 0,1'], 2, 2)).toEqual([
      [Obstacles.ROCK, Obstacles.ROCK],
      [Obstacles.ROCK, Obstacles.ROCK],
    ]);
  });

  it('should draw a map with a complex line', () => {
    expect(drawMap(['0,0 -> 1,0 -> 1,1'], 2, 2)).toEqual([
      [Obstacles.ROCK, Obstacles.ROCK],
      [Obstacles.SPACE, Obstacles.ROCK],
    ]);
  });

  it('should draw a map with example input', () => {
    const output = drawMap([
      '498,4 -> 498,6 -> 496,6',
      '503,4 -> 502,4 -> 502,9 -> 494,9',
    ]);
    expect(output[9][494]).toEqual(Obstacles.ROCK);
    expect(output[9][495]).toEqual(Obstacles.ROCK);
    expect(output[9][496]).toEqual(Obstacles.ROCK);
    expect(output[9][497]).toEqual(Obstacles.ROCK);
    expect(output[9][498]).toEqual(Obstacles.ROCK);
    expect(output[9][499]).toEqual(Obstacles.ROCK);
    expect(output[9][500]).toEqual(Obstacles.ROCK);
    expect(output[9][501]).toEqual(Obstacles.ROCK);
    expect(output[9][502]).toEqual(Obstacles.ROCK);
  });
});

describe('drawMapWithFloor', () => {
  it('should draw a map with rocks and a floor 2 levels lower', () => {
    expect(drawMapWithFloor(['0,0 -> 1,0'], 2, 3)).toEqual([
      [Obstacles.ROCK, Obstacles.ROCK],
      [Obstacles.SPACE, Obstacles.SPACE],
      [Obstacles.ROCK, Obstacles.ROCK],
    ]);
  });

  it('should draw a map with multiple lines', () => {
    expect(drawMapWithFloor(['0,0 -> 1,0', '1,1 -> 0,1'], 2, 4)).toEqual([
      [Obstacles.ROCK, Obstacles.ROCK],
      [Obstacles.ROCK, Obstacles.ROCK],
      [Obstacles.SPACE, Obstacles.SPACE],
      [Obstacles.ROCK, Obstacles.ROCK],
    ]);
  });

  it('should draw a map with a complex line', () => {
    expect(drawMapWithFloor(['0,0 -> 1,0 -> 1,1'], 2, 4)).toEqual([
      [Obstacles.ROCK, Obstacles.ROCK],
      [Obstacles.SPACE, Obstacles.ROCK],
      [Obstacles.SPACE, Obstacles.SPACE],
      [Obstacles.ROCK, Obstacles.ROCK],
    ]);
  });

  it('should draw a map with example input', () => {
    const output = drawMapWithFloor([
      '498,4 -> 498,6 -> 496,6',
      '503,4 -> 502,4 -> 502,9 -> 494,9',
    ]);
    expect(output[9][494]).toEqual(Obstacles.ROCK);
    expect(output[9][495]).toEqual(Obstacles.ROCK);
    expect(output[9][496]).toEqual(Obstacles.ROCK);
    expect(output[9][497]).toEqual(Obstacles.ROCK);
    expect(output[9][498]).toEqual(Obstacles.ROCK);
    expect(output[9][499]).toEqual(Obstacles.ROCK);
    expect(output[9][500]).toEqual(Obstacles.ROCK);
    expect(output[9][501]).toEqual(Obstacles.ROCK);
    expect(output[9][502]).toEqual(Obstacles.ROCK);
    expect(output[11].every((a) => a === Obstacles.ROCK)).toBe(true);
  });
});

describe('simulateNextMove', () => {
  const blockers = [Obstacles.ROCK, Obstacles.SAND];
  it('should go down if the next position is a space', () => {
    expect(
      simulateNextMove(
        [
          [Obstacles.ROCK, Obstacles.SAND, Obstacles.ROCK],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
        ],
        { x: 1, y: 0 }
      )
    ).toEqual({ x: 1, y: 1 });
  });

  it.each(blockers)(
    'should go left if the next space down is blocked by %s',
    (blocker) => {
      expect(
        simulateNextMove(
          [
            [Obstacles.ROCK, Obstacles.SAND, Obstacles.ROCK],
            [Obstacles.SPACE, blocker, Obstacles.SPACE],
          ],
          { x: 1, y: 0 }
        )
      ).toEqual({ x: 0, y: 1 });
    }
  );

  it.each(blockers)(
    'should go right if down and left are blocked by %s',
    (blocker) => {
      expect(
        simulateNextMove(
          [
            [Obstacles.ROCK, Obstacles.SAND, Obstacles.ROCK],
            [blocker, blocker, Obstacles.SPACE],
          ],
          { x: 1, y: 0 }
        )
      ).toEqual({ x: 2, y: 1 });
    }
  );

  it.each(blockers)(
    'should return the if all moves are blocked by %s',
    (blocker) => {
      expect(
        simulateNextMove(
          [
            [Obstacles.ROCK, Obstacles.SAND, Obstacles.ROCK],
            [blocker, blocker, blocker],
          ],
          { x: 1, y: 0 }
        )
      ).toEqual({ x: 1, y: 0 });
    }
  );

  it('should return the original space if no move is available', () => {
    expect(
      simulateNextMove(
        [
          [Obstacles.ROCK, Obstacles.SAND, Obstacles.ROCK],
          [Obstacles.ROCK, Obstacles.ROCK, Obstacles.ROCK],
        ],
        { x: 1, y: 0 }
      )
    ).toEqual({ x: 1, y: 0 });
  });

  it('should return undefined if the sand would leave the map', () => {
    expect(
      simulateNextMove(
        [
          [Obstacles.ROCK, Obstacles.SAND, Obstacles.ROCK],
          [Obstacles.ROCK, Obstacles.ROCK, Obstacles.ROCK],
        ],
        { x: 1, y: 0 }
      )
    ).toEqual({ x: 1, y: 0 });
  });
});

describe('simulateSand', () => {
  it('should return undefined if the sand does not settle', () => {
    expect(
      simulateSand(
        [
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
        ],
        { x: 1, y: 0 }
      )
    ).toBe(undefined);
  });

  it('should return the new map if the sand does settle', () => {
    expect(
      simulateSand(
        [
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
          [Obstacles.ROCK, Obstacles.ROCK, Obstacles.ROCK],
        ],
        { x: 1, y: 0 }
      )
    ).toEqual([
      [Obstacles.SPACE, Obstacles.SAND, Obstacles.SPACE],
      [Obstacles.ROCK, Obstacles.ROCK, Obstacles.ROCK],
    ]);
  });

  it('should return the new map if the sand settles after a few moves', () => {
    expect(
      simulateSand(
        [
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
          [Obstacles.ROCK, Obstacles.ROCK, Obstacles.ROCK],
        ],
        { x: 1, y: 0 }
      )
    ).toEqual([
      [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
      [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
      [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
      [Obstacles.SPACE, Obstacles.SAND, Obstacles.SPACE],
      [Obstacles.ROCK, Obstacles.ROCK, Obstacles.ROCK],
    ]);
  });

  it('sand should pass multiple obstacles', () => {
    expect(
      simulateSand(
        [
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.ROCK],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
          [Obstacles.ROCK, Obstacles.ROCK, Obstacles.SPACE],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.ROCK],
          [Obstacles.ROCK, Obstacles.ROCK, Obstacles.ROCK],
        ],
        { x: 2, y: 0 }
      )
    ).toEqual([
      [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
      [Obstacles.SPACE, Obstacles.SPACE, Obstacles.ROCK],
      [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
      [Obstacles.ROCK, Obstacles.ROCK, Obstacles.SPACE],
      [Obstacles.SPACE, Obstacles.SAND, Obstacles.ROCK],
      [Obstacles.ROCK, Obstacles.ROCK, Obstacles.ROCK],
    ]);
  });

  it('sand should pass multiple obstacles', () => {
    expect(
      simulateSand(
        [
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.ROCK],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.SPACE],
          [Obstacles.ROCK, Obstacles.ROCK, Obstacles.SPACE],
          [Obstacles.SPACE, Obstacles.SPACE, Obstacles.ROCK],
          [Obstacles.ROCK, Obstacles.SPACE, Obstacles.ROCK],
        ],
        { x: 2, y: 0 }
      )
    ).toEqual(undefined);
  });
});

describe('part1', () => {
  it('should return the number of sand particles', async () => {
    expect(await part1(input)).toBe('24');
  });
});

describe('part2', () => {
  it('should return the number of sand particles with a floor', async () => {
    expect(await part2(input)).toBe('93');
  });
});
