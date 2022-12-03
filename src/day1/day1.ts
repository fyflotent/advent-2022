import { getInput } from "../getInput";

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

export const day1 = async (): Promise<string> => {
  const input = await getInput(1);
  console.log("calculating day1");
  const elves = getElves(input);
  const elvesCalories = elves.map((elf) => {
    return elf.reduce((partialSum, curr) => partialSum + curr, 0);
  });

  return Math.max(...elvesCalories).toString();
};
