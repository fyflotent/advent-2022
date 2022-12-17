import { day13, pairInOrder, parseAndReturnArray } from './day13';
import { splitLines } from './textUtils';

const { part1, part2 } = day13;

const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

describe('parseAndReturnArray', () => {
  it('should parse line and return an array', () => {
    expect(parseAndReturnArray('[[5]]')).toEqual([[5]]);
  });
  it('should return a very deep array', () => {
    expect(
      parseAndReturnArray(
        '[[[5,1,[],[8,1,3],6],[[7]]],[10,[]],[6],[[],[[0,6,4,10,5],[2,2,9],[4,4],[2,10,4,10,8]],7,7],[[5],5,[[6],[8,2],[5],[]],[9,3,2,[9,4,8,6,8]]]]'
      )
    ).toEqual([
      [[5, 1, [], [8, 1, 3], 6], [[7]]],
      [10, []],
      [6],
      [
        [],
        [
          [0, 6, 4, 10, 5],
          [2, 2, 9],
          [4, 4],
          [2, 10, 4, 10, 8],
        ],
        7,
        7,
      ],
      [[5], 5, [[6], [8, 2], [5], []], [9, 3, 2, [9, 4, 8, 6, 8]]],
    ]);
  });
});

describe('pairInOrder', () => {
  it('should return true if left subarry is less than right', () => {
    expect(pairInOrder([[1]], [[2]])).toBe(true);
  });

  it('should return false if left subarry is greater than right', () => {
    expect(pairInOrder([[3]], [[2]])).toBe(false);
  });

  it('should return true if left side is a long array that starts smaller', () => {
    expect(pairInOrder([[1, 2, 3]], [[2]])).toBe(true);
  });

  it('should return false if left side is a long array that starts larger', () => {
    expect(pairInOrder([[3, 2, 1]], [[2]])).toBe(false);
  });

  it('should return true here', () => {
    expect(pairInOrder([[1, 2, 3], 1], [[1, 2, 3], 1])).toBe(undefined);
  });

  it('should pass test from reddit', () => {
    expect(pairInOrder([[0, 0], 2], [[0, 0], 1])).toBe(false);
  });

  it('should return true if the right side is longer', () => {
    expect(pairInOrder([[1, 2]], [[1, 2, 3]])).toBe(true);
  });

  it('it should handle deep weird arrays', () => {
    expect(pairInOrder([[[0, 2, [10, 5, 8]]]], [[0, 6, [[5, 8, 6]]]])).toBe(
      false
    );
  });

  it('should return false if the right side has fewer items', () => {
    expect(pairInOrder([[1, 2, 3], 1], [[1, 2, 3]])).toBe(false);
  });

  it('should return true if the right side has fewer items but the left side has smaller value', () => {
    expect(pairInOrder([[1], 1], [[3, 2, 1]])).toBe(true);
  });

  it('should return false if left side is a long array that starts larger', () => {
    expect(pairInOrder([[3, 2, 1]], [[2]])).toBe(false);
  });

  it('should return true for deeply nested arrays on the right side', () => {
    expect(pairInOrder([1], [[2]])).toBe(true);
    expect(pairInOrder([1], [[[2]]])).toBe(true);
    expect(pairInOrder([1], [[[[2]]]])).toBe(true);
    expect(pairInOrder([1], [[[[[2]]]]])).toBe(true);
  });

  it('should return true for deeply nested arrays on the left side', () => {
    expect(pairInOrder([[2]], [3])).toBe(true);
    expect(pairInOrder([[[2]]], [3])).toBe(true);
    expect(pairInOrder([[[[2]]]], [3])).toBe(true);
    expect(pairInOrder([[[[[2]]]]], [3])).toBe(true);
  });

  it('should return false for deeply nested arrays on the right side', () => {
    expect(pairInOrder([3], [[2]])).toBe(false);
    expect(pairInOrder([3], [[[2]]])).toBe(false);
    expect(pairInOrder([3], [[[[2]]]])).toBe(false);
    expect(pairInOrder([3], [[[[[2]]]]])).toBe(false);
  });

  it('should return false for deeply nested arrays on the left side', () => {
    expect(pairInOrder([[2]], [1])).toBe(false);
    expect(pairInOrder([[[2]]], [1])).toBe(false);
    expect(pairInOrder([[[[2]]]], [1])).toBe(false);
    expect(pairInOrder([[[[[2]]]]], [1])).toBe(false);
  });

  it('should return true if both sides are nested empty arrays but right side is deeper', () => {
    expect(pairInOrder([[]], [[[]]])).toBe(true);
  });

  it('should return false if both sides are nested empty arrays but right side is shallower', () => {
    expect(pairInOrder([[[]]], [[]])).toBe(false);
  });

  it('should compare a basic number array', () => {
    expect(pairInOrder([1, 1, 3, 1, 1], [1, 1, 5, 1, 1])).toBe(true);
  });

  it('should return false if first array is equal but longer', () => {
    expect(pairInOrder([1, 1, 1, 1], [1, 1, 1])).toBe(false);
  });

  it('should return true if second array is equal but longer', () => {
    expect(pairInOrder([1, 1, 1, 1], [1, 1, 1, 1, 1])).toBe(true);
  });

  describe('with example input', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testInput: [number, any[][]][] = input
      .split('\n\n')
      .map((linePairs, index) => [
        index + 1,
        splitLines(linePairs).map((line) => parseAndReturnArray(line)),
      ]);
    const successCase = [0, 1, 3, 5].map((i) => testInput[i]);
    it.each(successCase)(
      'should be true for pair %s',
      (_, [array1, array2]) => {
        expect(pairInOrder(array1, array2)).toBe(true);
      }
    );
    const failCases = [2, 4, 6, 7].map((i) => testInput[i]);
    it.each(failCases)('should be false for pair %s', (_, [array1, array2]) => {
      console.log(array1, array2);
      expect(pairInOrder(array1, array2)).toBe(false);
    });
  });
});

describe('part1', () => {
  it('should return the sum of indices in the right order', async () => {
    expect(await part1(input)).toBe('13');
  });
});

describe('part2', () => {
  it.skip('should', async () => {
    expect(await part2(input)).toBe('output');
  });
});
