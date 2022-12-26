import {
  addSNAFUs,
  convertToSNAFUNumber,
  day25,
  readSNAFUNumber,
} from './day25';

const { part1, part2 } = day25;

const input = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`;

describe('readSNAFUNumber', () => {
  const cases: [number, string][] = [
    [10, '20'],
    [1747, '1=-0-2'],
    [1592, '1==-=2'], //'22332'],
    [906, '12111'],
    [198, '2=0='],
    [201, '2=01'],
    [31, '111'],
    [1257, '20012'],
    [32, '112'],
    [353, '1=-1='],
    [107, '1-12'],
    [7, '12'],
    [0, '0'], // 0
    [1, '1'], // 1
    [2, '2'], // 2
    [3, '1='], // 3
    [4, '1-'], // 4
    [5, '10'], // 10
    [6, '11'], // 11
    [7, '12'], // 12
    [8, '2='], // 13 1= + 2= === 21 | 3+8 === 11
    [9, '2-'], // 14
    [10, '20'], // 20
    [11, '21'], // 21
    [12, '22'], // 22
    [13, '1=='], // 23
    [14, '1=-'], // 24
    [15, '1=0'], // 30
    [16, '1=1'], // 31
    [17, '1=2'], // 32
    [18, '1-='], // 33
    [19, '1--'], // 34
    [20, '1-0'], // 40
    [21, '1-1'], // 41
    [22, '1-2'], // 42
    [23, '10='], // 43
    [24, '10-'], // 44
    [25, '100'], // 100
    [37, '122'],
  ];
  it.each(cases)('should return %s form %s', (num, snafu) => {
    expect(readSNAFUNumber(snafu)).toBe(num);
  });
});

describe('addSNAFUs', () => {
  const cases: [string, string, string][] = [
    ['1=', '2=', '21'],
    ['22', '22', '10-'],
    ['21', '1==', '10-'],
    ['2=0=', '2=01', '1=10-'],
  ];
  it.each(cases)('%s + %s should equal %s', (op1, op2, result) => {
    expect(addSNAFUs(op1, op2)).toEqual(result);
    expect(readSNAFUNumber(op1) + readSNAFUNumber(op2)).toEqual(
      readSNAFUNumber(result)
    );
  });
});

describe('convertToSNAFUNumber', () => {
  const cases: [number, string][] = [
    [10, '20'],
    [1747, '1=-0-2'],
    [906, '12111'],
    [198, '2=0='],
    [11, '21'],
    [201, '2=01'],
    [31, '111'],
    [1257, '20012'],
    [32, '112'],
    [353, '1=-1='],
    [107, '1-12'],
    [7, '12'],
    [0, '0'],
    [1, '1'],
    [2, '2'],
    [3, '1='],
    [4, '1-'],
    [5, '10'],
    [37, '122'],
  ];
  it.each(cases)('should convert %s to %s', (num, snafu) => {
    expect(convertToSNAFUNumber(num)).toBe(snafu);
  });
});

describe('part1', () => {
  it('should return the example solution', async () => {
    expect(await part1(input)).toBe('2=-1=0');
  });
});

describe('part2', () => {
  it.skip('should', async () => {
    expect(await part2()).toBe('output');
  });
});
