export type DayFunctions = {
  part1: (input?: string) => Promise<string>;
  part2: (input?: string) => Promise<string>;
};

export interface Position {
  x: number;
  y: number;
}
