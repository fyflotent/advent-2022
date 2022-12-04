import { getInput } from "../getInput";
import { DayFunctions } from "./types";

const getElves = (input: string): Array<number[]> => {
  const splitoutInput = input.split("\r\n");
  const elves = splitoutInput.reduce((allElves, line) => {
    const cleanedLine = line.trim();
    if (cleanedLine === "") {
      return [...allElves, []];
    } else {
      const lastElf = allElves.pop() ?? [];
      const parsedInt = parseInt(line);
      if (isNaN(parsedInt)) throw Error("got nan in from line" + line);
      return [...allElves, [...lastElf, parsedInt]];
    }
  }, new Array<number[]>());
  return elves;
};

const day1Part1 = async (): Promise<string> => {
  const input = await getInput(1);
  console.log("calculating day1");
  const elves = getElves(input);
  const elvesCalories = elves.map((elf) => {
    return elf.reduce((partialSum, curr) => partialSum + curr, 0);
  });

  return Math.max(...elvesCalories).toString();
};

const day1Part2 = async (): Promise<string> => {
  const input = await getInput(1);
  console.log("calculating day1");
  const elves = getElves(input);
  const elvesCalories = elves
    .map((elf) => elf.reduce((partialSum, curr) => partialSum + curr, 0))
    .sort((a, b) => (a > b ? -1 : 1));

  return elvesCalories
    .slice(0, 3)
    .reduce((partialSum, curr) => partialSum + curr, 0)
    .toString();
};

export const day1: DayFunctions = { part1: day1Part1, part2: day1Part2 };
