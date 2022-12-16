import {
  day12,
  convertLinesToMoveMatrix,
  PositionType,
  convertPositionToMove,
  checkValidMove,
  convertLinesToMoveMatrixAStart,
} from './day12';

const { part1, part2 } = day12;
const initialInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

describe('checkValidMove', () => {
  it('should return true for char + 1', () => {
    expect(checkValidMove('a', 'b')).toBe(true);
  });

  it('should return false for char + 1 + n', () => {
    expect(checkValidMove('a', 'c')).toBe(false);
    expect(checkValidMove('a', 'z')).toBe(false);
  });

  it('should return true for E if initial is z', () => {
    expect(checkValidMove('z', 'E')).toBe(true);
  });
  it('should return false for E if initial is not z', () => {
    expect(checkValidMove('a', 'E')).toBe(false);
  });

  it('should return undefined for undefined', () => {
    expect(checkValidMove('a', undefined)).toBe(undefined);
  });

  it('should return true if start is S', () => {
    expect(checkValidMove('S', 'a')).toBe(true);
  });
  it('should return true if start is E', () => {
    expect(checkValidMove('E', 'a')).toBe(undefined);
  });
});

describe('convertPositionToMove', () => {
  it('should pass this specific example', () => {
    const position = convertPositionToMove({ x: 1, y: 1 }, [
      'bcr',
      'ccs',
      'cct',
    ]);
    expect(position).toEqual({
      positionType: PositionType.Position,
      up: { x: 1, y: 0 },
      right: undefined,
      left: { x: 0, y: 1 },
      down: { x: 1, y: 2 },
    });
  });

  it('should return Start for S', () => {
    const position = convertPositionToMove({ x: 1, y: 1 }, [
      'aaa',
      'bSb',
      'ccc',
    ]);
    expect(position).toEqual({
      positionType: PositionType.Start,
      up: { x: 1, y: 0 },
      right: { x: 2, y: 1 },
      left: { x: 0, y: 1 },
      down: undefined,
    });
  });

  it('should return Goal for E', () => {
    const position = convertPositionToMove({ x: 1, y: 1 }, [
      'aaa',
      'bEb',
      'ccc',
    ]);
    expect(position).toEqual({
      positionType: PositionType.Goal,
    });
  });

  it('should return directions for postion', () => {
    const position = convertPositionToMove({ x: 1, y: 1 }, [
      'aaa',
      'bbb',
      'ccc',
    ]);
    expect(position).toEqual({
      positionType: PositionType.Position,
      up: { x: 1, y: 0 },
      right: { x: 2, y: 1 },
      left: { x: 0, y: 1 },
      down: { x: 1, y: 2 },
    });
  });

  it('should return undefined for non-existent moves', () => {
    const position = convertPositionToMove({ x: 0, y: 0 }, ['a']);
    expect(position).toEqual({
      positionType: PositionType.Position,
    });
  });
});

describe('convertLinesToMoveMatrix', () => {
  it('should return goal when E', () => {
    const [_, __, matrix] = convertLinesToMoveMatrix(['E']);
    expect(matrix).toEqual([[{ positionType: PositionType.Goal }]]);
  });

  it('should return start when S', () => {
    const [start, _, __] = convertLinesToMoveMatrix(['aaaaaS']);
    expect(start).toEqual({ x: 5, y: 0 });
  });

  it('should return start when S is not first line', () => {
    const [start, _, __] = convertLinesToMoveMatrix(['a', 'a', 'a', 'S']);
    expect(start).toEqual({ x: 0, y: 3 });
  });

  it('should return moves for multiple lines', () => {
    const [_, __, matrix] = convertLinesToMoveMatrix(['a', 'b']);
    expect(matrix).toEqual([
      [{ positionType: PositionType.Position, down: { x: 0, y: 1 } }],
      [{ positionType: PositionType.Position, up: { x: 0, y: 0 } }],
    ]);
  });

  it('should return moves for 1 line', () => {
    const [_, __, matrix] = convertLinesToMoveMatrix(['ab']);
    expect(matrix).toEqual([
      [
        { positionType: PositionType.Position, right: { x: 1, y: 0 } },
        { positionType: PositionType.Position, left: { x: 0, y: 0 } },
      ],
    ]);
  });
  it('should return no valid moves if none', () => {
    const [_, __, matrix] = convertLinesToMoveMatrix(['az']);
    expect(matrix).toEqual([
      [
        { positionType: PositionType.Position },
        { positionType: PositionType.Position, left: { x: 0, y: 0 } },
      ],
    ]);
  });
});

describe('part1', () => {
  it('should return count for a basic test', async () => {
    expect(await part1('SabcdefghijklmnopqrstuvwxyzE')).toBe('27');
  });
  it('should return the number of steps to the goal', async () => {
    expect(await part1(initialInput)).toBe('31');
  });
});

describe('convertLinesToMoveMatrixAStart', () => {
  it('should return goal when E', () => {
    const [_, __, matrix] = convertLinesToMoveMatrixAStart(['E']);
    expect(matrix).toEqual([[{ positionType: PositionType.Goal }]]);
  });

  it('should return starts with S and a', () => {
    const [start, _, __] = convertLinesToMoveMatrixAStart(['aaaaaS']);
    expect(start).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 4, y: 0 },
      { x: 5, y: 0 },
    ]);
  });

  it('should return start for a and S when not on the first line', () => {
    const [start, _, __] = convertLinesToMoveMatrixAStart(['a', 'a', 'a', 'S']);
    expect(start).toEqual([
      { x: 0, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ]);
  });

  it('should return moves for multiple lines', () => {
    const [_, __, matrix] = convertLinesToMoveMatrixAStart(['a', 'b']);
    expect(matrix).toEqual([
      [{ positionType: PositionType.Position, down: { x: 0, y: 1 } }],
      [{ positionType: PositionType.Position, up: { x: 0, y: 0 } }],
    ]);
  });

  it('should return moves for 1 line', () => {
    const [_, __, matrix] = convertLinesToMoveMatrixAStart(['ab']);
    expect(matrix).toEqual([
      [
        { positionType: PositionType.Position, right: { x: 1, y: 0 } },
        { positionType: PositionType.Position, left: { x: 0, y: 0 } },
      ],
    ]);
  });
  it('should return no valid moves if none', () => {
    const [_, __, matrix] = convertLinesToMoveMatrixAStart(['az']);
    expect(matrix).toEqual([
      [
        { positionType: PositionType.Position },
        { positionType: PositionType.Position, left: { x: 0, y: 0 } },
      ],
    ]);
  });
});

describe('part2', () => {
  it('should return count for a basic test', async () => {
    expect(await part2('SabcdefghijklmnopqrstuvwxyzE')).toBe('26');
  });
  it('should return the number of steps to the goal', async () => {
    expect(await part2(initialInput)).toBe('29');
  });
});
