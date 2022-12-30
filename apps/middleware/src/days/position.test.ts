import { dehashPosition, hashPosition } from './position';

describe('hashPosition', () => {
  it('should', () => {
    expect(hashPosition({ x: 1234, y: -12345 })).toEqual('1234,-12345');
  });
});

describe('dehashPosition', () => {
  it('should', () => {
    expect(dehashPosition('1234,-12345')).toEqual({ x: 1234, y: -12345 });
  });
});
